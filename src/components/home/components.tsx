'use client'
import ActionMenu from "@/app/(uikit)/components/actionMenu/page"
import ActionsMenu from "@/uiKit/actionsMenu/actionsMenu"
import Calendar from "@/uiKit/calendar/calendar"
import { Dropdown } from "@/uiKit/dropdown/dropdown"
import { GridLoader } from "@/uiKit/gridLoader/gridLoader"
import { X } from "lucide-react"
import { useState } from "react"

export default function Components() {
    const [calendar, setCalendar] = useState('')
    const [dropdown, setDropdow] = useState('')


    function Element({ children, width, title }: { children: React.ReactNode, width?: string, title: string }) {
        return (
            <div className="h-[50vh] items-center justify-center flex shrink-0 px-4 flex-col bg-background/50 rounded-4xl" style={{ minWidth: 'fit-content', width: width ?? '400px' }}>
                <span className="w-full block font-bold">{title}</span>
                <div className="h-[80%] w-full flex items-center justify-center">
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-dvh bg-black/10 flex items-center justify-center flex-col gap-8">
            <div className="w-fit h-fit flex flex-col gap-2 text-center">
                <h2 className="text-3xl font-bold">Rich components</h2>
                <span>Practical components to meet your needs — flexible, scalable, and built to help you ship faster</span>
            </div>

            <div className="w-[110vw] h-fit flex flex-row shrink-0 gap-4">
                <Element title="Modal">
                    <div className="w-full h-[40%] bg-white rounded-3xl relative flex justify-center text-black flex-col gap-4  p-4 max-w-[400px]">
                        <X className="absolute top-4 right-4 cursor-pointer" />
                        <span className="font-bold">JavaScript Info</span>
                        <span className="block">JavaScript is a versatile, high-level programming language primarily used to create interactive effects within web browsers.</span>
                    </div>
                </Element>

                <Element title="Calendar">
                    <div className="w-full h-full translate-y-[20%]">
                        <Calendar date={calendar} setDate={(e) => setCalendar(e)} showIcon showButtonBar/>
                    </div>
                </Element>

                <Element title="Grid loader">
                    <GridLoader />
                </Element>

                <Element title="Dropdown" >
                    <Dropdown value={dropdown} onChangeValue={(e) => setDropdow(e)} content={['Option 1', 'Option 2', 'Option 3']} className="border border-zinc-200 text-white" placeholder="Select an option" />
                </Element>

                <Element title="Action menu" >
                    <ActionsMenu position="bottomLeft">
                        <div className="w-40 h-fit flex flex-col gap-2">
                            <span>Menu action 1</span>
                            <span>Menu action 2</span>
                            <span>Menu action 3</span>
                        </div>
                    </ActionsMenu>
                </Element>
            </div>
        </div>
    )
}