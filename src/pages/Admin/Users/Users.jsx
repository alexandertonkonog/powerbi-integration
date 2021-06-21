import React from "react";
import { Route, NavLink } from "react-router-dom";
import Group from "./Group";
import User from "./User";

const UsersRouter = ({ openModal }) => {
	return (
		<>
			<nav className="nav-container block">
				<ul className="nav_admin nav">
					<li>
						<NavLink
							className="nav__link"
							activeClassName="nav__link_active"
							exact
							to="/admin/users"
						>
							Отчеты для пользователей
						</NavLink>
					</li>
					<li>
						<NavLink
							className="nav__link"
							activeClassName="nav__link_active"
							to="/admin/users/groups"
						>
							Отчеты для групп пользователей
						</NavLink>
					</li>
				</ul>
			</nav>

			<Route exact path="/admin/users">
				<User openModal={openModal} />
			</Route>
			<Route path="/admin/users/groups">
				<Group openModal={openModal} />
			</Route>
		</>
	);
};

export default UsersRouter;
