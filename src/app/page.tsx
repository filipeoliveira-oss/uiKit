import Components from "@/components/home/components";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";
import WhereUse from "@/components/home/whereUse";

export default function Home() {
	return (
		<div className="w-dvw min-h-dvh bg-lpbackground" >
			<Hero/>
			<Components/>
			<WhereUse/>
			<Footer/>
		</div>
	);
}