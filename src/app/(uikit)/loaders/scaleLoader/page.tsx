import PageComponent from "@/components/componentsPage";
import { ScaleLoader } from "@/uiKit/loaders/scaleLoader/scaleLoader";

export default function BeatLoaderPage(){

const code = 
`import React from 'react';

interface props {
    color?: string;
    size?:string;
}
export const ScaleLoader = ({ color = '#8e51ff',size='4rem' }: props) => {
    return (
        <>
        <style>
                {\`
                    @keyframes scaleLoader {
                        0% {
                            scale:0;
                            opacity:0;
                        }
                        100% {
                            scale:1
                            opacity:1;
                        }
                    }

                \`}
            </style>
            <div className={\`items-center justify-center flex flex-row gap-2 w-full\`} style={{height:size}}>
                <div className=' rounded-lg' style={{ backgroundColor: color, width: \`calc(\${size} * 0.1)\`, height: size, animation: 'scaleLoader 1s  ease-in-out infinite alternate' }}></div>
                <div className=' rounded-lg' style={{ backgroundColor: color, width: \`calc(\${size} * 0.1)\`, height: size, animation: 'scaleLoader 1s .2s ease-in-out infinite alternate' }}></div>
                <div className=' rounded-lg' style={{ backgroundColor: color, width: \`calc(\${size} * 0.1)\`, height: size, animation: 'scaleLoader 1s .4s ease-in-out infinite alternate' }}></div>
                <div className=' rounded-lg' style={{ backgroundColor: color, width: \`calc(\${size} * 0.1)\`, height: size, animation: 'scaleLoader 1s .6s ease-in-out infinite alternate' }}></div>
                <div className=' rounded-lg' style={{ backgroundColor: color, width: \`calc(\${size} * 0.1)\`, height: size, animation: 'scaleLoader 1s  .8s ease-in-out infinite alternate' }}></div>
                <div className=' rounded-lg' style={{ backgroundColor: color, width: \`calc(\${size} * 0.1)\`, height: size, animation: 'scaleLoader 1s  1s ease-in-out infinite alternate' }}></div>
            </div>
        </>
    )
}
`

    return(
        <PageComponent
            ComponentType="Loaders"
            componentCodeName="ScaleLoader"
            componentName="Scale Loader"
            description="Componente de load em escala"
            code={code}
            props={[
                {propName:'Color', type:'COLOR', default:'#8e51ff', description:'Cor do loader', required:false},
                {propName:'Size', type:'string', default:'4rem', description:'Tamanho do loader', required:false},
            ]}
            preview={<ScaleLoader/>}
        />
    )
}