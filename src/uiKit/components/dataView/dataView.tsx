import React, { useEffect, useState } from "react"

interface IDataView {
    values: Array<any>
    itemTemplate: (item: any) => React.ReactNode,
    pagination?: boolean,
    rows?: number,
    header?: React.ReactNode,
    maxVisiblePages?: number,
    showItemBorder?: boolean
}


export default function DataView({ values, itemTemplate, header, pagination = false, rows = 10, maxVisiblePages = 6, showItemBorder = true }: IDataView) {
    const [currentItems, setCurrentItems] = useState<Array<any>>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [totalPagesLength, setTotalPagesLength] = useState(0)
    const [startPage, setStartPage] = useState(0);

    useEffect(() => {
        if (pagination && rows && rows > 0) {
            const totalPages = Math.ceil(values.length / rows);
            setTotalPagesLength(totalPages);

            const startIndex = currentIndex * rows;
            const endIndex = startIndex + rows;

            setCurrentItems(values.slice(startIndex, endIndex));
        } else {
            setCurrentItems(values);
        }
    }, [pagination, rows, values, currentIndex]);

    return (
        <div className="w-fit h-fit rounded-2xl bg-white border border-zinc-200 text-black px-2">
            {header && header}
            <div className="w-fit h-fit flex flex-col">
                {values.length === 0 ? <span>No available items to show</span> : (
                    currentItems.map((item, i) => (
                        <div key={i} className={`${(showItemBorder && rows && i < rows - 1) ? 'border-b border-b-zinc-300' : ''}`}>
                            {itemTemplate(item)}
                        </div>
                    ))
                )}
            </div>

            {(pagination && rows && rows > 0 && values.length > 0) && (
                <div className="w-full h-fit flex flex-row items-center justify-center py-2 gap-2 select-none">
                    <div className={`cursor-pointer hover:bg-zinc-200 flex items-center justify-center rounded-full w-fit h-fit ${currentIndex === 0 ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => { setCurrentIndex(0); setStartPage(0) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m11 17-5-5 5-5" />
                            <path d="m18 17-5-5 5-5" />
                        </svg>
                    </div>
                    <div className={`cursor-pointer hover:bg-zinc-200 flex items-center justify-center rounded-full w-fit h-fit ${currentIndex === 0 ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => { setCurrentIndex(prev => prev - 1); if (currentIndex - 1 < startPage) setStartPage(prev => Math.max(prev - 3, 0)) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </div>

                    {Array.from({ length: totalPagesLength }, (_, i) => i).slice(startPage, startPage + maxVisiblePages).map(i => (
                        <div
                            key={i}
                            className={`text-sm flex w-8 h-8 px-2 py-2 cursor-pointer rounded-full items-center justify-center hover:bg-zinc-200 ${currentIndex === i ? 'bg-sky-100' : ''}`}
                            onClick={() => {
                                setCurrentIndex(i);
                                // Move window forward if user clicks on last page
                                if (i === startPage + maxVisiblePages - 1 && i < totalPagesLength - 1) {
                                    setStartPage(prev => prev + 2);
                                }
                                // Move window backward if clicking early pages
                                if (i === startPage && i > 0) {
                                    setStartPage(prev => Math.max(prev - 2, 0));
                                }
                            }}
                        >
                            <span className="block">{i + 1}</span>
                        </div>))}

                    <div className={`cursor-pointer hover:bg-zinc-200 flex items-center justify-center rounded-full w-fit h-fit ${currentIndex === totalPagesLength - 1 ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => { setCurrentIndex(prev => prev + 1); if (currentIndex + 1 >= startPage + maxVisiblePages) setStartPage(prev => Math.min(prev + 3, totalPagesLength - maxVisiblePages)) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m9 18 6-6-6-6" /></svg>
                    </div>
                    <div className={`cursor-pointer hover:bg-zinc-200 flex items-center justify-center rounded-full w-fit h-fit ${currentIndex === totalPagesLength - 1 ? 'opacity-50 pointer-events-none' : ''}`} onClick={() => { setCurrentIndex(totalPagesLength - 1); setStartPage(Math.max(totalPagesLength - maxVisiblePages, 0)) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 17 5-5-5-5" />
                            <path d="m13 17 5-5-5-5" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    )
}