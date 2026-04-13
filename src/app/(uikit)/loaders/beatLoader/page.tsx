import PageComponent from "@/components/componentsPage";
import { BeatLoader } from "@/uiKit/loaders/beatLoader/beatLoader";

export default function BeatLoaderPage(){

const code = 
`import React from 'react';

interface props{
    color?:string;
    size?:string;
}

export const BeatLoader = ({ color = '#8e51ff',size='1rem' }: props) => {
    return (
        <>
            <style>
                {\`
                    @keyframes beatLoaderTwo {
                        0% {
                            opacity:100%;
                            transform: scale(1);
                        }
                        100% {
                            opacity:50%;
                            transform: scale(.5);
                        }
                    }

                    @keyframes beatLoaderOne {
                        0% {
                            opacity:50%;
                            transform: scale(.5);
                        }
                        100% {
                            opacity:100%;
                            transform: scale(1);
                        }
                    }
                \`}
            </style>
            <div className={\`items-center justify-center flex flex-row gap-2 w-full h-fit\`}>
               <div className='w-4 h-4 rounded-full' style={{backgroundColor:color, width:size, height:size,  animation: 'beatLoaderTwo .5s infinite ease-in-out alternate'}}></div>
               <div className='w-4 h-4 rounded-full' style={{backgroundColor:color, width:size, height:size,  animation: 'beatLoaderOne .5s infinite ease-in-out alternate'}}></div>
               <div className='w-4 h-4 rounded-full' style={{backgroundColor:color, width:size, height:size,  animation: 'beatLoaderTwo .5s infinite ease-in-out alternate'}}></div>
            </div>
        </>
    )
}
`

    return(
        <PageComponent
            ComponentType="Loaders"
            componentCodeName="BeatLoader"
            componentName="Beat Loader"
            description="Componente de load em beat"
            code={code}
            props={[
                {propName:'Color', type:'COLOR', default:'#8e51ff', description:'Cor do loader', required:false},
                {propName:'Size', type:'string', default:'1rem', description:'Tamanho do loader', required:false},
            ]}
            preview={<BeatLoader/>}
        />
    )
}