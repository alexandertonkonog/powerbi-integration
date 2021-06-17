import React, { useState } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import Reports from './Reports/Reports';
import Users from './Users/Users';
import Groups from './Groups/Groups';
import Modal from './Modal/Modal';
import Settings from './Settings/Settings';

const Admin = () => {
    let [modal, setModal] = useState({visible: false, screen: 1, error: false});
    return (
		<div className="admin">
			<nav className="nav-container block mb-small">
				<ul className="nav_admin nav">
					<li>
						<NavLink
							exact
							className="nav__link"
							activeClassName="nav__link_active"
							to="/admin"
						>
							Отчеты и группы
						</NavLink>
					</li>
					<li>
						<NavLink
							className="nav__link"
							activeClassName="nav__link_active"
							to="/admin/users"
						>
							Пользователи и права
						</NavLink>
					</li>
					<li>
						<NavLink
							className="nav__link"
							activeClassName="nav__link_active"
							to="/admin/groups"
						>
							Пользователи и группы
						</NavLink>
					</li>
					<li>
						<NavLink
							className="nav__link"
							activeClassName="nav__link_active"
							to="/admin/settings"
						>
							Настройки
						</NavLink>
					</li>
				</ul>
			</nav>
			<Switch>
				<Route exact path="/admin">
					<Reports openModal={setModal} />
					<Modal openModal={setModal} modal={modal} type="report" />
				</Route>
				<Route path="/admin/users">
					<Users openModal={setModal} />
					<Modal openModal={setModal} modal={modal} type="userGroup" />
				</Route>
				<Route path="/admin/groups">
					<Groups openModal={setModal} />
					<Modal openModal={setModal} modal={modal} type="userGroup" />
				</Route>
				<Route path="/admin/settings">
					<Settings />
				</Route>
			</Switch>
			
		</div>
	);
}

export default Admin;