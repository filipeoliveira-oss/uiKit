'use client'
import React, { SetStateAction, useEffect, useRef, useState } from "react";

type FormatParts = {
    day: number
    month: number
    year: number
    hour?: number
    minute?: number
    timeFormat?: '12' | '24'
}

interface ICustomLanguage {
    today: string,
    close: string,
    now: string,
    weekDays: [string, string, string, string, string, string, string]
    months: [string, string, string, string, string, string, string, string, string, string, string, string]
}

interface IColors {
    containerBackgroundColor?: string,
    labelTextColor?: string,
    iconBackgroundColor?: string,
    iconColor?: string,
    calendarBackground?: string,
    textColor?: string,
    hoverBackground?: string,
    todayBackground?: string,
    selectedDayBackground?: string,
    weekDaysTextColor?: string
}

interface ICalendar {
    date: string,
    setDate: (e:string) => void
    disabled?: boolean
    label?: string,
    labelClassname?: string,
    language?: string,
    showIcon?: boolean,
    showButtonBar?: boolean,
    showTime?: boolean,
    timeFormat?: '12' | '24',
    customLanguage?: ICustomLanguage,
    colors?: IColors,
    // ------ ENHANCEMENTS
    timeOnly?: boolean,
    dateTemplate?: (date: number) => React.ReactNode,
    inline?: boolean,
    view?: 'month' | 'year',
    format?: string,
    minDate?: Date
    maxDate?: Date
}

interface calendarDates {
    date: number,
    currentMonth: boolean
}


