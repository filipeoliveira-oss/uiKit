import PageComponent from "@/components/componentsPage";
import { PuffLoader } from "@/uiKit/loaders/puffLoader/puffLoader";

export default function BeatLoaderPage(){

const code = 
`import React from 'react';

interface props {
    color?: string;
    size?:string;
}
export const PuffLoader = ({ color = '#8e51ff',size='4rem' }: props) => {
    return (
        <>
        <style>
                {\`
                    @keyframes puffLoader {
                        0% {
                            scale:0;
                            opacity:0;
                        }
                        50% {
                            scale:1
                            opacity:1;
                        }
                    }

                \`}
            </style>
            <svg style={{width:size, height:size, color,animation: 'puffLoader 2s ease-in-out infinite'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" ></circle>
            </svg>
        </>
    )
}
`

    return(
        <PageComponent
            ComponentType="Loaders"
            componentCodeName="PuffLoader"
            componentName="Puff Loader"
            description="Componente de load em puff"
            code={code}
            props={[
                {propName:'Color', type:'COLOR', default:'#8e51ff', description:'Cor do loader', required:false},
                {propName:'Size', type:'string', default:'4rem', description:'Tamanho do loader', required:false},
            ]}
            preview={<PuffLoader/>}
        />
    )
}