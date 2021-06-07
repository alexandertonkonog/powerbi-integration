import React, {useState} from 'react';

const Select = (props) => {
    const name = props.value && props.data.find((item) => item.id === props.value)?.name;
    let [open, setOpen] = useState(false);
    let [selected, setSelected] = useState(false);
    let selectClass = open ? 'select select_open' : 'select';
    if (props.error) {
        selectClass += ' select_error';
    }
    let clickHeaderCallback = () => {
        setOpen(!open);
    }
    let clickItemCallback = (id, valueID) => {
        props.clickItem(id, valueID);
        setSelected(true);
        setOpen(false);
    }
    return (
        <div className={"select-container " + props.addClass}>
            <p className="input-header mb-small text-small text-grey">
                <label className="input-label">
                    { props.text } 
                    {props.req  && <span className="input_req">*</span>}
                </label>
            </p>
            <div className={selectClass}>
                <div className="select__header" onClick={clickHeaderCallback}>
                    <p className="select__title select__text">{name || props.placeHolder}</p>
                    <svg className="select__selector" width="15" height="16" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.73279 9.31955C6.35699 8.91484 5.72426 8.8914 5.31955 9.26721C4.91484 9.64301 4.8914 10.2757 5.26721 10.6805L6.73279 9.31955ZM12.5 17L11.7672 17.6805C11.9564 17.8842 12.2219 18 12.5 18C12.7781 18 13.0436 17.8842 13.2328 17.6805L12.5 17ZM19.7328 10.6805C20.1086 10.2757 20.0852 9.64301 19.6805 9.26721C19.2757 8.8914 18.643 8.91484 18.2672 9.31955L19.7328 10.6805ZM5.26721 10.6805L11.7672 17.6805L13.2328 16.3195L6.73279 9.31955L5.26721 10.6805ZM13.2328 17.6805L19.7328 10.6805L18.2672 9.31955L11.7672 16.3195L13.2328 17.6805Z" fill="#859299"/>
                    </svg>
                </div>
                <ul className="select__list">
                    {props.data.map((item) => <li 
                        key={item.id}
                        onClick={() => clickItemCallback(props.id, item.id)}
                        className="select__list-item select__text">{item.name}</li>)}
                </ul>
            </div>
            
        </div>
        
    );
}
Select.defaultProps = {
    data: [
        {id: 1, name: 'Ростов'},
        {id: 2, name: 'Таганрог'},
        {id: 3, name: 'Краснодар'},
        {id: 4, name: 'Ейск'},
    ],
    title: 'Город',
    placeHolder: 'Выберите из списка',
    clickItem: () => {},
    type: 0,
    addClass: ''
}

export default Select;