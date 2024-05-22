import { FC, useState, useEffect } from 'react';
import { HapticFeedback, useMainButton, postEvent, useInitData, usePopup } from '@tma.js/sdk-react';

import { Radio, ConfigProvider, RadioChangeEvent } from 'antd';
import axios from "axios";

import { Page } from '@/components/Page/Page.tsx';
import { InputField } from '@/components/InputField/InputField';
import { WarehouseSelect } from '@/components/WarehouseSelect/WarehouseSelect';
import { OpenPopupOptions } from '@tma.js/sdk-react';

import "./CashPage.css"
import { SingleValue } from 'react-select';

const WHPATH = `${import.meta.env.VITE_DEV_BACKEND_API}`
const AUTHHEADER = `${import.meta.env.VITE_DEV_AUTH}`


type FormData = {
    date: string;
    amount: string;
    comment: string;
    warehouse: string;
    type: string;
    user_id?: number;
    hash?: string;
  };

interface OptionType {
    value: string;
    label: string;
  }

const operationTypes = [
    { label: 'Приход', value: 'income' },
    { label: 'Расход', value: 'outcome' }
]


export const CashPage: FC = () => {
    const haptic = new HapticFeedback('6.3', postEvent);
    
    const initData = useInitData();
    const [warehouses, setWarehouses] = useState([]);
    const options1: OptionType[] = warehouses.map(option => ({
        value: option,
        label: option
      }));

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const initialState: FormData = {
        date: '',
        amount: '',
        comment: '',
        warehouse: '',
        type: 'income',
        user_id: initData?.user?.id,
        hash: initData?.hash
    }

    const [formData, setFormData] = useState<FormData>(initialState);

    const popup = usePopup()
    const popupParamsSucces: OpenPopupOptions = {
        title: 'Статус',
        message: 'Запись отправлена',
        buttons: [{ id: 'ok', type: 'default', text: 'Хорошо' }]
    }
    const popupParamsError: OpenPopupOptions = {
        title: 'Ошибка',
        message: 'Что-то пошло не так, нужен Тимур',
        buttons: [{ id: 'ok', type: 'default', text: 'Ок' }]
    }


    const fetchPostCashItem = ({ formData }: {formData: FormData}) => {
        axios
            .post(`${WHPATH}new_item/`, formData, {headers: {
                "Localtunnel-Agent-Ips": AUTHHEADER,
                "Content-type": "application/json"
            }})
            .then((response) => {
                response.status === 200 
                    ? haptic.notificationOccurred('success') 
                    : haptic.notificationOccurred('error')
                setFormData(initialState)
                popup.open(popupParamsSucces)
            }).catch((error) => {
                console.log(error)
                popup.open(popupParamsError)
            });
    }

    useEffect(() => {
        haptic.notificationOccurred('success');
        const abortController = new AbortController();
        const signal = abortController.signal;

        const fetchListOfWarehouses = () => {
            axios
                .get(`${WHPATH}clients`, { signal, headers: {
                    "Localtunnel-Agent-Ips": AUTHHEADER,
                    "Content-type": "application/json"
                    } })
                .then(({ data }) => {
                    setWarehouses(data.data)
                    setError(null)
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log('Загрузка отменена')
                        return;
                    }
                    setError(error.name)
                    haptic.notificationOccurred('error');
                })
            .finally(() => setIsLoading(false));
        };

        fetchListOfWarehouses();

        return () => {
            abortController.abort()
            setIsLoading(true);
        };
    }, [])

    const handleFormData = <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(event: React.ChangeEvent<T>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({...prev, [name]: value}))
        haptic.selectionChanged()
    }

    const handleRadioChange = (event: RadioChangeEvent) => {
    const { name, value } = event.target;
    if (typeof name === 'string') {
      setFormData((prev) => ({ ...prev, [name]: value }));
      haptic.impactOccurred('medium')
    }
  };

    const handleSelectData = (option: SingleValue<OptionType> | null) => {
        if (option) {
            setFormData((prev) => ({ ...prev, warehouse: option.value }));
            haptic.selectionChanged();
          } else {
            setFormData((prev) => ({ ...prev, warehouse: '' }));
          }
    }

      const areAllValuesFilled = (object: FormData) => {
        return Object.values(object).every(value => value !== null && value !== undefined && value !== '');
      };
    
      const allFilled = areAllValuesFilled(formData);

    
      const ComponentA = () => {
        const mb = useMainButton();
      
        useEffect(() => {
          mb.setParams({
            text: 'Записать ' + (formData.type === 'income' ? "Приход" : "Расход"),
            textColor: '#ffffff',
            //backgroundColor: formData.type === 'income' ? "#52c41a" : "#ff4d4f"
          });
          if(allFilled) {
            mb.enable()
            mb.show()
            return mb.on('click', () => {fetchPostCashItem({formData})}, true);
          } else {
            mb.setParams({
                //backgroundColor: formData.type === 'income' ? "#aff08e" : "#ffb3b4"
            })
            mb.disable()
            mb.show()
          }
          
        }, []);
      
        return null;
      }

    return (
    <Page title="Финансы в таблицу">
        <p>
            {initData ? initData?.user?.firstName : 'Юзер'}, выбери тип операции и заполните информацию о ней.
        </p>
        
        <div className='radio-buttons-box'>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: formData.type === 'income' ? "#52c41a" : "#ff4d4f",
                        fontSize: 16,
                        size: 50,
                        colorBgContainer: "var(--tg-theme-bg-color)",
                        colorText: "var(--tg-theme-text-color)"
                    }
                }}>
                <Radio.Group
                    name='type'
                    // onMouseLeave={() => (haptic.impactOccurred('medium'))}
                    onChange={handleRadioChange}
                    options={operationTypes}
                    value={formData.type}
                    optionType='button'
                    buttonStyle="solid"
                />
            </ConfigProvider>
        </div>
        {isLoading ? <p>Загружаем склады...</p> : <WarehouseSelect
            options={options1} 
            onChange={handleSelectData}
        />}
        <p>{error ? `Ошибка выгрузки складов: ${error}` : null}</p>
        <form className='form-cash'>
            <InputField
                label='Дата операции'
                type='date'
                name='date'
                placeholder="Дата"
                pattern=""
                value={formData.date}
                onChange={handleFormData}
            />
            <InputField
                label='Сумма в руб.'
                type='number'
                name='amount'
                placeholder="Сумма"
                pattern="\d*"
                value={formData.amount}
                onChange={handleFormData}
            />
            <InputField
                label='Комментарий'
                type='text'
                name='comment'
                placeholder="Комментарий"
                pattern=""
                value={formData.comment}
                onChange={handleFormData}
            />
        </form>
        <ComponentA/>
        
    </Page>
    )
}
