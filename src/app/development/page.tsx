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


interface teste {
    name: string,
    price: string
}
export default function Component() {
    const items = Array.from({ length: 50 }, (_, i) => ({
        name: `Item ${i + 1}`,
        price: Math.floor(Math.random() * 100) + 1, // random price from 1 to 100
    }));
    const [a, sa] = useState<Array<any>>(items)


    const item = (item: teste) => {
        return (
            <div className='w-[60vw] h-fit flex flex-row justify-between items-center py-4 px-2'>
                <span>{item.name}</span>
                <span>R${item.price}</span>
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col gap-8">
            <OrderList value={a} itemTemplate={item} changeValue={(e) => sa(e)} header='Items disponíveis'/>
        </div>
    )
}