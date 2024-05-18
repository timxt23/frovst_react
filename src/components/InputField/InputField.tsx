import type { FC, ChangeEvent } from 'react';

import "./InputField.css"


type Params = {
    label?: string;
    type?: string;
    name?: string;
    placeholder?: string;
    pattern?: string;
    value?: string | number;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}


const todayDate = () => {

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // добавляем ноль в начале, если месяц < 10
    const day = String(today.getDate()).padStart(2, '0'); // добавляем ноль в начале, если день < 10

    return `${year}-${month}-${day}`
}

const sevenDaysAgo = () => {
    const today = new Date();

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const year = sevenDaysAgo.getFullYear();
    const month = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0'); // добавляем ноль в начале, если месяц < 10
    const day = String(sevenDaysAgo.getDate()).padStart(2, '0'); // добавляем ноль в начале, если день < 10

    return `${year}-${month}-${day}`
}


export const InputField: FC<Params> = (props: Params) => {
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