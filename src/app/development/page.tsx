'use client'
import { act, useState } from 'react';
import Checkbox from '@/uiKit/components/checkBox/checkBox';
import { useForm } from 'react-hook-form';
import { Chips } from '@/uiKit/components/chips/chips';
import Calendar from '@/uiKit/components/calendar/calendar';
import InputSwitch from '@/uiKit/components/inputSwitch/inputSwitch';
import InputOtp from '@/uiKit/components/inputOtp/inputOtp';
import InputTextArea from '@/uiKit/components/inputTextArea/inputTextArea';
import RadioGroup from '@/uiKit/components/radioGroup/radioGroup';
import Rating from '@/uiKit/components/rating/rating';
import DataView from '@/uiKit/components/dataView/dataView';
import OrderList from '@/uiKit/components/orderList/orderList';


interface teste {
    name: string,
    price: string
}
export default function Component() {
    const [a,b] = useState('')

    return (
        <div className="w-screen h-screen items-center justify-center flex flex-col gap-8">
            <InputOtp changeOtp={(e) => b(e)} value={a} tokenLength={6}/>
        </div>
    )
}