'use client'

import { useState } from "react"
import PageComponent from "@/components/componentsPage"
import InputSwitch from "@/uiKit/components/inputSwitch/inputSwitch"

export default function InputSwitchPage() {

    const [checked, setChecked] = useState(false)

    const codePreview =
`const [checked, setChecked] = useState(false)

<InputSwitch
  checked={checked}
  onChangeChecked={setChecked}
/>`

    const code =
`import {motion} from 'framer-motion'

interface iInputSwitch{
    checked:boolean,
    onChangeChecked: (e:boolean) => void,
    disabled?:boolean,
    showText?:boolean,
    trueText?:string,
    falseText?:string,
    trueBackgroundColor?:string,
    falseBackgroundColor?:string,
    widthMultiplier?:number,
    height?:string
}

export default function InputSwitch({checked=false,onChangeChecked,disabled=false, height='40px',showText=false,falseText='Off',trueText='On', falseBackgroundColor='#d4d4d8', trueBackgroundColor='#00bcff', widthMultiplier=2}:iInputSwitch){
    
    const inputSwitch = {
            false: { x:0,transition: {
                    duration: .300,
                } },
            true: {
                x:'100%',
                transition: {
                    duration: .300,
                }
            }
        }

    return(
        <div className={\`shrink-0 rounded-full relative cursor-pointer flex flex-row \${disabled ? 'pointer-events-none opacity-90' : ''}\`} style={{width:\`calc(\${height} * \${widthMultiplier})\`, height, backgroundColor: checked ? trueBackgroundColor : falseBackgroundColor}} onClick={() => onChangeChecked(!checked)}>
            {showText && <span className='flex w-full h-full items-center justify-center capitalize' style={{fontSize:\`calc(\${height} / 3)\`}}>{trueText}</span>}
            <motion.div className="bg-white rounded-full absolute top-0 left-0" style={{height:'100%', width:'50%'}}  variants={inputSwitch} initial={checked ? 'true' : 'false'} animate={checked ? 'true' : 'false'}></motion.div>
            {showText && <span className='flex w-full h-full items-center justify-center capitalize' style={{fontSize:\`calc(\${height} / 3)\`}}>{falseText}</span>}
        </div>
    )
}`

    return (
        <PageComponent
            ComponentType="Componentes"
            componentName="Input Switch"
            componentCodeName="InputSwitch"
            description="Componente de switch utilizado para alternar entre estados booleanos (ligado/desligado)."
            code={code}
            preview={<InputSwitch checked={checked} onChangeChecked={setChecked}/>}
            props={[
                {
                    propName: "checked",
                    type: "boolean",
                    default: "-",
                    description: "Estado atual do switch (ligado ou desligado)",
                    required: true
                },
                {
                    propName: "onChangeChecked",
                    type: "(value: boolean) => void",
                    default: "-",
                    description: "Função chamada quando o estado muda",
                    required: true
                },
                {
                    propName: "showText",
                    type: "boolean",
                    default: "false",
                    description: "Exibe texto indicando o estado atual",
                    required: false
                },
                {
                    propName: "trueText",
                    type: "string",
                    default: "On",
                    description: "Texto exibido quando ativo",
                    required: false
                },
                {
                    propName: "falseText",
                    type: "string",
                    default: "Off",
                    description: "Texto exibido quando inativo",
                    required: false
                },
                {
                    propName: "trueBackgroundColor",
                    type: "string",
                    default: "-",
                    description: "Cor de fundo no estado ativo",
                    required: false
                },
                {
                    propName: "falseBackgroundColor",
                    type: "string",
                    default: "-",
                    description: "Cor de fundo no estado inativo",
                    required: false
                },
                {
                    propName: "widthMultiplier",
                    type: "number",
                    default: "2",
                    description: "Multiplicador de largura do switch",
                    required: false
                },
                {
                    propName: "height",
                    type: "string",
                    default: "40px",
                    description: "Altura do componente (deve incluir unidade)",
                    required: false
                }
            ]}
        />
    )
}