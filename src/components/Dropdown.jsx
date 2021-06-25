import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = (props) => {
    let [open, setOpen] = useState(false);
    return (
        <div className="dropdown">
            <div className="dropdown__header" onClick={() => setOpen(!open)}>
                <p className={open ? "dropdown__title dropdown__title_open nav__link" : "dropdown__title nav__link"}>Еще</p>
            </div>
            {open && <ul className="dropdown__list">
                {props.data.map(item => {
                    return (
                        <li key={item.id}>
                            <Link onClick={() => setOpen(false)} to={props.link + item.id} className="dropdown__list-item">{item.name}</Link>
                        </li>
                    );
                })}
            </ul>}
        </div>
    );
}


export default Dropdown;