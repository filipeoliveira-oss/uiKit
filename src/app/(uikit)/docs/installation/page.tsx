'use client'
import CodeBlock from "@/components/codeBlock";
import ColorText from "@/components/colorText";
import PageWrapper from "@/components/pageWrapper";

export default function Installation() {
   
    return (
        <PageWrapper requirements={[{name:'React 18+', url:'https://react.dev/'}, {name:'Tailwind CSS V4', url:'https://tailwindcss.com/'}]} title="Installation">
            <ColorText text="Installation"/>

            <div className="w-full flex flex-col gap-4">
                <h2 className="text-3xl font-semibold">Automatic Installation</h2>

                <span>Execute the following command to choose which component/hook you want!</span>

                <CodeBlock code="npx fouikit" language="js"/>
            </div>
        </PageWrapper>
    )
}