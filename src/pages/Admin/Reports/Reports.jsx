import React, { useState } from 'react';
import ListItem from '../../../components/ListItem';
import ListDropdown from '../../../components/ListDropdown';

const Reports = (props) => {
    let [reports, setReports] = useState([]);
    let [groups, setGroups] = useState([]);
    const data = [];
    const selectItem = (state, setState) => (id) => {
        if (state.includes(id)) {
            setState(state.filter(item => item !== id));
        } else {
            setState([...state, id]);
        }
    } 
    for (let i = 1; i <= 20; i++) {
        data.push({
            id: i, 
            name: 'Очень длинное имя в две строки ' + i,
        })
    }
    return (
        <main className="admin__reports mt-main">
            <section className="admin__reports-col padding-small block">
                <div className="admin__reports-header">
                    <h2 className="title-small admin__reports-title mb-middle">Отчеты</h2>
                </div>
                <p className="list__item list__item_title grid2">
                    <span className="list__item-box text-small text-grey">Выбран</span>
                    <span className="list__item-box text-small text-grey">Имя</span>
                </p>
                <ul className="list ">
                    {data.map(item => <ListItem key={item.id} checked={reports.includes(item.id)} {...item} selectItem={selectItem(reports, setReports)} />)}
                </ul>
            </section>
            <section className="admin__reports-col padding-small block">
                <div className="admin__reports-header">
                    <h2 className="title-small admin__reports-title mb-middle">Группы отчетов</h2>
                    <p className="text-grey text-small admin__reports-text">Чтобы посмотреть отчеты в группе, кликните по названию группы</p>
                </div>
                <p className="list__item list__item_title grid3">
                    <span className="list__item-box text-small text-grey">Выбран</span>
                    <span className="list__item-box text-small text-grey">Имя</span>
                    <span className="list__item-box text-small text-grey">Удалить</span>
                </p>
                <ul className="list ">
                    {data.map(item => <ListDropdown remove={true} key={item.id} checked={groups.includes(item.id)} {...item} selectItem={selectItem(groups, setGroups)} />)}
                </ul>
            </section>
            <section className="admin__reports-col admin__btn-area">
                <button className="btn btn_blue text-uppercase">Сохранить</button>
                <button 
                    onClick={() => props.openModal({visible: true, screen: 1, error: false})}
                    className="btn btn_grey text-uppercase">Новая группа отчетов</button>
            </section>
        </main>
    )
}

export default Reports;