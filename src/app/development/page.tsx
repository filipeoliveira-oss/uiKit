'use client'
import { useState } from 'react';
import Calendar from '@/uiKit/calendar/calendar';

export default function Component() {
    const [t, st] = useState('')

    return (
        <div className="w-full h-full flex flex-col gap-8">
            <input type='date' value={t} onChange={(e) => st(e.target.value)}/>

            <button onClick={() => alert(t)}>alert</button>

            <Calendar label='label test' labelClassname='text-white' date={t} setDate={st} showTime timeFormat='12' showButtonBar showIcon />
        </div>
    )
}