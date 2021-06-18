import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useDispatch, useSelector } from "react-redux";
import Input from '../../../components/Input';
import { isLength } from '../../../utils/validate';
import { getSettings, setSettings } from "../../../redux/mainReducer";
import LoadButton from '../../../components/LoadButton';
import Loader from "../../../components/Loader";

const Settings = (props) => {
    let [formLoading, setFormLoading] = useState(false);
    let fields = useSelector((state) => state.main.settings);
    const dispatch = useDispatch();
    const onSubmit = async (values, form) => {
        setFormLoading(true);
        const v = Object.values(values);
        if (!v || !v.length) return false;
        if(window.confirm('Подтвердите изменение настроек')) {
            console.log(values);
        }
        const result = await dispatch(setSettings(values));
        setFormLoading(false);
        if (result.success) {
            props.openModal({visible: true, screen: 2, success: 'Вы успешно изменили настройки'});
            form.restart();
        } else {
            props.openModal({visible: true, screen: 3, error: result.error});
        }
    } 

    useEffect(() => {
        dispatch(getSettings());
    }, [])

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
            <section class="settings__col">
                <div className="settings__des mb-main">
                    <h2 className="title-small mb-small">Настройки</h2>
                    <p className="text-small text-grey mb-middle">Здесь можно изменить настройки подключения к API Power BI</p>
                </div>
                <Form
                    onSubmit={onSubmit}>
                    {({ handleSubmit }) => (
                        <form className="admin__form" onSubmit={handleSubmit}>
                            {fields.map(item => (
                                <Field key={item.id} name={item.serviceName} validate={item.validate}>
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
            <section className="settings__col">
                <div className="settings__des mb-main">
                    <h2 className="title-small mb-middle">Текущие значения</h2>
                    {fields.map(item => (
                        <p key={item.id} className="text-small settings__text mb-small">
                            <span className="text-grey">{item.name}: </span>
                            <span>{item.value}</span>
                        </p>
                    ))}
                </div>
            </section>
        </main>
    )
}

export default Settings;