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

const Groups = (props) => {
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
	const userGroups = useSelector((state) => state.main.userGroups);
	const users = useSelector((state) => state.main.users);
	const modalOptions = {
		visible: modal.visible,
		screen: modal.screen,
		error: modal.error,
		title: "Пользователи",
		success: "Вы успешно добавили элементы",
		modal: setModal,
	};
	const addHandle = (id) => {
		setModal({ visible: true, screen: 1, error: false });
		setSelectGroup(id);
	};
	const removeHandle = async (id, list, full) => {
		if (id === 1 && list.length === 1) {
			alert("Нельзя удалить последнего члена группы администраторов");
			return false;
		}
		if (!window.confirm("Вы уверены?")) return false;
		setFormLoading(true);
		let result;
		if (full) {
			if (id === 1) {
				alert("Нельзя очистить группу администраторов");
			}
			result = await dispatch(
				removeEntitiesFromGroup(id, [], "userUserGroup")
			);
		} else {
			if (list.length) {
				result = await dispatch(
					removeEntitiesFromGroup(id, list, "userUserGroup")
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
				setEntitiesIntoGroup(selectGroup, reports, "userUserGroup")
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
	const removeGroupHandle = async (list) => {
		if (!list || !list.length) return false;
		if (list.includes(1)) {
			alert("Нельзя удалить группу администраторов");
			return false;
		}
		if (!window.confirm("Вы уверены?")) return false;
		setFormLoading(true);
		const result = await dispatch(removeGroups(list, "userGroup"));
		setFormLoading(false);
		if (result.success) {
			setReports([]);
		} else {
			setError(result.error);
		}
	};
	const data =
		userGroups &&
		userGroups.map((item) => ({
			id: item.id,
			name: item.name,
			data: item.users,
		}));
	let busyReports = [];
	if (selectGroup && userGroups) {
		const needGroup = userGroups.find((item) => item.id === selectGroup);
		if (needGroup) {
			busyReports = needGroup.users.map((item) => item.id);
		}
	}
	const modalData =
		users &&
		users
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
						Группы пользователей
					</h2>
					<p className="text-grey text-small admin__reports-text">
						Чтобы посмотреть пользователей в группе, кликните по
						названию группы
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
				{userGroups ? (
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
									text="Новая группа пользователей"
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
					text="Новая группа пользователей"
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
									Все пользователи уже добавлены
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

export default Groups;
