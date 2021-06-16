import React, { useState } from 'react';

const ListDropdown = ({name, id, selectItem, checked, list, remove, addHandle, data}) => {
    let [selected, setSelected] = useState([]);
    let [open, setOpen] = useState(false);
    const selectDropDownItem = (id) => {
        if (selected.includes(id)) {
            setSelected(selected.filter(item => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    }
    return (
		<li className="list__item list__item_dropdown">
			<p className="list__item-header grid4">
				<input
					onChange={() => selectItem(id)}
					checked={checked}
					className="checkbox"
					type="checkbox"
				/>
				<p
					className="text-small list__item-title"
					onClick={() => setOpen(!open)}
				>
					{name}
				</p>
                <button onClick={() => addHandle(id)} className="btn btn_small btn_blue text-uppercase">
                    Добавить
                </button>
				{remove && (
					<button className="btn btn_small btn_red text-uppercase">
						Удалить
					</button>
				)}
			</p>
			{open && (
				<ul className="list__item-dropdown">
					{data.length	
						? data.map((item) => (
							<li className="list__item grid2" key={item.id}>
								<input
									onChange={() => selectDropDownItem(item.id)}
									checked={selected.includes(item.id)}
									className="checkbox"
									type="checkbox"
								/>
								<p className="text-small">{item.name}</p>
							</li>
						))
						: <li className="list__item text-small text-grey">Нет добавленных отчетов</li>
					}
				</ul>
			)}
			{open && data.length 
				? (
					<div className="list__item-btn-area">
						<button className="btn btn_grey text-uppercase">
							Удалить выбранные
						</button>
						<button className="btn btn_red text-uppercase">
							Очистить
						</button>
					</div>
				)
				: <></>
			}
		</li>
	);
}

export default ListDropdown;