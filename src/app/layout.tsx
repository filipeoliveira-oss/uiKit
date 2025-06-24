import Header from "@/components/header";
import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<title>FOUIKIT</title>
			<meta charSet="UTF-8"/>
			<meta httpEquiv="X-UA-Compatible" content="IE-edge"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			<meta name="description" content="Accelerate development with ready-to-use React UI code snippets"/>
			<meta name="author" content="Filipe Oliveira"/>
			<meta property="og:title" content="FOUIKIT" />
			<meta property="og:description" content="ccelerate development with ready-to-use React UI code snippets" />
			<meta property="og:image" content="IMAGE" />
			<body className={`min-h-dvh w-dvw antialiased bg-lpbackground flex flex-col overflow-x-hidden text-white items-center`}>
				<Header/>
				{children}
			</body>
		</html>
	);
}
