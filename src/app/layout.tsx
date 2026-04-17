
import Header from "@/components/header";
import "./globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import ContainerTost from "@/components/CointanerToast";
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ptBR">
			<title>FOUIKIT</title>
			<meta charSet="UTF-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE-edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="author" content="Filipe Oliveira" />
			<meta name="description" content="Accelerate your workflow with polished React components, copy the code, tweak it your way, or install everything in seconds with CLI."/>
			<meta property="og:url" content="https://fouikit.vercel.app/"/>
			<meta property="og:type" content="website"/>
			<meta property="og:title" content="FOUIKIT"/>
			<meta property="og:description" content="Accelerate your workflow with polished React components, copy the code, tweak it your way, or install everything in seconds with CLI."/>
			<meta property="og:image" content="/metatags.png"/>
			<meta name="twitter:card" content="/metatags.png"/>
			<meta property="twitter:domain" content="https://fouikit.vercel.app/"/>
			<meta property="twitter:url" content="https://fouikit.vercel.app/"/>
			<meta name="twitter:title" content="FOUIKIT"/>
			<meta name="twitter:description" content="Accelerate your workflow with polished React components, copy the code, tweak it your way, or install everything in seconds with CLI."/>
			<meta name="twitter:image" content="/metatags.png"/>
			<body className={`min-h-dvh w-dvw antialiased flex flex-col overflow-x-hidden items-center`}>
				<ThemeProvider
					attribute={'class'}
					defaultTheme="dark"
					themes={['light', 'dark']}
					disableTransitionOnChange
				>
					<ContainerTost />
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
