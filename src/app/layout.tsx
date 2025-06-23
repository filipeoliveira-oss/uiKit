import "./globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`h-dvh w-dvw antialiased bg-background relative flex justify-center flex-col items-center  overflow-hidden `}>
				{children}
			</body>
		</html>
	);
}
