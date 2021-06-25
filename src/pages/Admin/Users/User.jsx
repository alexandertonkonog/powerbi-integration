import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	getUsers,
	getReportGroups,
	setEntitiesIntoGroup,
	removeEntitiesFromGroup,
} from "../../../redux/mainReducer";
import ModalWrap from "../Modal/ModalWrap";
import ListItem from "../../../components/ListItem";
import Loader from "../../../components/Loader";
import LoadButton from "../../../components/LoadButton";
import ListDropdown from "../../../components/ListDropdown";

const User = (props) => {
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
	const reportGroups = useSelector((state) => state.main.reportGroupsAdmin);
	const users = useSelector((state) => state.main.users);
	const modalOptions = {
		visible: modal.visible,
		screen: modal.screen,
		error: modal.error,
		title: "Группы отчетов",
		success: "Вы успешно добавили элементы",
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
			result = await dispatch(removeEntitiesFromGroup(id, [], "user"));
		} else {
			if (list.length) {
				result = await dispatch(
					removeEntitiesFromGroup(id, list, "user")
				);
			} else {
				setError("Не выбраны удаляемые элементы");
			}
		}
		setFormLoading(false);
		if (result) {
			if (result.success) {
				setModal({ visible: true, screen: 2, error: null });
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
				setEntitiesIntoGroup(selectGroup, reports, "user")
			);
			setFormLoading(false);
			if (result.success) {
				setGroups([]);
				setReports([]);
				setModal({ visible: true, screen: 2, error: result.null });
			} else {
				setModal({ visible: true, screen: 3, error: result.error });
			}
		}
	};

	const data =
		users &&
		users.map((item) => ({
			id: item.id,
			name: item.name,
			data: item.report_groups,
		}));
	let busyReports = [];
	if (selectGroup && reportGroups) {
		const needGroup = users.find((item) => item.id === selectGroup);
		if (needGroup) {
			busyReports = needGroup.report_groups.map((item) => item.id);
		}
	}
	const modalData =
		reportGroups &&
		reportGroups
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
						Пользователи
					</h2>
					<p className="text-grey text-small admin__reports-text">
						Чтобы посмотреть отчеты пользователя, кликните по имени
						пользователя
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
				</p>
				{users ? (
					<ul className="list ">
						{data && data.length ? (
							data.map((item) => (
								<ListDropdown
									key={item.id}
									checked={groups.includes(item.id)}
									{...item}
									addHandle={addHandle}
									removeHandle={removeHandle}
									selectItem={selectItem(groups, setGroups)}
									formLoading={formLoading}
								/>
							))
						) : (
							<div className="padding-middle admin__reports-col-not">
								<p className="text-main mb-middle text-grey">
									Пока нет пользователей. Добавьте
									пользователей Битрикс 24
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
									text="Добавить пользователей"
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

export default User;
