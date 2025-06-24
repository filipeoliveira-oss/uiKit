'use client'
import Sidebar from "@/components/sidebar";

export default function UiKitLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full mt-20 flex items-center justify-center" style={{ height: 'calc(100vh - 80px)',backgroundImage: 'url(/landingPage/pattern.webp)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} >
            <div className="w-defaultWidth h-full overflow-x-hidden overflow-y-auto flex flex-row py-4">
                <Sidebar />
                {children}
            </div>
        </div>
    );
}
