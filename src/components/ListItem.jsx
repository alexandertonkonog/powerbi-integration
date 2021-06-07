import React from 'react';

const ListItem = ({name, id, selectItem, checked}) => {
    return (
        <li className="list__item">
            <input 
                onChange={() => selectItem(id)} 
                checked={checked} 
                className="checkbox" 
                type="checkbox" />
            <p className="text-main">{name}</p>
        </li>
    )
}

export default ListItem;