'use client'
import Categories from "@/components/categories";
import CliSection from "@/components/cliSection";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Showcase from "@/components/showcase";
import useDocumentTitle from "@/uiKit/hooks/useDocumentTitle/useDocumentTitle";

export default function Home() {

	useDocumentTitle(`FOUIKIT`);
	
	return (
		<div className="w-dvw min-h-dvh" >
			<Hero/>
			<Features/>
			<Categories/>
			<Showcase/>
			<CliSection/>
			<Footer/>
		</div>
	);
}