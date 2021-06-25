import React, { useEffect } from 'react'; 
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cutText } from '../../utils/validate';
import Dropdown from '../../components/Dropdown';

const Group = ({ groups, token, auth }) => {
    const dispatch = useDispatch();
    const params = useParams();

    const refreshToken = () => {
        const now = new Date();
        const date = new Date(token.tokenTime);
        const diff = (now - date) / 60000;
        if (diff > 9.5) {
            dispatch({type: 'REMOVE_AUTH'});
            dispatch(auth());
        }
    }

    useEffect(() => {
        refreshToken();
    }, [params.reportId])

    if (!params.groupId) {
        return <></>
    }

    const groupItem = groups.find(item => item.id === +params.groupId);
    const reportData = groupItem.reports.map(item => ({id: item.id, name: item.name}));

    return (
        <nav className="nav-container mb-small block">
            <ul className="nav nav_admin">
                {reportData && reportData.length ? reportData.slice(0,4).map(item => (
                    <li key={item.id} title={item.name}>
                        <NavLink 
                            className="nav__link" 
                            activeClassName="nav__link_active" 
                            to={'/reports/'+ params.groupId + '/' + item.id}>
                            {cutText(item.name, 20)}
                        </NavLink>
                    </li>
                ))
                : <p className="text-small text-grey padding-small">
                    В данной группе еще нет отчетов
                </p>}
            </ul>
            {reportData && reportData.length > 4 
                && <Dropdown 
                    data={reportData.slice(4)}
                    link={'/reports/' + params.groupId + '/'} />}
        </nav>
    )
}

export default Group;