export default function Calendar({ disabled, label, labelClassname, language = 'pt-BR', setDate, date, showIcon, showButtonBar, showTime, timeFormat = '24', customLanguage, colors, timeOnly = false, dateTemplate, inline = false, view, format = 'dd/mm/yy', maxDate, minDate }: ICalendar) {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [actualDate, setActualDate] = useState<null | Date>(null)
    const [day, setDay] = useState(today.getDate())
    const [showCalendar, setShowCalendar] = useState(false);
    const [hour, setHour] = useState(today.getHours())
    const [minutes, setMinutes] = useState(today.getMinutes())
    const [dayPeriod, setDayPeriod] = useState<'AM' | 'PM' | null>(timeFormat === "24" ? null : today.getHours() > 11 ? 'PM' : 'AM')
    const dates: Array<calendarDates> = getCalendarDates(currentYear, currentMonth);
    const [whatToShow, setWhatToShow] = useState<'days' | 'months' | 'years'>('days')
    const i18nLabels: Record<string, Record<'today' | 'now' | 'close', string>> = {
        'en': { today: 'Today', now: 'Now', close: 'Close' },
        'zh': { today: '今天', now: '现在', close: '关闭' }, // Chinese
        'hi': { today: 'आज', now: 'अब', close: 'बंद करें' }, // Hindi
        'es': { today: 'Hoy', now: 'Ahora', close: 'Cerrar' }, // Spanish
        'fr': { today: 'Aujourd’hui', now: 'Maintenant', close: 'Fermer' }, // French
        'ar': { today: 'اليوم', now: 'الآن', close: 'إغلاق' }, // Arabic
        'bn': { today: 'আজ', now: 'এখন', close: 'বন্ধ করুন' }, // Bengali
        'pt': { today: 'Hoje', now: 'Agora', close: 'Fechar' }, // Portuguese
        'ru': { today: 'Сегодня', now: 'Сейчас', close: 'Закрыть' }, // Russian
        'ur': { today: 'آج', now: 'ابھی', close: 'بند کریں' }, // Urdu
        'id': { today: 'Hari ini', now: 'Sekarang', close: 'Tutup' }, // Indonesian
        'de': { today: 'Heute', now: 'Jetzt', close: 'Schließen' }, // German
    };
    const wrapperRef = useRef<HTMLDivElement>(null);
    function getLabel(key: 'today' | 'now' | 'close'): string {
        const lang = language.slice(0, 2);
        return i18nLabels[lang]?.[key] || i18nLabels['en'][key];
    }

    const calendarColors: IColors = React.useMemo(() => {
        return {
            containerBackgroundColor: colors?.containerBackgroundColor ?? 'transparent',
            calendarBackground: colors?.calendarBackground ?? '#FFFFFF',
            hoverBackground: colors?.hoverBackground ?? '#e4e4e7',
            iconBackgroundColor: colors?.iconBackgroundColor ?? '#00bcff',
            iconColor: colors?.iconColor ?? '#FFFFFF',
            labelTextColor: colors?.labelTextColor ?? '#FFFFFF',
            selectedDayBackground: colors?.selectedDayBackground ?? '#00bcff',
            textColor: colors?.textColor ?? '#000000',
            todayBackground: colors?.todayBackground ?? '#e5e7eb',
            weekDaysTextColor: colors?.weekDaysTextColor ?? '#52525c',
        }
    }, [colors])

    useEffect(() => {
        if (timeFormat === "12") {
            setDayPeriod(today.getHours() > 12 ? 'PM' : 'AM')
        } else {
            setDayPeriod(null)
        }
    }, [timeFormat])


    useEffect(() => {
        if (inline) {
            setShowCalendar(true)
        }
    }, [inline])

    useEffect(() => {
        if (!view) return

        if (view === "month") {
            setWhatToShow('months')
        } else if (view === "year") {
            setWhatToShow("years")
        }
    }, [view])

    useEffect(() => {
        function handleClickOutside(event:any) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function isValidDate(day: number) {
        const checkDate = new Date(currentYear, currentMonth, day)

        const checkTime = checkDate.getTime();
        const minTime = minDate ? minDate.getTime() : -Infinity;
        const maxTime = maxDate ? maxDate.getTime() : Infinity;
        return checkTime > minTime && checkTime < maxTime;
    }

    function formatDate(day: number, month: number, year: number, hour?: number, minute?: number, period?: 'PM' | 'AM' | null) {

        if (timeOnly) {
            let str = `${showTime && `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`}${timeFormat === '12' ? ` ${period}` : ''}`
            setDate(str)
        } else {
            setActualDate(new Date(year, month, day))
            const parts: FormatParts = {
                day: day,
                month: month,
                year: year,
                hour: hour,
                minute: minute
            }
            const str = formatDateByParts(parts)
            setDate(str)
        }
    }

    function getCalendarDates(year: number, month: number) {
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        const firstDayIndex = firstDay.getDay(); // 0 = Sunday
        const lastDayIndex = lastDay.getDay();
        const daysInMonth = lastDay.getDate();

        const result: { date: number; currentMonth: boolean }[] = [];

        // --- Leading days from prev month (if the month doesn't start on Sunday)
        if (firstDayIndex > 0) {
            const prevMonthDays = new Date(year, month, 0).getDate();
            for (let i = firstDayIndex - 1; i >= 0; i--) {
                result.push({
                    date: prevMonthDays - i,
                    currentMonth: false,
                });
            }
        }

        // --- Current month days
        for (let i = 1; i <= daysInMonth; i++) {
            result.push({ date: i, currentMonth: true });
        }

        // --- Trailing days from next month (to complete the last week)
        if (lastDayIndex < 6) {
            for (let i = 1; i <= 6 - lastDayIndex; i++) {
                result.push({ date: i, currentMonth: false });
            }
        }

        return result;
    }

    const handlePrevMonth = () => {
        const newMonth = currentMonth - 1;
        if (newMonth < 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(newMonth);
        }
    };

    const handleNextMonth = () => {
        const newMonth = currentMonth + 1;
        if (newMonth > 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(newMonth);
        }
    };

    function incrementHour() {
        if (timeFormat === '24') {
            const nextHour = (hour + 1) % 24;
            setHour(nextHour);
            formatDate(day, currentMonth, currentYear, nextHour, minutes, dayPeriod)

        } else {
            const nextHour = (hour + 1) % 12 === 0 ? 12 : (hour + 1) % 12;
            if (hour === 11) {
                setDayPeriod(prev => prev === 'AM' ? 'PM' : 'AM');
            }
            formatDate(day, currentMonth, currentYear, nextHour, minutes, dayPeriod)

            setHour(nextHour);
        }
    }

    function decrementHour() {
        if (timeFormat === '24') {
            const prevHour = hour === 0 ? 23 : hour - 1;
            setHour(prevHour);
            formatDate(day, currentMonth, currentYear, prevHour, minutes, dayPeriod)

        } else {
            const prevHour = hour === 1 ? 12 : hour - 1;
            if (hour === 12) {
                setDayPeriod(prev => (prev === 'AM' ? 'PM' : 'AM'));
            }
            formatDate(day, currentMonth, currentYear, prevHour, minutes, dayPeriod)

            setHour(prevHour);
        }
    }

    function handleIncrementMinute() {
        const nextMinute = minutes === 59 ? 0 : minutes + 1
        setMinutes(nextMinute)
        formatDate(day, currentMonth, currentYear, hour, nextMinute, dayPeriod)

    }

    function handleDecrementMinute() {
        const prevMinute = minutes === 0 ? 59 : minutes - 1
        setMinutes(prevMinute)
        formatDate(day, currentMonth, currentYear, hour, prevMinute, dayPeriod)

    }

    function handleChageDayPeriodOnDate(period: 'AM' | "PM") {
        formatDate(day, currentMonth, currentYear, hour, minutes, period)
    }

    function handleSelectDay(day: number) {
        setDay(day)
        formatDate(day, currentMonth, currentYear, hour, minutes, dayPeriod)
    }

    function getDisplayHour(hour: number): number {
        if (timeFormat === '24') return hour;
        return hour % 12 === 0 ? 12 : hour % 12;
    }

    function formatDateByParts(parts: FormatParts): string {
        const {
            day,
            month,
            year,
            hour = 0,
            minute = 0,
        } = parts;

        const tempDate = new Date(year, month, day, hour, minute);

        const dayOfYear = Math.floor((+tempDate - +new Date(tempDate.getFullYear(), 0, 0)) / 86400000);
        const weekdayShort = new Intl.DateTimeFormat(language, { weekday: 'short' }).format(tempDate);
        const weekdayLong = new Intl.DateTimeFormat(language, { weekday: 'long' }).format(tempDate);
        const monthShort = new Intl.DateTimeFormat(language, { month: 'short' }).format(tempDate);
        const monthLong = new Intl.DateTimeFormat(language, { month: 'long' }).format(tempDate);
        const yearShort = year % 100;

        const hourFormatted = timeFormat === '12' ? (hour % 12 || 12) : hour;

        const unixTimestamp = tempDate.getTime();
        const windowsTicks = (unixTimestamp + 62135596800000) * 10000;

        const replacements: Record<string, string> = {
            'd': String(day),
            'dd': String(day).padStart(2, '0'),
            'o': String(dayOfYear),
            'oo': String(dayOfYear).padStart(3, '0'),
            'D': weekdayShort,
            'DD': weekdayLong,
            'm': String(month + 1), // because month is 0-based
            'mm': String(month + 1).padStart(2, '0'),
            'M': monthShort,
            'MM': monthLong,
            'y': String(yearShort).padStart(2, '0'),
            'yy': String(year),
            '@': String(unixTimestamp),
            '!': String(windowsTicks),
            'h': String(hourFormatted),
            'hh': String(hourFormatted).padStart(2, '0'),
            'n': String(minute),
            'nn': String(minute).padStart(2, '0'),
        };

        let result = format.replace(/dd?|oo?|D{1,2}|mm?|M{1,2}|y{1,2}|[@!]|hh?|h|nn?|n/g, match => {
            return replacements[match] ?? match;
        });

        if (timeFormat === '12') {
            result += ` ${dayPeriod}`;
        }

        return result;
    }

    return (

        <div ref={wrapperRef} className="w-full h-fit flex flex-col gap-4 relative select-none" style={{ pointerEvents: disabled ? 'none' : 'auto', backgroundColor: calendarColors.containerBackgroundColor }}>
            {label && <label className={labelClassname} style={{ color: calendarColors.labelTextColor }}>{label}</label>}
            {!inline && (
                <div className="border border-zinc-500 w-full h-10 flex flex-row items-center rounded-lg overflow-hidden" >
                    <input onFocus={() => setShowCalendar(true)}  className="px-2 w-full h-full bg-transparent border-none outline-none" value={date} readOnly />
                    {showIcon && (
                        <div className="w-fit h-full px-2 flex items-center" style={{ backgroundColor: calendarColors.iconBackgroundColor }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={calendarColors.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M8 2v4" />
                                <path d="M16 2v4" />
                                <rect width="18" height="18" x="3" y="4" rx="2" />
                                <path d="M3 10h18" />
                            </svg>
                        </div>
                    )}
                </div>
            )}

            {showCalendar && (
                <div className="w-full h-fit absolute top-full flex flex-col items-center justify-center" style={{ backgroundColor: calendarColors.calendarBackground }} >
                    {whatToShow === 'days' && (
                        <>
                            {!timeOnly && (
                                <>
                                    <div className="border-b border-zinc-200 w-full h-10 flex flex-row justify-between px-2 items-center" style={{ color: calendarColors.textColor }}>
                                        <svg onClick={handlePrevMonth} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m15 18-6-6 6-6" /></svg>
                                        <div className="flex flex-row gap-2 w-fit h-full items-center justify-center capitalize">

                                            {whatToShow === 'days' && (
                                                <span className={`hover:[color:var(--hover-color)] cursor-pointer`} onClick={() => setWhatToShow('months')} style={{ "--hover-color": calendarColors.hoverBackground } as React.CSSProperties}>{new Date(currentYear, currentMonth).toLocaleString(language, {
                                                    month: 'long',
                                                })}</span>
                                            )}
                                            <span className={`hover:[color:var(--hover-color)] cursor-pointer`} onClick={() => setWhatToShow('years')} style={{ "--hover-color": calendarColors.hoverBackground } as React.CSSProperties}>{new Date(currentYear, currentMonth).toLocaleString(language, {
                                                year: 'numeric',
                                            })}</span>
                                        </div>
                                        <svg onClick={handleNextMonth} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                    </div>

                                    <div className="w-full h-fit grid grid-cols-7 text-center font-medium mt-2">
                                        {customLanguage ? (
                                            customLanguage.weekDays.map((day, i) => (
                                                <div key={i} className="text-sm" style={{ color: calendarColors.weekDaysTextColor }}>{day}</div>
                                            ))
                                        ) : Array.from({ length: 7 }, (_, i) =>
                                            <div key={i} className="text-sm" style={{ color: calendarColors.weekDaysTextColor }}>{new Intl.DateTimeFormat(language, { weekday: 'short' }).format(new Date(2021, 7, 1 + i)).replace('.', '')}</div>
                                        )}
                                    </div>

                                    <div className="w-full grid grid-cols-7 auto-rows-fr gap-1 text-center mt-1">
                                        {dates.map((item, idx) => {
                                            const isToday =
                                                item.currentMonth &&
                                                currentMonth === today.getMonth() &&
                                                currentYear === today.getFullYear() &&
                                                item.date === today.getDate();

                                            const isSelected = actualDate?.getTime() === new Date(currentYear, currentMonth, item.date).getTime() && item.currentMonth
                                            return (
                                                <div
                                                    key={idx}
                                                    onClick={() => {handleSelectDay(item.date); setShowCalendar(false)}}
                                                    className={`p-2 text-sm rounded ${item.currentMonth && isValidDate(item.date) ? '' : 'pointer-events-none'} group cursor-pointer w-full h-full flex items-center justify-center`} >
                                                    <span
                                                        className=" w-6 h-6 rounded-full flex items-center justify-center group-hover:[background-color:var(--hover-color)]"
                                                        style={{ backgroundColor: isSelected ? calendarColors.selectedDayBackground : isToday ? calendarColors.todayBackground : '', ...{ ["--hover-color"]: calendarColors.hoverBackground, color: item.currentMonth && isValidDate(item.date) ? calendarColors.textColor : '#99a1af' } }}
                                                    >{dateTemplate ? dateTemplate(item.date) : item.date}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </>
                            )}

                            {showTime && (
                                <div className="w-full h-20 border-t border-zinc-200 flex flex-row gap-2 items-center justify-center" style={{ color: calendarColors.textColor }}>
                                    <div className="w-fit h-full flex flex-col gap:1 items-center justify-center">
                                        <svg onClick={() => incrementHour()} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                        <span className="select-none text-lg">{String(timeFormat === '12' && hour === 0 ? 12 : hour).padStart(2, '0')}</span>
                                        <svg onClick={() => decrementHour()} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                    <span className="select-none text-lg">:</span>
                                    <div className="w-fit h-full flex flex-col gap:1 items-center justify-center">
                                        <svg onClick={() => handleIncrementMinute()} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                        <span className="select-none text-lg">{String(minutes).padStart(2, '0')}</span>
                                        <svg onClick={() => handleDecrementMinute()} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </div>
                                    {timeFormat === '12' && (
                                        <>
                                            <span className="select-none text-lg">:</span>
                                            <div className="w-fit h-full flex flex-col gap:1 items-center justify-center">
                                                <svg onClick={() => { setDayPeriod(prev => prev === 'PM' ? 'AM' : 'PM'); handleChageDayPeriodOnDate(dayPeriod === 'AM' ? 'PM' : 'AM') }} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                                <span className="select-none text-lg">{dayPeriod}</span>
                                                <svg onClick={() => { setDayPeriod(prev => prev === 'PM' ? 'AM' : 'PM'); handleChageDayPeriodOnDate(dayPeriod === 'AM' ? 'PM' : 'AM') }} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {whatToShow === 'months' && (
                        <>
                            <div className="border-b border-zinc-200 w-full h-10 flex flex-row justify-between px-2 items-center" style={{ color: calendarColors.textColor }}>
                                <svg onClick={() => { setCurrentYear(prev => prev - 1); }} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m15 18-6-6 6-6" /></svg>
                                <div className="flex flex-row gap-2 w-fit h-full items-center justify-center capitalize">
                                    <span className={`hover:[color:var(--hover-color)] cursor-pointer`} onClick={() => setWhatToShow('years')} style={{ "--hover-color": calendarColors.hoverBackground } as React.CSSProperties}>{new Date(currentYear, currentMonth).toLocaleString(language, {
                                        year: 'numeric',
                                    })}</span>
                                </div>
                                <svg onClick={() => { setCurrentYear(prev => prev + 1) }} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </div>

                            <div className="w-full h-fit grid grid-cols-3 text-center mt-2" style={{ color: calendarColors.textColor }}>
                                {customLanguage ? (
                                    customLanguage.months.map((month, i) => (
                                        <div key={i} className={`py-2 cursor-pointer hover:[background-color:var(--hover-color)]`} onClick={() => { setCurrentMonth(i); if (!view) setWhatToShow('days'); if (view === 'month') {formatDate(0, i + 1, currentYear, hour, minutes);setShowCalendar(false)} }} style={{ "--hover-color": calendarColors.hoverBackground, backgroundColor: actualDate?.getMonth() === i ? calendarColors.selectedDayBackground : ''  } as React.CSSProperties}>
                                            {month}
                                        </div>
                                    ))
                                ) : Array.from({ length: 12 }, (_, i) => (
                                    <div key={i} className={`py-2 cursor-pointer hover:[background-color:var(--hover-color)]`} onClick={() => { setCurrentMonth(i); if (!view) setWhatToShow('days'); if (view === 'month') {formatDate(0, i + 1, currentYear, hour, minutes);setShowCalendar(false)} }} style={{ "--hover-color": calendarColors.hoverBackground, backgroundColor: actualDate?.getMonth() === i ? calendarColors.selectedDayBackground : '' } as React.CSSProperties}>
                                        {new Date(2000, i).toLocaleString(language, { month: 'long' })}
                                    </div>
                                ))}

                            </div>
                        </>
                    )}

                    {whatToShow === 'years' && (
                        <>
                            <div className="border-b border-zinc-200 w-full h-10 flex flex-row justify-between px-2 items-center" style={{ color: calendarColors.textColor }}>
                                <svg onClick={() => { setCurrentYear(prev => prev - 10); }} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m15 18-6-6 6-6" /></svg>
                                <div className="flex flex-row gap-2 w-fit h-full items-center justify-center capitalize">
                                    <span>{Math.floor(currentYear / 10) * 10} - {(Math.floor(currentYear / 10) * 10) + 9}</span>
                                </div>
                                <svg onClick={() => { setCurrentYear(prev => prev + 10) }} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </div>

                            <div className="w-full h-fit grid grid-cols-2 text-center mt-2" style={{ color: calendarColors.textColor }}>
                                {Array.from({ length: 10 }, (_, i) => Math.floor(currentYear / 10) * 10 + i).map((year) => (
                                    <div
                                        key={year}
                                        style={{ "--hover-color": calendarColors.hoverBackground, backgroundColor: actualDate?.getFullYear() === year ? calendarColors.selectedDayBackground : ''  } as React.CSSProperties}
                                        className={`py-2 cursor-pointer hover:[background-color:var(--hover-color)] rounded`}
                                        onClick={() => {
                                            setCurrentYear(year);
                                            if (view !== "year") setWhatToShow('months');
                                            if (view === "year") {formatDate(day, currentMonth, year);setShowCalendar(false)}
                                        }}
                                    >
                                        {year}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {showButtonBar && (
                        <div className="w-full h-10  flex items-center justify-between px-4 border-t border-zinc-200">
                            <div className="flex gap-2 w-full justify-between">
                                {!timeOnly && (
                                    <button
                                        type="button"
                                        style={{ color: calendarColors.textColor, "--hover-color": calendarColors.hoverBackground } as React.CSSProperties}
                                        className={`font-semibold py-1 px-1 rounded cursor-pointer hover:[background-color:var(--hover-color)]`}
                                        onClick={() => {
                                            setCurrentMonth(today.getMonth());
                                            setCurrentYear(today.getFullYear());
                                            formatDate(today.getDate(), today.getMonth(), today.getFullYear(), hour, minutes, dayPeriod);
                                        }}
                                    >{customLanguage?.today ?? getLabel("today")}</button>
                                )}
                                {timeOnly && (
                                    <button
                                        type="button"
                                        style={{ color: calendarColors.textColor, "--hover-color": calendarColors.hoverBackground } as React.CSSProperties}
                                        className={`font-semibold py-1 px-1 rounded cursor-pointer hover:[background-color:var(--hover-color)]`}
                                        onClick={() => {
                                            setHour(getDisplayHour(new Date().getHours()))
                                            setMinutes(new Date().getMinutes())
                                            setDayPeriod(new Date().getHours() > 11 ? 'PM' : 'AM')
                                            formatDate(today.getDate(), today.getMonth(), today.getFullYear(), getDisplayHour(new Date().getHours()), new Date().getMinutes(), new Date().getHours() > 11 ? 'PM' : 'AM');
                                        }}
                                    >{customLanguage?.now ?? getLabel('now')}</button>
                                )}
                                <button
                                    type="button"
                                    style={{ color: calendarColors.textColor, "--hover-color": calendarColors.hoverBackground } as React.CSSProperties}
                                    className={`font-semibold py-1 px-1 rounded cursor-pointer hover:[background-color:var(--hover-color)]`}
                                    onClick={() => setShowCalendar(false)}
                                >{customLanguage?.close ?? getLabel("close")}</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}