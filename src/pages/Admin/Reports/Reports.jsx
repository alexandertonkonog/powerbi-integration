import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getReportGroups, getReports, setReportsIntoGroup } from '../../../redux/mainReducer';
import ModalWrap from "../Modal/ModalWrap";
import ListItem from "../../../components/ListItem";
import Loader from "../../../components/Loader";
import LoadButton from "../../../components/LoadButton";
import ListDropdown from "../../../components/ListDropdown";

const Reports = (props) => {
	let [reports, setReports] = useState([]);
	let [groups, setGroups] = useState([]);
	let [error, setError] = useState(false);
	let [selectGroup, setSelectGroup] = useState(null);
	let [modal, setModal] = useState({visible: false, screen: 1, error: false});
	let [formLoading, setFormLoading] = useState(false);
	const dispatch = useDispatch();
	const reportGroups = useSelector(state => state.main.reportGroups);
	const allReports = useSelector(state => state.main.reports);
	const modalOptions = {
		visible: modal.visible,
		screen: modal.screen,
		error: modal.error,
		title: 'Отчеты',
		success: 'Вы успешно добавили элементы',
		modal: setModal
	}
	const addHandle = (id) => {
		setModal({visible: true, screen: 1, error: false});
		setSelectGroup(id);
	}
	const onSubmit = async () => {
		console.log(selectGroup, reports);
		if (selectGroup && reports.length) {
			setFormLoading(true);
			const result = await dispatch(setReportsIntoGroup(selectGroup, reports));
			setFormLoading(false);
		}
	}
	const data = reportGroups && reportGroups.map(item => ({id: item.id, name: item.name, data: item.reports}));
	const modalData = allReports && allReports.map(item => ({id: item.id, name: item.name}));
	const selectItem = (state, setState) => (id) => {
		if (state.includes(id)) {
			setState(state.filter((item) => item !== id));
		} else {
			setState([...state, id]);
		}
	};
	useEffect(() => {
		dispatch(getReportGroups());
		dispatch(getReports());
	}, [])
	return (
		<main className="admin__reports mt-main">
			<section className="admin__reports-col padding-small block">
				<div className="admin__reports-header">
					<h2 className="title-small admin__reports-title mb-middle">
						Группы отчетов
					</h2>
					<p className="text-grey text-small admin__reports-text">
						Чтобы посмотреть отчеты в группе, кликните по названию
						группы
					</p>
				</div>
				<p className="list__item list__item_title grid4">
					<span className="list__item-box text-small text-grey">
						Выбран
					</span>
					<span className="list__item-box text-small text-grey">
						Имя
					</span>
					<span className="list__item-box text-small text-grey">
						Добавить
					</span>
					<span className="list__item-box text-small text-grey">
						Удалить
					</span>
				</p>
				{reportGroups ? 
					(<ul className="list ">
						{data.map((item) => (
							<ListDropdown
								remove={true}
								key={item.id}
								checked={groups.includes(item.id)}
								{...item}
								addHandle={addHandle}
								selectItem={selectItem(groups, setGroups)}
							/>
						))}
					</ul>)
					: <Loader />
				}
			</section>
			<section className="admin__reports-col admin__btn-area">
				<button className="btn btn_blue text-uppercase">
					Сохранить
				</button>
				<button className="btn btn_red text-uppercase">
					Удалить выбранные
				</button>
				<button
					onClick={() =>
						props.openModal({
							visible: true,
							screen: 1,
							error: false,
						})
					}
					className="btn btn_grey text-uppercase"
				>
					Новая группа отчетов
				</button>
			</section>
			<ModalWrap options={modalOptions}>
				<section className="admin__reports-col padding-small">
					<p className="list__item list__item_title grid2">
						<span className="list__item-box text-small text-grey">
							Выбран
						</span>
						<span className="list__item-box text-small text-grey">
							Имя
						</span>
					</p>
					<ul className="list ">
						{modalData 
							? modalData.map((item) => (
								<ListItem
									key={item.id}
									checked={reports.includes(item.id)}
									{...item}
									selectItem={selectItem(reports, setReports)}
								/>
							))
							: <Loader />
						}
					</ul>
					<div className="modal__btn-area">
						<LoadButton onClick={onSubmit} loading={formLoading} text="Добавить выбранные" addClass="btn_blue text-uppercase" />
					</div>
				</section>
			</ModalWrap>
		</main>
	);
};

export default Reports;
