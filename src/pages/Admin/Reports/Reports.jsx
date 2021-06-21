import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	setEntitiesIntoGroup,
	removeEntitiesFromGroup,
	removeGroups,
} from "../../../redux/mainReducer";
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
	let [modal, setModal] = useState({
		visible: false,
		screen: 1,
		error: false,
	});
	let [formLoading, setFormLoading] = useState(false);
	const dispatch = useDispatch();
	const reportGroups = useSelector((state) => state.main.reportGroups);
	const allReports = useSelector((state) => state.main.reports);
	const modalOptions = {
		visible: modal.visible,
		screen: modal.screen,
		error: modal.error,
		title: "Отчеты",
		success: modal.success,
		modal: setModal,
	};
	const addHandle = (id) => {
		setModal({ visible: true, screen: 1, error: false });
		setSelectGroup(id);
	};
	const removeHandle = async (id, list, full) => {
		if (!window.confirm("Вы уверены?")) return false;
		setFormLoading(true);
		let result;
		if (full) {
			result = await dispatch(removeEntitiesFromGroup(id, [], "report"));
		} else {
			if (list.length) {
				result = await dispatch(
					removeEntitiesFromGroup(id, list, "report")
				);
			} else {
				setError("Не выбраны удаляемые элементы");
			}
		}
		setFormLoading(false);
		if (result) {
			if (result.success) {
				setModal({
					visible: true,
					screen: 2,
					error: null,
					success: "Вы успешно удалили элементы",
				});
				return true;
			} else {
				setModal({ visible: true, screen: 3, error: result.error });
				return false;
			}
		} else {
			setModal({ visible: true, screen: 3, error: "Внутренняя ошибка" });
			return false;
		}
	};
	const onSubmit = async () => {
		if (selectGroup && reports.length) {
			setFormLoading(true);
			const result = await dispatch(
				setEntitiesIntoGroup(selectGroup, reports, "report")
			);
			setFormLoading(false);
			if (result.success) {
				setGroups([]);
				setReports([]);
				setModal({
					visible: true,
					screen: 2,
					error: null,
					success: "Вы успешно добавили элементы",
				});
			} else {
				setModal({ visible: true, screen: 3, error: result.error });
			}
		}
	};
	const removeGroupHandle = async (list) => {
		if (!list || !list.length) return false;
		if (!window.confirm("Вы уверены?")) return false;
		setFormLoading(true);
		const result = await dispatch(removeGroups(list, "report"));
		setFormLoading(false);
		if (result.success) {
			setReports([]);
		} else {
			setError(result.error);
		}
	};
	const data =
		reportGroups &&
		reportGroups.map((item) => ({
			id: item.id,
			name: item.name,
			data: item.reports,
		}));
	let busyReports = [];
	if (selectGroup && reportGroups) {
		const needGroup = reportGroups.find((item) => item.id === selectGroup);
		if (needGroup) {
			busyReports = needGroup.reports.map((item) => item.id);
		}
	}
	const modalData =
		allReports &&
		allReports
			.map((item) => ({ id: item.id, name: item.name }))
			.filter((item) => !busyReports.includes(item.id));
	const selectItem = (state, setState) => (id) => {
		if (state.includes(id)) {
			setState(state.filter((item) => item !== id));
		} else {
			setState([...state, id]);
		}
	};
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
				{reportGroups ? (
					<ul className="list ">
						{data && data.length ? (
							data.map((item) => (
								<ListDropdown
									remove={true}
									key={item.id}
									checked={groups.includes(item.id)}
									{...item}
									addHandle={addHandle}
									removeHandle={removeHandle}
									selectItem={selectItem(groups, setGroups)}
									formLoading={formLoading}
									removeGroupHandle={() =>
										removeGroupHandle([item.id])
									}
								/>
							))
						) : (
							<div className="padding-middle admin__reports-col-not">
								<p className="text-main mb-middle text-grey">
									Пока нет групп. Создайте их
								</p>
								<LoadButton
									onClick={() =>
										props.openModal({
											visible: true,
											screen: 1,
											error: false,
										})
									}
									addClass="btn_grey text-uppercase"
									text="Новая группа отчетов"
								/>
							</div>
						)}
					</ul>
				) : (
					<Loader />
				)}
			</section>
			{error && (
				<section className="admin__reports-erro">{error}</section>
			)}
			<section className="admin__reports-col admin__btn-area">
				<LoadButton
					onClick={() => removeGroupHandle(groups)}
					text="Удалить выбранные"
					addClass="btn_red text-uppercase"
					loading={formLoading}
				/>
				<LoadButton
					onClick={() =>
						props.openModal({
							visible: true,
							screen: 1,
							error: false,
						})
					}
					addClass="btn_grey text-uppercase"
					text="Новая группа отчетов"
				/>
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
						{modalData ? (
							modalData.length ? (
								modalData.map((item) => (
									<ListItem
										key={item.id}
										checked={reports.includes(item.id)}
										{...item}
										selectItem={selectItem(
											reports,
											setReports
										)}
									/>
								))
							) : (
								<li className="text-main text-grey padding-middle">
									Все отчеты уже добавлены
								</li>
							)
						) : (
							<Loader />
						)}
					</ul>
					<div className="modal__btn-area">
						<LoadButton
							onClick={onSubmit}
							loading={formLoading}
							text="Добавить выбранные"
							addClass="btn_blue text-uppercase"
						/>
					</div>
				</section>
			</ModalWrap>
		</main>
	);
};

export default Reports;
