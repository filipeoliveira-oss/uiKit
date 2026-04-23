'use client'

import Sidebar from "@/components/sidebar";
import { Suspense } from "react";

export default function UiKitLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row w-full" style={{height:'calc(100dvh - 64px)'}}>
            <Suspense>
                <div className="hidden md:block">
                    <Sidebar />
                </div>
                <div className="w-full h-full  overflow-x-hidden overflow-y-auto">
                    {children}
                </div>
            </Suspense>
        </div>
    );
}
