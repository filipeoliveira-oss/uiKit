'use client'
import CodeBlock from "@/components/codeBlock";
import ColorText from "@/components/colorText";
import ComponentDisplay from "@/components/componentDisplay";
import PageWrapper from "@/components/pageWrapper";
import Calendar from "@/uiKit/components/calendar/calendar";
import Link from "next/link";
import { useState } from "react";

export default function CalendarPage() {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const a =
        `npx fouikit
components
Calendar`


    const deps = [
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
    ]


    return (
        <PageWrapper requirements={deps} title="Calendar">
            <ColorText text="Calendar" />
            <span>Calendar, also known as DatePicker, is a form component to work with dates</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <ComponentDisplay>
                <Calendar date={date} setDate={(e) => setDate(e)} label="Calendar" />
            </ComponentDisplay>

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">date*</span>
                <CodeBlock code="string" language="js" showLineNumbers={false} />
                <span>Date that will be displayed</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">setDate*</span>
                <CodeBlock code="(e: string) => void" language="js" showLineNumbers={false} />
                <span>Function to change the current date</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">disabled</span>
                <CodeBlock code="bool" language="js" showLineNumbers={false} />
                <span>When disabled is present, the element cannot be edited and focused</span>
                <ComponentDisplay>
                    <Calendar date={date} setDate={(e) => setDate(e)} label="Calendar" disabled />
                </ComponentDisplay>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">label</span>
                <CodeBlock code="string" language="js" showLineNumbers={false} />
                <span>Label that will be shown above the component</span>
                <ComponentDisplay>
                    <Calendar date={date} setDate={(e) => setDate(e)} label="This is the label" />
                </ComponentDisplay>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">labelClassname</span>
                <CodeBlock code="string" language="js" showLineNumbers={false} />
                <span>Class that will be applied to the label</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">language</span>
                <CodeBlock code="string" language="js" showLineNumbers={false} />
                <span>Any language included in BCP 47. Default pt-BR</span>
                <Link href={'https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry'} className="underline" target="_blank">Reference link</Link>

                <ComponentDisplay>
                    <Calendar date={date} setDate={(e) => setDate(e)} label="Language set to zh" language="zh" />
                </ComponentDisplay>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">showIcon</span>
                <CodeBlock code="bool" language="js" showLineNumbers={false} />
                <span>If showIcon is present, a calendar icon will be shown</span>
                <ComponentDisplay>
                    <Calendar date={date} setDate={(e) => setDate(e)} label="Calendar" showIcon />
                </ComponentDisplay>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">showButtonBar</span>
                <CodeBlock code="bool" language="js" showLineNumbers={false} />
                <span>When showButtonBar is present, today and clear buttons are displayed at the footer.</span>
                <ComponentDisplay>
                    <Calendar date={date} setDate={(e) => setDate(e)} label="Calendar" showButtonBar />
                </ComponentDisplay>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">showTime</span>
                <CodeBlock code="bool" language="js" showLineNumbers={false} />
                <span>A time picker is displayed when showTime is enabled</span>
                <ComponentDisplay>
                    <Calendar date={date} setDate={(e) => setDate(e)} label="Calendar" showTime />
                </ComponentDisplay>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">timeFormat</span>
                <CodeBlock code="'12' | '24'" language="js" showLineNumbers={false} />
                <span>Time format to be displayed</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">timeOnly</span>
                <CodeBlock code="bool" language="js" showLineNumbers={false} />
                <span>only time needs to be selected, add timeOnly to hide the date section</span>
                <ComponentDisplay>
                    <Calendar date={time} setDate={(e) => setTime(e)} label="Calendar" showTime timeOnly />
                </ComponentDisplay>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">customLanguage</span>
                <CodeBlock code={`interface ICustomLanguage {
    today: string,
    close: string,
    now: string,
    weekDays: [string, string, string, string, string, string, string]
    months: [string, string, string, string, string, string, string, string, string, string, string, string]
}`} language="ts" showLineNumbers={false} />
                <span>If a language is not available in the BCP 47 languages, a custom one can be provided using this object. Note that when using custom languages, all keys MUST be passed.</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">colors</span>
                <CodeBlock code={`interface IColors {
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
}`} language="js" showLineNumbers={false} />
                <span>It's possible to customize every color used on the calendar. Not every key is mandatory, you can pass only those to be changed.</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">dateTemplate</span>
                <CodeBlock code="(date: number) => React.ReactNode" language="js" showLineNumbers={false} />
                <CodeBlock code={`const dateTemplate = (date: Date) => {
        if (date.day > 10 && date.day < 15) {
            return (
                <strong style={{ textDecoration: 'line-through' }}>{date.day}</strong>
            );
        }

        return date.day;
    }`} language="js" showLineNumbers={false} />
                <span>Custom content can be placed inside date cells with the dateTemplate property that takes a number as a parameter.</span>

            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">inline</span>
                <CodeBlock code="bool" language="js" showLineNumbers={false} />
                <span>Calendar is displayed as a popup by default, add inline property to customize this behavior</span>
                <ComponentDisplay>
                    <Calendar date={time} setDate={(e) => setTime(e)} label="Calendar" inline />
                </ComponentDisplay>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">view</span>
                <CodeBlock code="'month' | 'year'" language="js" showLineNumbers={false} />
                <span>Month/Year only picker is enabled by specifying view as month/year in addition to a suitable dateFormat</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">format</span>
                <CodeBlock code="string" language="js" showLineNumbers={false} />
                <span>Default date format is dd/mm/yy which can be customized using the dateFormat property</span>
                <ul className="list-disc ml-8 flex flex-col gap-2">
                    <li>d - day of month (no leading zero)</li>
                    <li>dd - day of month (two digit)</li>
                    <li>o - day of the year (no leading zeros)</li>
                    <li>oo - day of the year (three digit)</li>
                    <li>D - day name short</li>
                    <li>DD - day name long</li>
                    <li>m - month of year (no leading zero)</li>
                    <li>mm - month of year (two digit)</li>
                    <li>M- month name short</li>
                    <li>MM - month name long</li>
                    <li>y - year (two digit)</li>
                    <li>yy - year (four digit)</li>
                    <li>@ - Unix timestamp (ms since 01/01/1970)</li>
                    <li>! - Windows ticks (100ns since 01/01/0001)</li>
                    <li>h - Hours (no leading zero)</li>
                    <li>hh - Hours (two digits)</li>
                    <li>n - Minutes (no leading zero)</li>
                    <li>nn - Minutes (two digits)</li>
                </ul>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">minDate</span>
                <CodeBlock code="Date" language="js" showLineNumbers={false} />
                <span>Boundaries for the permitted dates that can be entered</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">maxDate</span>
                <CodeBlock code="Date" language="js" showLineNumbers={false} />
                <span>Boundaries for the permitted dates that can be entered</span>
            </div>
        </PageWrapper>
    )
}