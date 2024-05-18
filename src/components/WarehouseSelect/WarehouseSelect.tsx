import Select, { ActionMeta, SingleValue }  from 'react-select'

import "./WarehouseSelect.css"


export type OptionType = {
    value: string;
    label: string;
};

type WarehouseSelectProps = {
    options: OptionType[];
    onChange?: (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
};


// eslint-disable-next-line react/prop-types
export const WarehouseSelect: React.FC<WarehouseSelectProps> = ({ options, onChange }) => {
    return (
        <div className='search-box'>
                <p className='search-box__p'>Выберите склад/лицо</p>
                <Select
                    options={options}
                    onChange={onChange}
                    isClearable={true}
                    placeholder="Выберите вариант..."
                    styles={{
                        control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? 'var(--tg-theme-link-color)' : 'var(--tg-theme-link-color)',
                        borderRadius: '12px',
                        height: '7vh',
                        backgroundColor: 'var(--tg-theme-bg-color)',
                        color: 'var(--tg-theme-text-color, black)',
                        }),
                        singleValue: (baseStyles) => ({
                            ...baseStyles,
                            color: 'var(--tg-theme-text-color, black)',
                            fontSize: '1em',
                        }),
                        option: (baseStyles, state) => ({
                            ...baseStyles,
                            color: 'var(--tg-theme-text-color, black)',
                            backgroundColor: state.isSelected ? 'var(--tg-theme-link-color)' : '',
                            ':active': {backgroundColor: 'var(--tg-theme-link-color)'}
                        }),
                        
                        menuList: (baseStyles) => ({
                            ...baseStyles,
                            backgroundColor: 'var(--tg-theme-bg-color)',
                            border: '2px solid var(--tg-theme-link-color)',
                            borderRadius: '5px'
                        }),
                    
                    }}
                />
            </div>
    );
};