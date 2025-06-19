'use client'
import { useState } from 'react';
import Checkbox from '@/uiKit/checkBox/checkBox';
import { useForm } from 'react-hook-form';
import { Chips } from '@/uiKit/chips/chips';
import Calendar from '@/uiKit/calendar/calendar';

export default function Component() {

    return (
        <div className="w-full h-full flex flex-col gap-8">

            <button onClick={() => print()}>click</button>
        </div>
    )
}