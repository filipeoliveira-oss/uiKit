import {motion} from 'framer-motion'

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
        <div className={`shrink-0 rounded-full relative cursor-pointer flex flex-row ${disabled ? 'pointer-events-none opacity-90' : ''}`} style={{width:`calc(${height} * ${widthMultiplier})`, height, backgroundColor: checked ? trueBackgroundColor : falseBackgroundColor}} onClick={() => onChangeChecked(!checked)}>
            {showText && <span className='flex w-full h-full items-center justify-center capitalize' style={{fontSize:`calc(${height} / 3)`}}>{trueText}</span>}
            <motion.div className="bg-white rounded-full absolute top-0 left-0" style={{height:'100%', width:'50%'}}  variants={inputSwitch} initial={checked ? 'true' : 'false'} animate={checked ? 'true' : 'false'}></motion.div>
            {showText && <span className='flex w-full h-full items-center justify-center capitalize' style={{fontSize:`calc(${height} / 3)`}}>{falseText}</span>}
        </div>
    )
}