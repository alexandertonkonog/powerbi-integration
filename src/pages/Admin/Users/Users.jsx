import React, { useState } from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ListItem from '../../../components/ListItem';
import ListDropdown from '../../../components/ListDropdown';
import Group from "./Group";
import User from "./User";
import { setUsersIntoGroup } from '../../../redux/mainReducer';

const UsersRouter = ({openModal}) => {
    let [reports, setReports] = useState([]);
    let [groups, setGroups] = useState([]);
    const dispatch = useDispatch();
    const data = [];
    const selectItem = (state, setState) => (id) => {
        if (state.includes(id)) {
            setState(state.filter(item => item !== id));
        } else {
            setState([...state, id]);
        }
    } 
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
}

export default UsersRouter;