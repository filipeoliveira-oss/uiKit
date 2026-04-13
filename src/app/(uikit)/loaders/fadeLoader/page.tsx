import PageComponent from "@/components/componentsPage";
import { FadeLoader } from "@/uiKit/loaders/fadeLoader/fadeLoader";

export default function BeatLoaderPage(){

const code = 
`import React from 'react';

interface props {
    color?: string;
    size?: string;
}
export const FadeLoader = ({ color = '#8e51ff', size = '4rem' }: props) => {
    return (
        <>
            <style>
                {\`
                    @keyframes fadeLoader {
                        0% {
                            opacity:100%;
                        }
                        100% {
                            opacity:50%;
                        }
                    }
                \`}
            </style>
            <svg style={{ width: size, height: size }} viewBox="0 0 64 64" fill="none">
                <g transform="translate(32,32)">
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (360 / 12) * i;
                        const opacity = i / 12;
                        return (
                            <rect
                                key={i}
                                x="-2"
                                y="-20"
                                width="4"
                                height="10"
                                rx="2"
                                fill={color}
                                opacity={opacity + 0.1}
                                transform={\`rotate(\${angle})\`}
                                style={{animation: \`fadeLoader .5s \${(i) * .1}s infinite ease-in-out alternate\` }}
                            />
                        );
                    })}
                </g>
            </svg>
        </>
    )
}
`

    return(
        <PageComponent
            ComponentType="Loaders"
            componentCodeName="FadeLoader"
            componentName="Fade Loader"
            description="Componente de load em fade"
            code={code}
            props={[
                {propName:'Color', type:'COLOR', default:'#8e51ff', description:'Cor do loader', required:false},
                {propName:'Size', type:'string', default:'4rem', description:'Tamanho do loader', required:false},
            ]}
            preview={<FadeLoader/>}
        />
    )
}