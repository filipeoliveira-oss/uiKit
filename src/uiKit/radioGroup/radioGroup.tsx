interface IRadioGroup {
    value: string,
    changeValue: (e: string) => void,
    options: Array<string>,
    name: string,
    selectedColor?: string,
    disabled?: boolean
}

export default function RadioGroup({ changeValue, options, value, selectedColor = '#00bcff', name, disabled = false }: IRadioGroup) {
    return (
        <>
            <div className={`w-fit h-fit flex flex-col gap-2 text-black ${disabled ? 'pointer-events-none' : ''}`}>
                {options.map((option, i) => {
                    const isSelected = option === value;
                    return (
                        <div
                            key={i}
                            className="flex flex-row gap-2 items-center cursor-pointer select-none"
                            onClick={() => changeValue(option)}
                        >
                            <input
                                type="radio"
                                id={option}
                                name={name}
                                value={option}
                                checked={isSelected}
                                className="hidden"
                                readOnly
                            />
                            <div className={`h-4 w-4 rounded-full border-2 transition-transform duration-200 ease-out relative`} style={isSelected ? { borderColor: selectedColor, scale: '125%' } : { borderColor: ' #9f9fa9', scale: '100%' }} />
                            <label htmlFor={option} className="cursor-pointer">
                                {option}
                            </label>
                        </div>
                    );
                })}
            </div>
        </>
    )
}