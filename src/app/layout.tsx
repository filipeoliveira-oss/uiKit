import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight:["300","400","600","700"]
});


export const metadata: Metadata = {
	title: "FOUIKIT",
	description: "FOUIKIT",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`h-dvh w-dvw antialiased bg-background relative flex justify-center flex-col items-center ${inter.className} overflow-hidden `}>
				<div className="w-[50vh] h-1/2 bg-gradient-to-tr from-[#aa4b6b] via-bg-[#6b6b83] to-[#3b8d99] absolute top-[10%] right-8 rounded-full blur-[120px] opacity-40"></div>
				<div className="w-[50vh] h-1/2 bg-gradient-to-tr from-[#a8ff78] to-[#78ffd6] absolute bottom-[10%] left-8 rounded-full blur-[120px] opacity-30"></div>
				<Header/>

				<div className="w-[80%] h-[92%] backdrop-blur-lg text-white border border-sky-500 flex flex-row ">
					<Sidebar/>
					<div className="w-full h-full px-8 border border-zinc-100 prose text-white!">
						{children}
					</div>
				</div>
			</body>
		</html>
	);
}
