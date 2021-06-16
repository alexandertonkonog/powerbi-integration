import React, { useState, useEffect } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import { useDispatch, useSelector } from 'react-redux';
import Select from '../../components/Select';
import bg from '../../images/report.png';
import { getReportGroups, getUserReportGroups } from "../../redux/mainReducer";


const User = ({isAdmin, token, auth}) => {
    let [group, setGroup] = useState(false);
    let [report, setReport] = useState(false);
    const dispatch = useDispatch();
    const userReportGroups = useSelector(state => state.main.reportGroups);
    const clickItem = (setState) => (id, userId) => {
        setState(userId);
    }
    
    useEffect(() => {
        if (isAdmin) {
            dispatch(getReportGroups());
        } else {
            dispatch(getUserReportGroups());
        }
    }, [isAdmin]);

    useEffect(() => {
        const now = new Date();
        const date = new Date(token.tokenTime);
        const diff = (now - date) / 60000;
        if (diff > 9.5) {
            dispatch({type: 'REMOVE_AUTH'});
            dispatch(auth());
        }
    }, [report])

    if (!userReportGroups) {
        return null;
    }

    const groupData = userReportGroups.map(item => ({id: item.id, name: item.name}));
    let reportData = []; 
    if (group) {
        const groupItem = userReportGroups.find(item => item.id === group);
        reportData = groupItem.reports.map(item => ({id: item.id, name: item.name}));
    }

    return (
		<div className="interface">
			<nav className="nav-container mb-small block">
				<div className="nav nav_user">
					{groupData && groupData.length 
                        ? <Select
                            data={groupData}
                            value={group}
                            clickItem={clickItem(setGroup)}
                            text="Группа отчетов"
                            addClass="interface__select"
                        />
                        : <p className="text-small text-grey">Вам недоступны группы отчетов</p>
                    }
					{group && (
                        reportData && reportData.length 
                            ? (
                                <Select
                                    data={reportData}
                                    value={report}
                                    clickItem={clickItem(setReport)}
                                    text="Отчет"
                                    addClass="interface__select"
                                />
                            )
                            : <p className="text-small text-grey">В данной группе нет отчетов</p>
                        )
                    }
				</div>
			</nav>
			<main className="interface__content block">
				{report && (
					<img
						src={bg}
						className="interface__report"
						alt="Отчет Power BI"
						title="Отчет Power BI"
					/>
				)}
			</main>
		</div>
	); 
}

export default User;