import React, { useState } from 'react';
import LoadButton from './LoadButton';

const ListDropdown = ({
	name,
	id,
	selectItem,
	checked,
	remove,
	addHandle,
	removeHandle,
	formLoading,
	data,
	removeGroupHandle
}) => {
	let [selected, setSelected] = useState([]);
	let [open, setOpen] = useState(false);
	const selectDropDownItem = (id) => {
		if (selected.includes(id)) {
			setSelected(selected.filter((item) => item !== id));
		} else {
			setSelected([...selected, id]);
		}
	};
	const removeFunc = async (full) => {
		await removeHandle(id, selected, full);
		setSelected([]);
	}
	return (
		<li className="list__item list__item_dropdown">
			<div className="list__item-header grid4">
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
				<button
					onClick={() => addHandle(id)}
					className="btn btn_small btn_blue text-uppercase"
				>
					Добавить
				</button>
				{remove && <LoadButton 
					addClass="btn_small btn_red text-uppercase" 
					text="Удалить"
					onClick={removeGroupHandle} 
					loading={formLoading} />
				}
			</div>
			{open && (
				<ul className="list__item-dropdown">
					{data.length ? (
						data.map((item) => (
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
					) : (
						<li className="list__item text-small text-grey">
							Нет добавленных элементов
						</li>
					)}
				</ul>
			)}
			{open && data.length ? (
				<div className="list__item-btn-area">
					<LoadButton 
						addClass="btn_grey text-uppercase"
						onClick={() => removeFunc(false)}
						text="Удалить выбранные"
						loading={formLoading} />
					<LoadButton 
						addClass="btn_red text-uppercase"
						onClick={() => removeFunc(true)}
						text="Очистить"
						loading={formLoading} />
				</div>
			) : (
				<></>
			)}
		</li>
	);
};

export default ListDropdown;