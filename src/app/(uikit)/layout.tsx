'use client'

import Sidebar from "@/components/sidebar";
import { Suspense } from "react";

export default function UiKitLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full flex flex-row " style={{height:'calc(100dvh - 64px)'}}>
            <Suspense>
                <Sidebar />
                <div className="w-full h-full  overflow-x-hidden overflow-y-auto">
                    {children}
                </div>
            </Suspense>
        </div>
    );
}
