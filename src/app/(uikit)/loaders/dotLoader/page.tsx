import PageComponent from "@/components/componentsPage";
import { DotLoader } from "@/uiKit/loaders/dotLoader/dotLoader";

export default function BeatLoaderPage(){

const code = 
`import React from 'react';

interface props{
    color?:string;
    size?:string;
}

export const DotLoader = ({ color = '#8e51ff',size='1rem' }: props) => {
    return (
        <>
            <style>
                {\`
                    @keyframes dotLoader {
                        0% {
                            opacity:100%;
                            transform: scale(1);
                        }
                        100% {
                            opacity:50%;
                            transform: scale(.5);
                        }
                    }
                \`}
            </style>
            <div className={\`items-center justify-center flex flex-row gap-2 w-full h-fit animate-spin duration-1000\`}>
               <div className='w-4 h-4 rounded-full' style={{backgroundColor:color, width:size, height:size,  animation: 'dotLoader 1s infinite ease-in-out alternate'}}></div>
               <div className='w-4 h-4 rounded-full' style={{backgroundColor:color, width:size, height:size,  animation: 'dotLoader 1s 1s infinite ease-in-out alternate'}}></div>
            </div>
        </>
    )
}
`

    return(
        <PageComponent
            ComponentType="Loaders"
            componentCodeName="DotLoader"
            componentName="Dot Loader"
            description="Componente de load em pontos"
            code={code}
            props={[
                {propName:'Color', type:'COLOR', default:'#8e51ff', description:'Cor do loader', required:false},
                {propName:'Size', type:'string', default:'1rem', description:'Tamanho do loader', required:false},
            ]}
            preview={<DotLoader/>}
        />
    )
}