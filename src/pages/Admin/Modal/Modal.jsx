import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../components/Input';
import { isLength } from '../../../utils/validate';
import LoadButton from '../../../components/LoadButton';
import { setGroup } from '../../../redux/mainReducer';
import ModalWrap from "../Modal/ModalWrap";

const Modal = ({modal, openModal, type}) => {
	let [formLoading, setFormLoading] = useState(false);
	const dispatch = useDispatch();
	const onSubmit = async (values) => {
		setFormLoading(true);
		const body = {
			...values,
			type
		}
		const result = await dispatch(setGroup(body));
		setFormLoading(false);
		if (result.success) {
			const success =
				type === "report"
					? "Вы успешно создали группу отчетов"
					: "Вы успешно создали группу пользователей";
			openModal({ visible: true, screen: 2, error: null, success });
		} else {
			openModal({visible: true, screen: 3, error: result.error});
		}
	};
	const fields = [
		{
			id: 1,
			name: "name",
			req: true,
			validate: isLength(5, 200),
			text: "Название",
			placeholder: "Введите название",
		},
		{
			id: 2,
			name: "description",
			req: false,
			validate: null,
			text: "Описание",
			placeholder: "Введите описание",
		},
	];
	const modalOptions = {
		visible: modal.visible,
		screen: modal.screen,
		error: modal.error,
		title:
			type === "report"
				? "Создать группу отчетов"
				: "Создать группу пользователей",
		success: modal.success,
		modal: openModal,
	};
	return (
		<ModalWrap options={modalOptions}>
			<Form onSubmit={onSubmit}>
				{({ handleSubmit }) => (
					<form
						className="admin__form"
						onSubmit={handleSubmit}
					>
						{fields.map((item) => (
							<Field
								key={item.id}
								name={item.name}
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
							text="Создать"
							addClass="btn_blue text-uppercase"
							loading={formLoading}
						/>
					</form>
				)}
			</Form>
		</ModalWrap>
	);
}

export default Modal;