import PageComponent from "@/components/componentsPage";
import { BarLoader } from "@/uiKit/loaders/barLoader/barLoader";

export default function BarLoaderPage(){

const code = 
`import React from 'react';

interface props {
    color?: string;
    size?: string;
}

export const BarLoader = ({ color = '#8e51ff', size = '90%'}: props) => {
    return (
        <>
            <style>
                {\`
                    @keyframes barLoader {
  0% {
    left: 0%;
    width: 0%;
  }
  50% {
    left: 0%;
    width: 100%;
  }
  100% {
    left: 100%;
    width: 0%;
  }
}
                \`}
            </style>
            <div className={\`w-full h-full relative\`} style={{ width:size, height:'.5rem' }}>
                <div className='w-full h-full absolute top-0 left-0 z-10 opacity-20' style={{backgroundColor:color}}></div>
                <div className='w-0 h-full absolute top-0 right-0 bottom-0 z-20' style={{
                    animation: 'barLoader 2s infinite ease-in-out',
                    width:'0%',
                    backgroundColor:color
                }}></div>
            </div>
        </>
    )
}
`

    return(
        <PageComponent
            ComponentType="Loaders"
            componentCodeName="BarLoader"
            componentName="Bar Loader"
            description="Componente de load em barra"
            code={code}
            props={[
                {propName:'Color', type:'COLOR', default:'#8e51ff', description:'Cor do loader', required:false},
                {propName:'Size', type:'string', default:'90%', description:'Tamanho do loader', required:false},
            ]}
            preview={<BarLoader/>}
        />
    )
}