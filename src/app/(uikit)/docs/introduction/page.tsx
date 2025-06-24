import ColorText from "@/components/colorText";
import PageWrapper from "@/components/pageWrapper";
import Link from "next/link";

export default function Introduction() {
    return (
        <PageWrapper showRequirements={false} requirements={[]} title="Introduction">
            <ColorText text="Introduction"/>
            <span>Welcome to the FOUIKIT documentation!</span>

            <div className="w-full flex flex-col gap-2">
                <h2 className="text-2xl font-semibold">What is FOUIKIT?</h2>
                <span className="text-pretty">
                    FOUIKIT is a collection of UI components and hooks for React that helps you build beautiful and interactive interfaces.
                    It is built on top of&nbsp;
                    <Link className="font-semibold underline" href="https://tailwindcss.com/" target="_blank">Tailwind CSS</Link> and&nbsp;
                    <Link className="font-semibold underline" href="https://motion.dev/" target="_blank">Framer Motion</Link>
                </span>
            </div>

            <div className="w-full h-[1px] bg-zinc-100 shrink-0"></div>

            <div className="w-full flex flex-col gap-2">
                <h2 className="text-3xl font-semibold">FAQ</h2>

                <h3 className="text-2xl font-semibold">How does FOUIKIT work?</h3>
                <span className="text-pretty">
                    FOUIKIT is a collection of components. Instead of installing prebuilt components, it generates and inserts the component code directly into your codebase.
                </span>
                <span className="text-pretty">
                    Each component is a boilerplate version of commonly used elements. These components often rely on external libraries, which are installed automatically when you choose a component.
                </span>

                <h3 className="text-2xl font-semibold mt-6">Does FOUIKIT use runtime CSS?</h3>
                <span className="text-pretty">
                    No. Since FOUIKIT uses Tailwind CSS as its styling engine, all CSS is generated at build time, eliminating the need for runtime CSS. This makes FOUIKIT fully compatible with the latest versions of React and Next.js.
                </span>

                <h3 className="text-2xl font-semibold mt-6">Does FOUIKIT support TypeScript?</h3>
                <span className="text-pretty">
                    Yes, FOUIKIT is written in TypeScript and offers full TypeScript support.
                </span>

                {/* <h3 className="text-2xl font-semibold mt-6">Why does FOUIKIT use Framer Motion and GSAP?</h3>
                <span className="text-pretty">
                    We use Framer Motion to animate components with complex, physics-based behavior. It provides a clean, performant, and well-tested solution that's ready for production.
                </span>
                <span className="text-pretty">
                    On the other hand, GSAP excels at timeline-based animations, giving us greater flexibility for non-physics-based transitions and sequences.
                </span> */}
            </div>
        </PageWrapper>
    );
}
