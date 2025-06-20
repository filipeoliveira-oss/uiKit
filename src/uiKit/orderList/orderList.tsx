import React, { useState } from "react"

interface IOrderList {
    value: Array<any>,
    changeValue: (items: Array<any>) => void,
    itemTemplate: (item: any) => React.ReactNode,
    dragAndDrop?: boolean,
    maxHeight?: string,
    header?: string
}


export default function OrderList({ itemTemplate, value, changeValue, dragAndDrop, maxHeight = '500px', header }: IOrderList) {
    const [selectedItemIndex, setSelectedItemIndex] = useState<null | number>(null)
    const [overIndex, setOverIndex] = useState<null | number>(null)
    const [draggedItemIndex, setDraggedItemIndex] = useState<null | number>(null)

    function handleUpOne() {
        if (selectedItemIndex !== null) {
            if (selectedItemIndex === 0) return;

            const auxCopy = [...value]
            const auxPrev = auxCopy[selectedItemIndex - 1]
            auxCopy[selectedItemIndex - 1] = auxCopy[selectedItemIndex]
            auxCopy[selectedItemIndex] = auxPrev
            changeValue(auxCopy)
            setSelectedItemIndex(selectedItemIndex - 1)
        }
    }

    function handleUpAll() {
        if (selectedItemIndex !== null) {
            if (selectedItemIndex === 0) return;

            const auxCopy = [...value];
            const [item] = auxCopy.splice(selectedItemIndex, 1);
            auxCopy.unshift(item);
            changeValue(auxCopy)
            setSelectedItemIndex(0)
        }
    }

    function handleDownOne() {
        if (selectedItemIndex !== null) {
            if (selectedItemIndex === value.length - 1) return;
            const auxCopy = [...value]
            const auxPrev = auxCopy[selectedItemIndex + 1]
            auxCopy[selectedItemIndex + 1] = auxCopy[selectedItemIndex]
            auxCopy[selectedItemIndex] = auxPrev
            changeValue(auxCopy)
            setSelectedItemIndex(selectedItemIndex + 1)
        }
    }

    function handleDownAll() {
        if (selectedItemIndex !== null) {
            if (selectedItemIndex === value.length - 1) return;

            const auxCopy = [...value];
            const [item] = auxCopy.splice(selectedItemIndex, 1);
            auxCopy.push(item);
            changeValue(auxCopy)
            setSelectedItemIndex(0)
            setSelectedItemIndex(value.length - 1)
        }
    }

    const handleDragStart = (e: any, index: number) => {
        e.dataTransfer.setData("index", index);
        setDraggedItemIndex(index)
    };

    const handleDrop = (e: any, targetIndex: any) => {
        const sourceIndex = parseInt(e.dataTransfer.getData("index"));
        const newItems = [...value];
        const [movedItem] = newItems.splice(sourceIndex, 1);
        newItems.splice(targetIndex, 0, movedItem);
        changeValue(newItems);
        setDraggedItemIndex(null)
    };

    return (
        <div className="w-fit px-2 flex flex-row gap-2 text-black " style={{ maxHeight }}>
            <div className="w-10 h-full shrink-0 flex flex-col gap-2 items-center justify-center select-none">
                <div onClick={() => handleUpAll()} className="w-full h-fit flex items-center justify-center bg-sky-400 rounded-lg cursor-pointer py-2 hover:bg-sky-500" style={selectedItemIndex === null ? { opacity: .6, pointerEvents: 'none' } : { opacity: 1, pointerEvents: 'auto' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m17 11-5-5-5 5" />
                        <path d="m17 18-5-5-5 5" />
                    </svg>
                </div>

                <div onClick={() => handleUpOne()} className="w-full h-fit flex items-center justify-center bg-sky-400 rounded-lg cursor-pointer py-2 hover:bg-sky-500" style={selectedItemIndex === null ? { opacity: .6, pointerEvents: 'none' } : { opacity: 1, pointerEvents: 'auto' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m18 15-6-6-6 6" />
                    </svg>
                </div>

                <div onClick={() => handleDownOne()} className="w-full h-fit flex items-center justify-center bg-sky-400 rounded-lg cursor-pointer py-2 hover:bg-sky-500" style={selectedItemIndex === null ? { opacity: .6, pointerEvents: 'none' } : { opacity: 1, pointerEvents: 'auto' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m6 9 6 6 6-6" />
                    </svg>
                </div>

                <div onClick={() => handleDownAll()} className="w-full h-fit flex items-center justify-center bg-sky-400 rounded-lg cursor-pointer py-2 hover:bg-sky-500" style={selectedItemIndex === null ? { opacity: .6, pointerEvents: 'none' } : { opacity: 1, pointerEvents: 'auto' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m7 6 5 5 5-5" />
                        <path d="m7 13 5 5 5-5" />
                    </svg>
                </div>
            </div>

            <div className="w-full h-full flex flex-col gap-0 ">
                {header && (
                    <div className="w-full h-10 flex-wrap bg-zinc-100 shrink-0 items-center flex px-2 border-b border-zinc-200">
                        <span className="font-semibold">{header}</span>
                    </div>
                )}
                <div className="flex flex-col w-full h-full overflow-y-auto overflow-x-hidden shrink-0 bg-white">
                    {value.map((item, i) => (
                        <React.Fragment key={i}>
                            {dragAndDrop && (
                                <div className={`w-full h-2 shrink-0 ${overIndex === i ? 'bg-sky-200' : 'bg-red-500'}`} onDragLeave={() => setOverIndex(null)}
                                    onDragOver={e => {
                                        if (draggedItemIndex !== i && draggedItemIndex !== i - 1) {
                                            e.preventDefault();
                                            setOverIndex(i);
                                        }
                                    }}
                                    onDrop={e => {
                                        handleDrop(e, i);
                                        setOverIndex(null);
                                    }}
                                />
                            )}


                            <div
                                draggable={!!dragAndDrop}
                                onDragStart={dragAndDrop ? (e) => handleDragStart(e, i) : undefined}
                                onClick={() => setSelectedItemIndex(prev => (prev === i ? null : i))}
                                className={`cursor-pointer ${selectedItemIndex === i ? 'bg-sky-200 hover:bg-sky-300' : 'bg-transparent hover:bg-zinc-200'}`}>
                                {itemTemplate(item)}
                            </div>
                        </React.Fragment>
                    ))}


                    {dragAndDrop && (
                        <div className={`w-full h-2 shrink-0 ${overIndex === value.length ? 'bg-sky-200' : 'bg-red-500'}`} onDragLeave={() => setOverIndex(null)}
                            onDragOver={e => {
                                if (draggedItemIndex !== value.length - 1) {
                                    e.preventDefault();
                                    setOverIndex(value.length);
                                }
                            }}
                            onDrop={e => {
                                handleDrop(e, value.length);
                                setOverIndex(null);
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}