import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, NavLink, Redirect, Switch } from 'react-router-dom';
import { auth, refreshData, setReports } from '../redux/mainReducer';
import Admin from './Admin/Admin';
import User from './User/User';
import Loader from '../components/Loader';

const App = () => {
	let [authError, setAuthError] = useState(false);
	const dispatch = useDispatch();
	const isAdmin = useSelector(state => state.main.isAdmin);
	const token = useSelector(state => state.main.token);
	const lastRefresh = useSelector(state => state.main.lastRefresh);
	const refreshDataInBase = () => {
		const now = new Date();
		const date = new Date(lastRefresh);
		const diff = (now - date) / 3600000;
		if (diff > 1) {
			dispatch(refreshData());
			dispatch(setReports());
		}
	}
	useEffect(() => {
		const getAuth = async () => {
			const result = await dispatch(auth());
			if (result.success) {
				setAuthError(false);
			} else {
				setAuthError(true);
			}
		}
		getAuth();
	}, []);
	useEffect(() => {
		if (lastRefresh) {
			refreshDataInBase();
		}
	}, [lastRefresh])

	if (authError) {
		return (
			<div className="wrapper">
				<p className="text-center text-grey padding-main">
					Нет токена доступа. Закройте приложение и войдите еще раз. Если
					доступ к отчетам не восстановится, сообщите об этом
					администратору Битрикс 24
				</p>
			</div>
		)
	}
	return (
		<div className="wrapper">
			{isAdmin 
				? (
					<nav className="nav-container mb-small block">
						<ul className="nav nav_admin">
							<li><NavLink className="nav__link" activeClassName="nav__link_active" to='/admin'>Панель администратора</NavLink></li>
							<li><NavLink exact className="nav__link" activeClassName="nav__link_active" to='/reports'>Пользовательский интерфейс</NavLink></li>
						</ul>
					</nav>
				)
				: <></>
			}
			<Switch>
				<Route exact path="/">
					<Redirect to="/reports" />
				</Route>
				<Route path="/reports" >
					{token 
						? <User isAdmin={isAdmin} token={token} auth={auth} />
						: <Loader />}
				</Route>
				<Route path="/admin" >
					{isAdmin 
						? <Admin />
						: <Redirect to="/reports" /> }
				</Route>
			</Switch>
			<Redirect to="/reports" />		
		</div>
	)
    
}

export default App;
