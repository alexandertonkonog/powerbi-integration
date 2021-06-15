import React, { useState } from 'react';
import { Route, NavLink, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ListItem from '../../../components/ListItem';
import ListDropdown from '../../../components/ListDropdown';
import { setUsersIntoGroup } from '../../../redux/mainReducer';

const UsersRouter = () => {
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
    for (let i = 1; i <= 20; i++) {
        data.push({
            id: i, 
            name: 'Имя ' + i,
        })
    }
    const saveUsers = () => {
        dispatch(setUsersIntoGroup())
    }
    return (
        <>
        <nav className="nav-container block">
            <ul className="nav_admin nav">
                <li><NavLink className="nav__link" activeClassName="nav__link_active" to='/admin/users/users'>Отчеты для пользователей</NavLink></li>
                <li><NavLink className="nav__link" activeClassName="nav__link_active" to='/admin/users/groups'>Отчеты для групп пользователей</NavLink></li>
            </ul>
        </nav>
        <main className="admin__reports mt-main">
            <section className="admin__reports-col padding-small block">
                <div className="admin__reports-header">
                    <h2 className="title-small admin__reports-title mb-middle">Группы отчетов</h2>
                </div>
                <p className="list__item list__item_title grid2">
                    <span className="list__item-box text-small text-grey">Выбран</span>
                    <span className="list__item-box text-small text-grey">Имя</span>
                </p>
                <ul className="list ">
                    {data.map(item => <ListItem
                        key={item.id}
                        checked={reports.includes(item.id)} 
                        {...item} 
                        selectItem={selectItem(reports, setReports)} />)}
                </ul>
            </section>
            <Route exact path="/admin/users">
                <section className="admin__reports-col admin__btn-area">
                    <p className="text-grey text-main mb-middle">Для продолжения нажмите на необходимую сущность (пользователи, группы пользователей)</p>
                    {/* <Link to="/admin/users/users">Отчеты для пользователей</Link>
                    <Link to="/admin/users/groups">Отчеты для групп пользователей</Link> */}
                </section>
            </Route>
            <Route path="/admin/users/users">
                <section className="admin__reports-col padding-small block">
                    <div className="admin__reports-header">
                        <h2 className="title-small admin__reports-title mb-middle">Пользователи</h2>
                        <p className="text-grey text-small admin__reports-text">Чтобы посмотреть отчеты у пользователей, кликните по имени пользователя</p>
                    </div>
                    <p className="list__item list__item_title list__item-header grid2">
                        <span className="list__item-box text-small text-grey">Выбран</span>
                        <span className="list__item-box text-small text-grey">Имя</span>
                    </p>
                    <ul className="list">
                        {data.map(item => <ListDropdown
                            key={item.id} 
                            remove={false} 
                            checked={groups.includes(item.id)} 
                            {...item} 
                            selectItem={selectItem(groups, setGroups)} />)}
                    </ul>
                </section>
            </Route>
            <Route path="/admin/users/groups">
                <section className="admin__reports-col padding-small block">
                    <div className="admin__reports-header">
                        <h2 className="title-small admin__reports-title mb-middle">Группы пользователей</h2>
                        <p className="text-grey text-small admin__reports-text">Чтобы посмотреть отчеты у групп пользователей, кликните по названию группы</p>
                    </div>
                    <p className="list__item list__item_title list__item-header grid2">
                        <span className="list__item-box text-small text-grey">Выбран</span>
                        <span className="list__item-box text-small text-grey">Имя</span>
                    </p>
                    <ul className="list">
                        {data.map(item => <ListDropdown
                            key={item.id}
                            remove={false} 
                            checked={groups.includes(item.id)} 
                            {...item} 
                            selectItem={selectItem(groups, setGroups)} />)}
                    </ul>
                </section>
                
            </Route>
            
            <section className="admin__reports-col admin__btn-area">
                <button className="btn btn_blue text-uppercase" onClick={saveUsers}>Сохранить</button>
            </section>
        </main>
        </>
    )
}

export default UsersRouter;