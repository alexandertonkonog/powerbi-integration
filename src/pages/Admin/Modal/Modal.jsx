import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import Input from '../../../components/Input';
import { isLength } from '../../../utils/validate';
import LoadButton from '../../../components/LoadButton';

const Modal = (props) => {
    let [formLoading, setFormLoading] = useState(false);
    const onSubmit = (values) => {
        console.log(values);
    }
    const fields = [
        {id: 1, name: 'name', req: true, validate: isLength(10, 30), text: 'Название', placeholder: 'Введите название'},
        // {id: 2, name: 'name', req: true, validate: null, text: 'Название', placeholder: 'Введите название'},
    ];
    return (
        <div className="modal">
            <div className="modal__content">
                <p 
                    className="modal__exit" 
                    onClick={() => props.openModal({visible: false, screen: 1, error: null})}>
                        &times;
                </p>
                <h2 className="title-small mb-main">Создание новой группы отчетов</h2>
                {props.modal.screen === 1 && <div className="modal__screen">
                    <Form
                        onSubmit={onSubmit}>
                        {({ handleSubmit }) => (
                            <form className="admin__form" onSubmit={handleSubmit}>
                                {fields.map(item => (
                                    <Field name={item.name} validate={item.validate}>
                                        {fieldProps => <Input 
                                            input={fieldProps.input} 
                                            meta={fieldProps.meta}
                                            addClass="mb-middle"
                                            {...item} />}
                                    </Field>
                                ))}
                                <LoadButton text="Создать" addClass="btn_blue text-uppercase" loading={formLoading} />
                            </form>
                        )}
                    </Form>
                </div>}
                {props.modal.screen === 2 && <div className="modal__screen">
                    <p className="text-main text-grey">Вы успешно создали группу</p>
                </div>}
                {props.modal.screen === 3 && <div className="modal__screen">
                    <p className="text-main text-grey">Произошла ошибка. Группа не создана</p>
                </div>}
            </div>  
        </div>
    )
}

export default Modal;