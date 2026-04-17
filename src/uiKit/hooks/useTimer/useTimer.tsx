import { useEffect, useRef, useState, useCallback } from "react"

type UseSimpleTimerProps = {
    initialSeconds: number
    autoStart?: boolean
    onExpiry?: () => void
}

export function useTimer({
    initialSeconds,
    autoStart = false,
    onExpiry
}: UseSimpleTimerProps) {
    const [totalSeconds, setTotalSeconds] = useState(initialSeconds)
    const [isRunning, setIsRunning] = useState(autoStart)

    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const hasExpiredRef = useRef(false)

    const onExpiryRef = useRef(onExpiry)

    useEffect(() => {
        onExpiryRef.current = onExpiry
    }, [onExpiry])

    // 🔥 detecta expiração FORA do interval
    useEffect(() => {
        if (totalSeconds === 0 && isRunning) {
            if (!hasExpiredRef.current) {
                hasExpiredRef.current = true
                onExpiryRef.current?.()
            }
        }
    }, [totalSeconds, isRunning])

    const start = useCallback(() => {
        if (intervalRef.current) return

        intervalRef.current = setInterval(() => {
            setTotalSeconds(prev => (prev <= 1 ? 0 : prev - 1))
        }, 1000)
    }, [])

    const pause = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }
        setIsRunning(false)
    }, [])

    const resume = useCallback(() => {
        setIsRunning(true)
    }, [])

    const restart = useCallback(
        (newSeconds?: number, autoStart = true) => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }

            hasExpiredRef.current = false

            setTotalSeconds(newSeconds ?? initialSeconds)

            if (autoStart) {
                setIsRunning(true)
                start() 
            } else {
                setIsRunning(false)
            }
        },
        [initialSeconds, start]
    )

    useEffect(() => {
        if (isRunning) {
            start()
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [isRunning, start])

    return {
        totalSeconds,
        isRunning,
        pause,
        resume,
        restart
    }
}