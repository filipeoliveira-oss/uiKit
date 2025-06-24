import React, { useEffect, useRef, useState } from "react"

interface IInputOtp {
    value: string,
    changeOtp: (e: string) => void,
    tokenLength: number,
    separator?: string,
    intergerOnly?: boolean,
    disabled?: boolean
}

export default function InputOtp({ changeOtp, tokenLength, value, disabled, intergerOnly, separator }: IInputOtp) {
    const [valueArray, setValueArray] = useState<Array<string>>(Array.from({ length: tokenLength }, (_, i) => ''))
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        if (value) {
            const aux = value.split('')
            setValueArray(aux)
        }
    }, [])

    function handleChange(value: string, index: number) {
        if (intergerOnly && isNaN(Number(value))) return

        const aux = [...valueArray]
        aux[index] = value.toUpperCase()
        setValueArray(aux)
        changeOtp(aux.join(''))

        if (value && index < tokenLength - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        if (e.key === "Backspace" && valueArray[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus();

            return
        }

        if (e.key === 'ArrowLeft') {
            inputRefs.current[index - 1]?.focus();
            return
        }

        if (e.key === 'ArrowRight') {
            inputRefs.current[index + 1]?.focus();
            return
        }
    }

    function handlePaste(e: React.ClipboardEvent<HTMLInputElement>, startIndex: number) {
        e.preventDefault();
        const paste = e.clipboardData.getData("text").replace(/\s/g, '');
        if (!paste) return;

        const chars = paste.split('').slice(0, tokenLength - startIndex);
        const newArray = [...valueArray];

        for (let i = 0; i < chars.length; i++) {
            newArray[startIndex + i] = chars[i];
        }

        setValueArray(newArray);

        const lastIndex = startIndex + chars.length - 1;
        if (lastIndex < tokenLength) {
            inputRefs.current[lastIndex]?.focus();
            inputRefs.current[lastIndex]?.select();
        }
    }

    return (
        <div className={`w-fit h-12 flex flex-row gap-2 uppercase ${disabled ? 'pointer-events-none' : ''}`}>
            {Array.from({ length: tokenLength }, (_, i) => {
                return (
                    <React.Fragment key={i}>
                        <input
                            key={i}
                            ref={(el) => { inputRefs.current[i] = el; }}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={(e) => handlePaste(e, i)}
                            className="uppercase text-sm w-8 border border-zinc-400 rounded-lg text-center text-black"
                            value={valueArray[i] ?? ''}
                            onChange={(e) => handleChange(e.target.value, i)}
                            maxLength={1}
                            disabled={disabled}
                        />
                        {((i !== tokenLength - 1) && separator) && (<span className="w-fit h-full flex items-center justify-center">{separator}</span>)}
                    </React.Fragment>
                )
            }
            )}
        </div>
    )
}