import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/Input";
import { setSettings, refreshData, setReports } from "../../../redux/mainReducer";
import LoadButton from '../../../components/LoadButton';
import Loader from "../../../components/Loader";

const Settings = (props) => {
    let [formLoading, setFormLoading] = useState(false);
    let fields = useSelector((state) => state.main.settings);
    const dispatch = useDispatch();
    const onSubmit = async (values, form) => {
		setFormLoading(true);
		const v = Object.values(values);
		if (!v || !v.length) {
			setFormLoading(false);
			return false;
		}
		if (window.confirm("Подтвердите изменение настроек")) {
			console.log(values);
		}
		const result = await dispatch(setSettings(values));
		setFormLoading(false);
		if (result.success) {
			props.openModal({
				visible: true,
				screen: 2,
				success: "Вы успешно изменили настройки",
			});
			form.restart();
		} else {
			props.openModal({ visible: true, screen: 3, error: result.error });
		}
	};
	const refreshUsersAndReports = async () => {
		setFormLoading(true);
		const repRes = await dispatch(setReports());
		const userRes = await dispatch(refreshData());
		setFormLoading(false);
		if (userRes.success && repRes.success) {
			props.openModal({
				visible: true,
				screen: 2,
				success: "Вы успешно обновили данные",
			});
		} else {
			props.openModal({
				visible: true,
				screen: 3,
				error: "Ошибка обновления данных",
			});
		}
	} 

    if (!fields) {
		return (
			<main className="main block padding-small mt-main">
				<Loader />
			</main>
		);
	}

    fields = fields.map(item => ({...item, text: item.name, placeholder: item.name}))

    return (
		<main className="main settings block padding-small mt-main">
			<section className="settings__col settings__form">
				<div className="settings__des mb-main">
					<h2 className="title-small mb-small">Настройки</h2>
					<p className="text-small text-grey mb-middle">
						Здесь можно изменить настройки подключения к API Power
						BI
					</p>
				</div>
				<Form onSubmit={onSubmit}>
					{({ handleSubmit }) => (
						<form className="admin__form" onSubmit={handleSubmit}>
							{fields.map((item) => (
								<Field
									key={item.id}
									name={item.serviceName}
									validate={item.validate}
								>
									{(fieldProps) => (
										<Input
											input={fieldProps.input}
											meta={fieldProps.meta}
											addClass="mb-middle"
											{...item}
										/>
									)}
								</Field>
							))}
							<LoadButton
								text="Сохранить"
								addClass="btn_blue text-uppercase"
								loading={formLoading}
							/>
						</form>
					)}
				</Form>
			</section>
			<section className="settings__col settings__current">
				<div className="settings__des mb-main">
					<h2 className="title-small mb-middle">Текущие значения</h2>
					{fields.map((item) => (
						<p
							key={item.id}
							className="text-small settings__text mb-small"
						>
							<span className="text-grey">{item.name}: </span>
							<span>{item.value}</span>
						</p>
					))}
				</div>
			</section>
			<section className="settings__col settings__db">
				<div className="settings__des mb-main">
					<h2 className="title-small mb-small">Обновление базы данных</h2>
					<p className="text-small text-grey mb-middle">
						Нажмите на кнопку, чтобы обновить данные отчетов и пользователей. Это полезно, если необходимо мгновенно увидеть измененения из Power BI
					</p>
				</div>
				<LoadButton
					text="Обновить"
					onClick={refreshUsersAndReports}
					addClass="btn_blue text-uppercase"
					loading={formLoading}
				/>
			</section>
		</main>
	);
}

export default Settings;