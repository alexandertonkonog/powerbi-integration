import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import Input from '../../../components/Input';
import { isLength } from '../../../utils/validate';
import LoadButton from '../../../components/LoadButton';

const Settings = () => {
    let [formLoading, setFormLoading] = useState(false);
    const fields = [
        {id: 1, name: 'name', req: true, validate: isLength(10, 30), text: 'Новый логин', placeholder: 'Введите название'},
        {id: 2, name: 'password', req: true, validate: isLength(5, 30), text: 'Новый пароль', placeholder: 'Введите пароль'},
    ];
    const onSubmit = (values) => {
        console.log(values);
    } 
    return (
        <main className="main block padding-small mt-main">
            <section class="settings__col">
                <div className="settings__des mb-main">
                    <h2 className="title-small mb-small">Настройки</h2>
                    <p className="text-small text-grey mb-middle">Здесь можно изменить настройки подключения к API Power BI</p>
                    <p className="text-small mb-small">
                        <span>Текущий логин: </span>
                        <span className="text-grey">2312321321313@mail.ru</span>
                    </p>
                    <p className="text-small">
                        <span>Текущий пароль: </span>
                        <span className="text-grey">2312321321313</span>
                    </p>
                </div>
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
                            <LoadButton 
                                text="Сохранить" 
                                addClass="btn_blue text-uppercase" 
                                loading={formLoading} />
                        </form>
                    )}
                </Form>
            </section>
        </main>
    )
}

export default Settings;