import PageComponent from "@/components/componentsPage";
import { GridLoader } from "@/uiKit/loaders/gridLoader/gridLoader";

export default function BeatLoaderPage(){

const code = 
`import React from 'react';

interface props {
    color?: string;
    size?: string;
    mode?: 'center' | 'diagonal' | 'random'
}

export const GridLoader = ({ color = '#8e51ff', size = '1rem', mode = 'diagonal' }: props) => {
    const random = (Math.random() * 0.5).toFixed(2) + 's';

    const delays = {
        center: [
            '0.4s', '0.3s', '0.4s',
            '0.3s', '0s', '0.3s',
            '0.4s', '0.3s', '0.4s',
        ],
        diagonal: [
            '0s', '0.1s', '0.2s',
            '0.1s', '0.2s', '0.3s',
            '0.2s', '0.3s', '0.4s',
        ], 
        random: [
            random, random, random,
            random, random, random,
            random, random, random
        ]
    }
    return (
        <>
            <style>
                {\`
                    @keyframes gridLoader {
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
            <div className={\`items-center justify-center flex flex-col gap-2 w-fit h-fit\`}>
                <div className='w-full h-fit flex flex-row gap-1'>
                    <div className='w-4 h-4 rounded-full' style={{ backgroundColor: color, width: size, height: size, animation: \`gridLoader .5s \${delays[mode][0]} infinite ease-in-out alternate\` }}></div>
                    <div className='w-4 h-4 rounded-full' style={{ backgroundColor: color, width: size, height: size, animation: \`gridLoader .5s \${delays[mode][1]} infinite ease-in-out alternate\` }}></div>
                    <div className='w-4 h-4 rounded-full' style={{ backgroundColor: color, width: size, height: size, animation: \`gridLoader .5s \${delays[mode][2]} infinite ease-in-out alternate\` }}></div>
                </div>
                <div className='w-full h-fit flex flex-row gap-1'>
                    <div className='w-4 h-4 rounded-full' style={{ backgroundColor: color, width: size, height: size, animation: \`gridLoader .5s \${delays[mode][3]} infinite ease-in-out alternate\` }}></div>
                    <div className='w-4 h-4 rounded-full' style={{ backgroundColor: color, width: size, height: size, animation: \`gridLoader .5s \${delays[mode][4]} infinite ease-in-out alternate\` }}></div>
                    <div className='w-4 h-4 rounded-full' style={{ backgroundColor: color, width: size, height: size, animation: \`gridLoader .5s \${delays[mode][5]} infinite ease-in-out alternate\` }}></div>
                </div>
                <div className='w-full h-fit flex flex-row gap-1'>
                    <div className='w-4 h-4 rounded-full' style={{ backgroundColor: color, width: size, height: size, animation: \`gridLoader .5s \${delays[mode][6]} infinite ease-in-out alternate\` }}></div>
                    <div className='w-4 h-4 rounded-full' style={{ backgroundColor: color, width: size, height: size, animation: \`gridLoader .5s \${delays[mode][7]} infinite ease-in-out alternate\` }}></div>
                    <div className='w-4 h-4 rounded-full' style={{ backgroundColor: color, width: size, height: size, animation: \`gridLoader .5s \${delays[mode][8]} infinite ease-in-out alternate\` }}></div>
                </div>
            </div>
        </>
    )
}
`

    return(
        <PageComponent
            ComponentType="Loaders"
            componentCodeName="GridLoader"
            componentName="Grid Loader"
            description="Componente de load em grid"
            code={code}
            props={[
                {propName:'Color', type:'COLOR', default:'#8e51ff', description:'Cor do loader', required:false},
                {propName:'Size', type:'string', default:'4rem', description:'Tamanho do loader', required:false},
                {propName:'Mode', type:`center | diagonal | random`, default:'diagonal', description:'Direção do loader', required:false},
            ]}
            preview={<GridLoader/>}
        />
    )
}