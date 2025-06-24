'use client'
import { act, useState } from 'react';
import Checkbox from '@/uiKit/checkBox/checkBox';
import { useForm } from 'react-hook-form';
import { Chips } from '@/uiKit/chips/chips';
import Calendar from '@/uiKit/calendar/calendar';
import InputSwitch from '@/uiKit/inputSwitch/inputSwitch';
import InputOtp from '@/uiKit/inputOtp/inputOtp';
import InputTextArea from '@/uiKit/inputTextArea/inputTextArea';
import RadioGroup from '@/uiKit/radioGroup/radioGroup';
import Rating from '@/uiKit/rating/rating';
import DataView from '@/uiKit/dataView/dataView';
import OrderList from '@/uiKit/orderList/orderList';
import { Dropdown } from '@/uiKit/dropdown/dropdown';


interface teste {
    name: string,
    price: string
}
export default function Component() {
    const [a, b] = useState('')
    const [c, d] = useState('')
    return (
        <div className="w-screen h-screen flex flex-col gap-20 items-center justify-center">
            <Dropdown content={['1', '2']} value={c} onChangeValue={(e) => d(e)} className='text-white'/>
            <Calendar date={a} setDate={(e) => b(e)} showButtonBar showIcon/>
        </div>
    )
}