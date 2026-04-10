'use client'

import Sidebar from "@/components/sidebar";
import { div } from "framer-motion/client";

export default function UiKitLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // <div className="w-full mt-20 flex"  >
        //     <div className="w-full h-full overflow-x-hidden overflow-y-auto flex flex-row py-4">
        //         <Sidebar />
        //         {children}
        //     </div>
        // </div>

        <div className="w-full flex flex-row " style={{height:'calc(100dvh - 64px)'}}>
            <Sidebar />
            <div className="w-full h-full  overflow-x-hidden overflow-y-auto">
                {children}
            </div>
        </div>
    );
}
