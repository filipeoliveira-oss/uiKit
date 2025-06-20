'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

    const pathname = usePathname()

    function SidebarElement({ url, title }: { url: string, title: string }) {
        return (
            <li className={`${pathname === url ? 'text-zinc-50' : 'text-zinc-400'} mt-1`}>
                <Link href={url} >{title}</Link>
            </li>
        )
    }

    return (
        <div className="w-[15%] h-full  overflow-y-auto overflow-x-hidden shrink-0 gap-2 flex flex-col">
            <div className="w-full h-fit flex flex-col gap-2 ">
                <span className="font-semibold">Getting Started</span>
                <div className="w-full ml-4">
                    <ul className="w-[80%] h-fit list-disc pl-4 ">
                        <SidebarElement url="/docs/introduction" title="Introduction" />
                        <SidebarElement url='/docs/installation' title="Installation" />
                        <SidebarElement url='/docs/extension' title="Extension" />
                    </ul>
                </div>
            </div>

            <div className="w-full h-fit flex flex-col gap-2 ">
                <span className="font-semibold">Hooks</span>
                <div className="w-full ml-4">
                    <ul className="w-[80%] h-fit list-disc pl-4 ">
                        <SidebarElement url="/hooks/useDocumentTitle" title="useDocumentTitle" />
                        <SidebarElement url="/hooks/useInputFocus" title="useInputFocus" />
                        <SidebarElement url='/hooks/useIsMobile' title="useIsMobile" />
                        <SidebarElement url='/hooks/useOnClickOutside' title="useOnClickOutside" />
                    </ul>
                </div>
            </div>

            <div className="w-full h-fit flex flex-col gap-2 ">
                <span className="font-semibold">Components</span>
                <div className="w-full ml-4">
                    <ul className="w-[80%] h-fit list-disc pl-4 ">
                        <SidebarElement url="/components/actionMenu" title="Action Menu" />
                        <SidebarElement url="/components/autoComplete" title="Auto complete" />
                        <SidebarElement url="/components/button" title="Button" />
                        <SidebarElement url="/components/calendar" title="Calendar - criar pagina" />
                        <SidebarElement url="/components/carousel" title="Carousel" />
                        <SidebarElement url="/components/checkbox" title="Checkbox" />
                        <SidebarElement url="/components/chips" title="Chips" />
                        <SidebarElement url="/components/currencyInput" title="Currency Input" />
                        <SidebarElement url="/components/customDropdownFilter" title="Custom Filter" />
                        <SidebarElement url="/components/dataTable" title="Data Table" />
                        <SidebarElement url="/components/drawer" title="Drawer" />
                        <SidebarElement url="/components/dropdown" title="Dropdown" />
                        <SidebarElement url="/components/inputOtp" title="Input Otp - criar pagina" />
                        <SidebarElement url="/components/inputSwitch" title="Input Switch - criar pagina" />
                        <SidebarElement url="/components/inputTextArea" title="Input Text Area - criar pagina" />
                        <SidebarElement url="/components/loaders" title="Loaders" />
                        <SidebarElement url="/components/maskInput" title="Mask Input" />
                        <SidebarElement url="/components/modal" title="Modal" />
                        <SidebarElement url="/components/pageLoader" title="Page Loader - rever component" />
                        <SidebarElement url="/components/tooltip" title="Tooltip" />
                    </ul>
                </div>
            </div>
        </div>
    )
}