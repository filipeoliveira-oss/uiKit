import CodeBlock from "@/components/codeBlock";
import PageWrapper from "@/components/pageWrapper";
import { Button as UiButton } from "@/uiKit/button/button";
export default function Button() {
    const a = `
    npx fouikit
    components
    Button`

    const deps = [
        { name: "tailwind-variants", url: "https://www.npmjs.com/package/tailwind-variants" },
        { name: "tailwindcss", url: "https://www.npmjs.com/package/tailwindcss" },
        { name: "clsx", url: "https://www.npmjs.com/package/clsx" },
        { name: "react", url: "https://www.npmjs.com/package/react" },
        { name: "react-dom", url: "https://www.npmjs.com/package/react-dom" }
    ]


    return (
        <PageWrapper requirements={deps} title="Button">
            <h1 className="text-4xl font-bold">Button</h1>
            <span>A default button for the project</span>

            <CodeBlock code={a} />

            <h2 className="text-3xl font-bold">Usage</h2>

            <UiButton>
                This is a default button
            </UiButton>

            <h2 className="text-3xl font-bold">Parameters</h2>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Children*</span>
                <CodeBlock code="React.ReactNode" showLineNumbers={false} />
                <span>The text inside the button</span>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Classname</span>
                <CodeBlock code="className='bg-green-400'" showLineNumbers={false} />
                <span>Classname will overwrite any configuration but active</span>

                <div className="w-1/2 h-fit flex flex-row gap-2">
                    <UiButton active="enabled" className="bg-green-400">
                        Green
                    </UiButton>
                </div>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Variant</span>
                <CodeBlock code="primary | secondary" showLineNumbers={false} />
                <span>The variant of the button. Primary by default</span>

                <div className="w-1/2 h-fit flex flex-row gap-2">
                    <UiButton>
                        Primary
                    </UiButton>

                    <UiButton variant="secondary">
                        secondary
                    </UiButton>
                </div>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Size</span>
                <CodeBlock code="default | sm" showLineNumbers={false} />
                <span>The size of the button.</span>

                <div className="w-1/2 h-fit flex flex-row gap-2">
                    <UiButton size="default">
                        default
                    </UiButton>

                    <UiButton size="sm" >
                        sm
                    </UiButton>
                </div>
            </div>

            <div className="w-full h-fit flex flex-col gap-2">
                <span className="text-lg font-semibold">Active</span>
                <CodeBlock code="disabled | enabled" showLineNumbers={false} />
                <span>Controls if the button is enabled.</span>

                <div className="w-1/2 h-fit flex flex-row gap-2">
                    <UiButton active="enabled">
                        Enabled
                    </UiButton>

                    <UiButton active="disabled" >
                        Disabled
                    </UiButton>
                </div>
            </div>
        </PageWrapper>
    )
}