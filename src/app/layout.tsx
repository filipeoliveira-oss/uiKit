import Header from "@/components/header";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`min-h-dvh w-dvw antialiased bg-lpbackground flex flex-col overflow-x-hidden text-white items-center`}>
				<Header/>
				{children}
			</body>
		</html>
	);
}
