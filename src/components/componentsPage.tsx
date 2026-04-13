'use client'
import { Check, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useTheme } from "next-themes";
import useDocumentTitle from "@/uiKit/hooks/useDocumentTitle/useDocumentTitle";
import { componentsList, hooksList, loadersList, utilitiesList } from "@/lib/uiKitElements";

type UtilityTitle = typeof utilitiesList[number]['title'];
type ComponentTitle = typeof componentsList[number]['title'];
type LoaderTitle = typeof loadersList[number]['title'];
type HookTitle = typeof hooksList[number]['title'];

interface IProps {
    propName: string,
    type: string,
    default: string,
    description: string,
    required?: boolean
}

interface IPageComponent {
    ComponentType: 'Componentes' | 'Loaders' | 'Hooks' | 'Utilitários',
    componentName: UtilityTitle | ComponentTitle | LoaderTitle | HookTitle,
    componentCodeName: string,
    description: string,
    preview?: React.ReactNode,
    code: string,
    props: Array<IProps>,
    previewCode?: string,
}

export default function PageComponent({ ComponentType, componentName, description, code, preview, props, componentCodeName, previewCode }: IPageComponent) {
    const [selectedTab, setSelectedTab] = useState(0)
    const { theme } = useTheme()
    useDocumentTitle(`FOUIKIT | ${ComponentType} | ${componentName}`)

    return (
        <div className="w-full h-full flex flex-col gap-4 p-8 overflow-y-auto overflow-x-hidden">
            <span className="hidden" style={{ fontSize: '0.1px' }}>{theme}</span>
            <div className="w-fit h-fit flex flex-row gap-1 items-center">
                <span className="text-sm text-muted-foreground">{ComponentType}</span>
                <ChevronRight className="text-sm text-muted-foreground" size={14} />
                <span className="text-sm text-accent">{componentName}</span>
            </div>

            <div className="w-fit h-fit flex flex-col gap-4">
                <h2 className="text-2xl">{componentName}</h2>
                <span>{description}</span>
            </div>

            <div className="w-full h-fit flex flex-row gap-2 ml-4 mt-2 relative border-b border-border/40" >
                <span className=" w-32 flex justify-center cursor-pointer font-semibold pb-2" onClick={() => setSelectedTab(0)}>Preview</span>
                <span className=" w-32 flex justify-center cursor-pointer font-semibold pb-2" onClick={() => setSelectedTab(1)}>Código</span>
                <span className=" w-32 flex justify-center cursor-pointer font-semibold pb-2" onClick={() => setSelectedTab(2)}>Propriedades</span>
                <div className="w-32 h-[1px] absolute bottom-0 transition-all duration-300" style={{ left: `${selectedTab * 136}px`, backgroundColor: 'oklch(0.55 0.2 255)' }}></div>
            </div >

            {selectedTab === 0 && (
                <div className="w-full h-fit flex items-center justify-center py-8 bg-muted/70 rounded-lg border ">
                    {previewCode ? (
                        <SyntaxHighlighter
                            language="typescript"
                            style={theme === 'dark' ? oneDark : oneLight}
                            customStyle={{
                                width: 'fit-content',
                                margin: '0',
                                borderRadius: 8,
                                border: '1px solid color-mix(in oklab, var(--muted-foreground) 30%, transparent)',
                            }}
                        >
                            {previewCode}
                        </SyntaxHighlighter>
                    ) : preview}
                </div>

            )}

            {selectedTab === 1 && (
                <div className="w-full h-fit flex flex-col items-center justify-center rounded-2xl border border-border overflow-hidden">
                    <div className="w-full h-12 flex justify-between items-center bg-muted border-b border-border px-4">
                        <span className="text-muted-foreground">{componentCodeName}.tsx</span>
                        <button className="text-sm px-2 py-1 bg-primary/20 text-primary rounded-lg cursor-pointer" onClick={() => { navigator.clipboard.writeText(code); toast.success('Componente copiado com sucesso!') }}>Copiar</button>
                    </div>

                    <SyntaxHighlighter language="typescript" style={theme === 'dark' ? oneDark : oneLight} customStyle={{ width: '100%', margin: '0', borderRadius: 0, overflow:'auto' }} showLineNumbers wrapLongLines={false}>
                        {code}
                    </SyntaxHighlighter>
                </div>

            )}

            {selectedTab === 2 && (
                <div className="w-full h-fit flex items-center justify-center overflow-auto">
                    <table className="w-full ">
                        <thead className="font-sans!">
                            <tr className="border-b border-border font-semibold text-muted-foreground ">
                                <th className="px-4! pb-3.5 text-left">Prop</th>
                                <th className="px-4! pb-3.5 text-left">Tipo</th>
                                <th className="px-4! pb-3.5 text-left">Padrão</th>
                                <th className="px-4! pb-3.5 text-left">Descrição</th>
                                <th className="px-4! pb-3.5 text-left">Obrigatório</th>
                            </tr>
                        </thead>
                        <tbody className="font-mono!">
                            {props.map((prop, index) => (
                                <tr className="border-b border-border" key={index}>
                                    <td className="px-4! py-3.5">
                                        <span className="font-thin!">{prop.propName}</span>
                                    </td>
                                    <td className="px-4! py-3.5">
                                        <span className="font-light px-2 py-1 bg-primary/30 text-primary w-fit rounded-lg">{prop.type}</span>
                                    </td>
                                    <td className="px-4! py-3.5">
                                        <span className="font-light">{prop.default}</span>
                                    </td>
                                    <td className="px-4! py-3.5">
                                        <span className="font-light">{prop.description}</span>
                                    </td>
                                    <td className="px-4! py-3.5">
                                        <span className="font-light">{prop.required ? <Check color="green" /> : <X color="red" />}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    )
}