import React, { useState, useEffect } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Reports from "./Reports/Reports";
import Users from "./Users/Users";
import Groups from "./Groups/Groups";
import Modal from "./Modal/Modal";
import Settings from "./Settings/Settings";
import {
	getReportGroups,
	getUserGroups,
	getUsers,
	getReports,
	getSettings,
} from "../../redux/mainReducer";

const Admin = () => {
	let [modal, setModal] = useState({
		visible: false,
		screen: 1,
		error: false,
	});
	const { reportGroupsAdmin, reports, users, userGroups, settings } = useSelector((state) => state.main);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!reportGroupsAdmin) {
			dispatch(getReportGroups());
		}
		if (!reports) {
			dispatch(getReports());
		}
		if (!users) {
			dispatch(getUsers());
		}
		if (!userGroups) {
			dispatch(getUserGroups());
		}
		if (!settings) {
			dispatch(getSettings());
		}
	}, []);
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
					<Modal
						openModal={setModal}
						modal={modal}
						type="userGroup"
					/>
				</Route>
				<Route path="/admin/groups">
					<Groups openModal={setModal} />
					<Modal
						openModal={setModal}
						modal={modal}
						type="userGroup"
					/>
				</Route>
				<Route path="/admin/settings">
					<Settings openModal={setModal} />
					<Modal
						openModal={setModal}
						modal={modal}
						type="setting"
					/>
				</Route>
			</Switch>
		</div>
	);
};

export default Admin;
