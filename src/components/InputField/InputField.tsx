import type { FC } from 'react';

import "./InputField.css"


type Params = {
    label?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    pattern?: string;
    value?: any;
    onChange?: any;
}


const todayDate = () => {

    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0'); // добавляем ноль в начале, если месяц < 10
    let day = String(today.getDate()).padStart(2, '0'); // добавляем ноль в начале, если день < 10

    return `${year}-${month}-${day}`
}

const sevenDaysAgo = () => {
    let today = new Date();

    let sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    let year = sevenDaysAgo.getFullYear();
    let month = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0'); // добавляем ноль в начале, если месяц < 10
    let day = String(sevenDaysAgo.getDate()).padStart(2, '0'); // добавляем ноль в начале, если день < 10

    return `${year}-${month}-${day}`
}


export const InputField: FC = (props: Params) => {
    const isDate = props.type === 'date';


   return (
        <label className='form-cash__label'>
                    {props.label}
                    <input
                        className='form-cash__input-amount'
                        type={props.type}
                        name={props.name}
                        required
                        min={isDate ? sevenDaysAgo() : ''}
                        max={isDate ? todayDate() : ''}
                        placeholder={props.placeholder}
                        pattern={props.pattern}
                        value={props.value}
                        onChange={props.onChange}
                    ></input>
                </label>
   )
}