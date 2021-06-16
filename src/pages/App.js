import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { auth } from '../redux/mainReducer';
import Admin from './Admin/Admin';
import User from './User/User';
import icon from '../images/icon.svg';

const App = () => {
	const dispatch = useDispatch();
	const isAdmin = useSelector(state => state.main.isAdmin);
	const token = useSelector(state => state.main.token);
	useEffect(() => {
		dispatch(auth());
	}, [])
	return (
		<div className="wrapper">
			{/* <header className="header">
				<img src={icon} alt="menu" className="header__toggler" />
				<h1 className="header__title title-small">Power BI</h1>
			</header> */}
			{isAdmin 
				? (
					<nav className="nav-container mb-small block">
						<ul className="nav nav_admin">
							<li><NavLink className="nav__link" activeClassName="nav__link_active" to='/admin'>Панель администратора</NavLink></li>
							<li><NavLink exact className="nav__link" activeClassName="nav__link_active" to='/'>Пользовательский интерфейс</NavLink></li>
						</ul>
					</nav>
				)
				: (
					<nav className="nav-container mb-small block">
						<ul className="nav nav_admin">
							
						</ul>
					</nav>
				)
			}
			<Route exact path="/" >
				{token && <User isAdmin={isAdmin} token={token} auth={auth} />}
			</Route>
			<Route path="/admin" >
				{!isAdmin && <Redirect to="/" />}
				<Admin />
			</Route>
		</div>
	)
    
}

export default App;
