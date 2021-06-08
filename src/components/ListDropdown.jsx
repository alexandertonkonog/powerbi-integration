import React, { useState } from 'react';

const ListDropdown = ({name, id, selectItem, checked, list, remove}) => {
    let [selected, setSelected] = useState([]);
    let [open, setOpen] = useState(false);
    const selectDropDownItem = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(item => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    }
    const data = [
        {id: 1, name: 'Подимя 1'},
        {id: 2, name: 'Подимя 2'},
        {id: 3, name: 'Подимя 3'},
        {id: 4, name: 'Подимя 4'},
    ]
    return (
        <li className="list__item list__item_dropdown">
            <p className="list__item-header grid3">
                <input 
                    onChange={() => selectItem(id)} 
                    checked={checked} 
                    className="checkbox" 
                    type="checkbox" />
                <p 
                    className="text-small list__item-title"
                    onClick={() => setOpen(!open)}>{name}</p>
                {remove && <button className="btn btn_small btn_red text-uppercase">Удалить</button>}
            </p>
            {open && <ul className="list__item-dropdown">
                {data.map(item => (
                    <li className="list__item grid2" key={item.id}>
                        <input 
                            onChange={() => selectDropDownItem(item.id)} 
                            checked={selected.includes(item.id)} 
                            className="checkbox" 
                            type="checkbox" />
                        <p className="text-small">{item.name}</p>
                    </li>
                ))}
            </ul>}
            {open && <div className="list__item-btn-area">
                <button className="btn btn_grey text-uppercase">Удалить выбранные</button>
                <button className="btn btn_red text-uppercase">Очистить</button>
            </div>}
        </li>
    )
}

export default ListDropdown;