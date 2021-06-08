import React from 'react';

const ListItem = ({name, id, selectItem, checked}) => {
    return (
        <li className="list__item grid2">
            <input 
                onChange={() => selectItem(id)} 
                checked={checked} 
                className="checkbox" 
                type="checkbox" />
            <p className="text-small">{name}</p>
        </li>
    )
}

export default ListItem;