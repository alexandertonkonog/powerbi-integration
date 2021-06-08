import React, { useState } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import Select from '../../components/Select';
import bg from '../../images/report.png';

const User = () => {
    let [group, setGroup] = useState(false);
    let [report, setReport] = useState(false);
    const groupData = [], reportData = [];
    for (let i = 1; i <= 10; i++) {
        groupData.push({
            id: i,
            name: 'Группа ' + i
        });
        reportData.push({
            id: i,
            name: 'Отчет ' + i
        });
    }
    const clickItem = (setState) => (id, userId) => {
        setState(userId);
    }
    return (
        <div className="interface">
            <nav className="nav-container mb-small block">
                <div className="nav nav_user">
                    <Select data={groupData} value={group} clickItem={clickItem(setGroup)} text="Группа отчетов" addClass="interface__select" />
                    {group && <Select data={reportData} value={report} clickItem={clickItem(setReport)} text="Отчет" addClass="interface__select" />}
                </div>
            </nav>
            <main className="interface__content block">
                {report && <img src={bg} className="interface__report" alt="Отчет Power BI" title="Отчет Power BI" />}
            </main>
        </div>
    ); 
}

export default User;