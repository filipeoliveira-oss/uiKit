'use client'
import React, { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

// --- Controller logic ---
type Listener = () => void;

class PageLoaderController {
    private listeners: Set<Listener> = new Set();
    private isActive = false;
    private progress = 0;
    private interval: any = null;
    private snapshot = { active: false, progress: 0 };

    start = () => {
        this.isActive = true;
        this.progress = 0;
        this.startProgress();
        this.updateSnapshot();
        this.emit();
    };


    private startProgress = () => {
        clearTimeout(this.interval); // clear any previous loop
        this.progress = 3;
        this.updateSnapshot();
        this.emit();

        const tick = () => {
            if (!this.isActive) return;


            const increment = Math.random() * (0.3 - 0.05) + 0.02;
            const nextProgress = this.progress + increment;

            if (nextProgress >= 98) return;

            this.progress = nextProgress;
            this.updateSnapshot();
            this.emit();

            this.interval = setTimeout(tick, 80);
        };

        tick(); // start ticking
    };

    end = () => {
        this.progress = 100;
        this.updateSnapshot();
        this.emit();
        clearInterval(this.interval);
        setTimeout(() => {
            this.progress = 0;
            this.isActive = false;
            this.updateSnapshot();
            this.emit();
        }, 300);
    };

    subscribe = (fn: Listener) => {
        this.listeners.add(fn);
        return () => this.listeners.delete(fn);
    };

    private emit = () => {
        this.listeners.forEach((fn) => fn());
    };

    private updateSnapshot = () => {
        this.snapshot = {
            active: this.isActive,
            progress: this.progress,
        };
    };

    getValue = () => this.snapshot;
}

export const plController = new PageLoaderController();


// --- Component ---
interface IPageLoader {
    template?: React.ReactNode,
    color?: string,
    glow?: boolean,
    height?: string
}
export const PageLoader = ({ template, color = '#ff0000', glow = true, height }: IPageLoader) => {

    const { active, progress } = useSyncExternalStore(
        plController.subscribe,
        plController.getValue,
        plController.getValue,
    );

    const style = {
        width: `${progress}%`,
        backgroundColor: color,
        height:height ?? '2px',
        ...(glow ? { boxShadow: `0 0 10px ${color}, 0 0 25px ${color}, 0 0 50px ${color}, 0 0 80px ${color} , 0 0 100px ${color}` } : {})
    }

    function LoaderComponent() {

        return (
            <div className="absolute top-0 left-0 transition-[width] duration-500 ease-out z-[99999]" style={style}></div>

        )
    }


    return (
        active && createPortal(template ?? <LoaderComponent />, document.body)
    );
};
