import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import { getReportGroups, getUserReportGroups } from "../../redux/mainReducer";
import { cutText } from '../../utils/validate';
import Dropdown from '../../components/Dropdown';
import Report from './Report';
import Group from './Group';


const User = ({isAdmin, token, auth}) => {
    const dispatch = useDispatch();
    const userReportGroups = useSelector(state => state.main.reportGroups);
    
    useEffect(() => {
        dispatch(getUserReportGroups());
    }, [isAdmin]);

    if (!userReportGroups) {
        return null;
    }

    const groupData = userReportGroups.map(item => ({id: item.id, name: item.name}));

    return (
		<div className="interface">
			<nav className="nav-container mb-small block">
                <ul className="nav nav_admin">
                    {groupData && groupData.length ? groupData.slice(0, 4).map(item => (
                        <li key={item.id} title={item.name}>
                            <NavLink 
                                className="nav__link" 
                                activeClassName="nav__link_active" 
                                to={'/reports/' + item.id}>
                                {cutText(item.name, 20)}
                            </NavLink>
                        </li>
                    ))
                    : <p className="text-small text-grey padding-small">
                        Вам недоступны группы отчетов
                    </p>}
                    
                </ul>
                {groupData && groupData.length > 4 && <Dropdown data={groupData.slice(4)} link={'/reports/'} />}
			</nav>
            <Route path="/reports/:groupId/:reportId?">
                <Group groups={userReportGroups} token={token} auth={auth} />
                <main className="interface__content block">
                    <Report token={token.token} groups={userReportGroups} />
                </main>
            </Route>
		</div>
	); 
}

export default User;