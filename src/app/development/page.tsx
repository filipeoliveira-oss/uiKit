'use client'
import { useState } from 'react';
import Calendar from '@/uiKit/calendar/calendar';

export default function Component() {
    const [t, st] = useState('')
    const today = new Date();
    const minDate = new Date()
    const maxDate = new Date()


    minDate.setDate(today.getDate() - 1)
    maxDate.setDate(today.getDate() + 4)

    return (
        <div className="w-full h-full flex flex-col gap-8">
            <input type='date' value={t} onChange={(e) => st(e.target.value)}/>

            <button onClick={() => alert(t)}>alert</button>

            <Calendar label='label test' labelClassname='text-white' date={t} setDate={st} showTime timeFormat='24' language='pt-BR' showButtonBar showIcon format='dd-mm-yy' />
        </div>
    )
}