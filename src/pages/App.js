import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Admin from './Admin/Admin';
import User from './User/User';

const App = () => {
	const isAdmin = useSelector(state => state.main.isAdmin);
	return (
		<div className="wrapper">
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
				<User />
			</Route>
			<Route path="/admin" >
				{!isAdmin && <Redirect to="/" />}
				<Admin />
			</Route>
		</div>
	)
    
}

export default App;
