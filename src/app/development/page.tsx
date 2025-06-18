'use client'
import { useRef } from 'react';
import { PageLoader, plController } from '../../uiKit/pageProgress/pageProgress'

export default function Component() {
    const containerRef = useRef<HTMLDivElement>(null);
    const handleStart = () => {
        plController.start();
        setTimeout(() => {
            plController.end();
        }, 5000);
    };

    return (
        <div className="w-full h-full">
            {/* <PageLoader color='#8e51ff' /> */}
            <button onClick={() => plController.start()} className="bg-blue-500 text-white p-2 rounded">
                Show Loader
            </button>

            <button onClick={() => plController.end()} className="bg-blue-500 text-white p-2 rounded">
                stop Loader
            </button>

        </div>
    )
}