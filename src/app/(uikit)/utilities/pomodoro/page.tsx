'use client'

import DragTaskComponent from "@/components/dragTaskComponent"
import { Button } from "@/uiKit/components/button/button"
import Modal from "@/uiKit/components/modal/modal"
import { Check, ChevronDown, ChevronUp, EllipsisVertical, Plus, SkipForward } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useTimer } from "react-timer-hook"

interface ITasks {
    title: string,
    pomodoros: number,
    complete: boolean,
    uuid: string,
    pomodorosComplete: number,
    includedAt: number
}

export default function PomodoroPage() {
    const methods = useForm<ITasks>({
        defaultValues: {
            complete: false,
            pomodoros: 1,
            title: ''
        }
    })
    const [currentState, setCurrentState] = useState<'pomodoro' | 'short' | 'long'>('pomodoro')
    const [currentCycle, setCurrentCycle] = useState(1)
    const [taskModal, setTaskModal] = useState(false)
    const { isRunning, pause, totalSeconds, restart, resume } = useTimer({ expiryTimestamp: getExpiry(25), autoStart: false, onExpire: () => handleExpiry() })
    const [activeTask, setActiveTask] = useState<ITasks | null>(null)
    const [currentTasks, setCurrentTasks] = useState<Array<ITasks>>(Array.from({ length: 10 }, (_, i) => ({ complete: false, pomodoros: 1, title: String(i + 1), uuid: crypto.randomUUID(), pomodorosComplete: 0, includedAt: new Date().getTime() })))
    const MAXSHORTBREAKCOUNT = 4
    const POMODOROTIME = 0.3
    const SHORTBREAK = 0.1
    const LONGBREAK = 0.2

    function getExpiry(minutes: number) {
        const time = new Date();
        time.setSeconds(time.getSeconds() + (minutes * 60));
        return time;
    }

    useEffect(() => {
        if (Notification.permission !== "denied") {
            Notification.requestPermission()
        }
    }, [])

    useEffect(() => {
        if (currentState === 'pomodoro') restart(getExpiry(POMODOROTIME), false)
        if (currentState === 'long') restart(getExpiry(LONGBREAK), false)
        if (currentState === 'short') restart(getExpiry(SHORTBREAK), false)
    }, [currentState])

    function handleExpiry(shouldNotify: boolean = true) {
        if (currentState === 'pomodoro') {
            setCurrentCycle(prev => prev + 1)
            setCurrentTasks(prev => prev.map((each) => {
                if (activeTask && each.uuid === activeTask.uuid) {
                    return {
                        ...each,
                        pomodorosComplete: Number(each.pomodorosComplete) + 1
                    }
                }
                return each
            }))

            if (currentCycle % MAXSHORTBREAKCOUNT === 0) {
                setCurrentState('long')
                shouldNotify && notify(`Você acabou seu Pomodoro #${MAXSHORTBREAKCOUNT}`, {
                    body: 'Você merece um descanso maior'
                })
            } else {
                setCurrentState('short')
                shouldNotify && notify(`Você acabou seu Pomodoro`, {
                    body: 'Você merece um descanso'
                })
            }
        } else {
            setCurrentState('pomodoro')
            shouldNotify && notify(`Sua pausa acabou`, {
                body: 'É hora de voltar à concentração'
            })
        }
    }

    function formatTime(totalSeconds: number) {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    function notify(title: string, options: NotificationOptions | undefined) {
        if (!("Notification" in window)) {
            console.log("Browser não suporta notificações")
            return
        }

        if (Notification.permission === "granted") {
            new Notification(title, options)
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification(title, options)
                }
            })
        }
    }

    function handleCompleteTask(id: string) {
        setCurrentTasks(prev => {
            const updated = prev.map((each) => {
                if (each.uuid === id) {
                    return { ...each, complete: !each.complete };
                }
                return each;
            });
            const wasCompleted = updated.find(t => t.uuid === id)?.complete;

            if (wasCompleted) {
                const nextTask = updated
                    .filter(t => !t.complete && t.uuid !== id)
                    .sort((a, b) => a.includedAt - b.includedAt)[0];

                if (nextTask) {
                    setActiveTask(nextTask)
                }
            }

            return updated;
        });
    }

    function taskItem(item: ITasks) {
        return (
            <div className={`min-w-[25vw] h-fit flex flex-row px-2 py-4 border-l-4 rounded-md justify-between items-center ${(activeTask && activeTask.uuid === item.uuid) ? 'border-card-foreground' : 'border-transparent hover:border-zinc-300'}`} onClick={() => setActiveTask(item)}>
                <div className="w-fit h-full flex flex-row gap-2 items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.complete ? 'bg-primary/20' : 'bg-muted-foreground/20'}`} onClick={(e) => { e.stopPropagation(); handleCompleteTask(item.uuid) }}>
                        <Check size={16} strokeWidth={2.5} />
                    </div>
                    <span className={`${item.complete ? 'line-through' : ''}`}>{item.title}</span>
                </div>

                <div className="flex flex-row gap-2 w-fit h-full items-center justify-center">
                    <span className="opacity-60 font-semibold text-base"><span className="text-lg!">{item.pomodorosComplete}</span>/{item.pomodoros}</span>
                    <div className=" h-fit w-fit cursor-pointer border border-border p-0.5" onClick={(e) => { e.stopPropagation(); methods.reset(item, { keepDefaultValues: true }); setTaskModal(true) }}><EllipsisVertical /></div>
                </div>
            </div>
        )
    }

    function saveTask(task: ITasks) {
        setCurrentTasks(prev => [...prev, {
            complete: false,
            pomodoros: task.pomodoros,
            title: task.title,
            uuid: crypto.randomUUID(),
            pomodorosComplete: 0,
            includedAt: new Date().getTime()
        }])

        handleCloseModal()
    }

    const handleCloseModal = () => {
        methods.reset();
        setTaskModal(false)
    }

    return (
        <>
            <div className="w-full h-full flex flex-col items-center py-4">
                <div className="xl:w-1/2 w-full h-[30vh] shrink-0 flex flex-col items-center justify-between py-4 bg-foreground/5 rounded-2xl">
                    <div className="w-fit h-fit flex flex-row gap-4">
                        <span className={`text-lg cursor-pointer ${currentState === 'pomodoro' ? 'font-semibold' : 'font-normal'}`} onClick={() => setCurrentState('pomodoro')}>Pomodoro</span>
                        <span className={`text-lg cursor-pointer ${currentState === 'short' ? 'font-semibold' : 'font-normal'}`} onClick={() => setCurrentState('short')}>Intervalo curto</span>
                        <span className={`text-lg cursor-pointer ${currentState === 'long' ? 'font-semibold' : 'font-normal'}`} onClick={() => setCurrentState('long')}>Intervalo longo</span>
                    </div>

                    <h1 className="text-7xl">{formatTime(totalSeconds)}</h1>
                    <div className="w-full h-fit flex flex-row gap-4 items-center justify-center relative">
                        <Button onClick={() => { isRunning ? pause() : resume() }}>{isRunning ? 'Pausar' : "Começar"}</Button>
                        <button className="border-none outline-none cursor-pointer transition-all duration-500 absolute right-[30%] bottom-1/2 translate-y-1/2" style={!isRunning ? { opacity: 0, pointerEvents: 'none' } : { opacity: 1, pointerEvents: 'auto' }} onClick={() => handleExpiry(false)}><SkipForward className="bg-background" /></button>
                    </div>
                </div>

                <div className="xl:w-1/2 w-full h-fit flex flex-col gap-2 items-center text-lg">
                    <span className="opacity-80">#{currentCycle}</span>
                    <span >{activeTask ? activeTask.title : currentState === 'pomodoro' ? 'Hora de focar!' : 'Hora de descansar!'}</span>
                </div>

                <div className="xl:w-1/2 w-full h-[50vh]  flex flex-col mt-4">
                    <div className="w-full h-fit flex flex-row justify-between ">
                        <span className="text-2xl w-[100%] border-b-2 pb-2 border-border">Tarefas</span>
                    </div>
                    <DragTaskComponent changeValue={setCurrentTasks} value={currentTasks} itemTemplate={taskItem} dragAndDrop showArrows={false} />
                    <div onClick={() => setTaskModal(true)} className="w-full h-fit shrink-0 py-2! border-3 border-dashed border-border flex flex-row items-center justify-center gap-4 cursor-pointer transition-colors hover:bg-primary/5 hover:border-primary/20">
                        <Plus className="cursor-pointer" size={28} />
                        <span>Adicionar nova tarefa</span>
                    </div>
                </div>
            </div>

            <Modal title="" isOpen={taskModal} onClose={handleCloseModal} openWidth='fit-content' className="bg-background border border-border">
                <form className="flex flex-col gap-4 justify-center" onSubmit={methods.handleSubmit(saveTask)}>
                    <label htmlFor="title" className="flex flex-col gap-2">
                        <input id="title" {...methods.register('title')} autoFocus placeholder="Título da tarefa" className="text-2xl outline-none w-[30vw] font-semibold" required />
                    </label>

                    <label htmlFor="pomodoros" className="flex flex-col gap-4 justify-center select-none">
                        <span className="opacity-80 text-lg font-medium">Pomodoros</span>
                        <div className="flex flex-row gap-2 items-center">
                            <input id="pomodoros" {...methods.register('pomodoros')} type="number" min={1} step={1} className="inputNumber w-24 h-12 text-2xl px-1 outline-none" />
                            <div className="bg-muted p-2 rounded-md flex items-center justify-center cursor-pointer" onClick={() => methods.setValue('pomodoros', Number(methods.getValues('pomodoros')) + 1)}>
                                <ChevronUp size={32} strokeWidth={1.5} />
                            </div>
                            <div className="bg-muted p-2 rounded-md flex items-center justify-center cursor-pointer" onClick={() => methods.setValue('pomodoros', Number(methods.getValues('pomodoros')) > 0 ? Number(methods.getValues('pomodoros')) - 1 : 0)}>
                                <ChevronDown size={32} strokeWidth={1.5} />
                            </div>
                        </div>
                    </label>


                    <div className="w-full h-fit flex flex-row gap-4 justify-end items-center">
                        <Button variant="outline" onClick={handleCloseModal}>Cancelar</Button>
                        <Button variant="primary" type="submit">Salvar</Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}