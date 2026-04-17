'use client'

import DragTaskComponent from "@/components/dragTaskComponent"
import ActionsMenu from "@/uiKit/components/actionsMenu/actionsMenu"
import { Button } from "@/uiKit/components/button/button"
import InputSwitch from "@/uiKit/components/inputSwitch/inputSwitch"
import Modal from "@/uiKit/components/modal/modal"
import { useDebounceCallback } from "@/uiKit/hooks/useDebounceCallback/useDebounceCallback"
import { useTimer } from "@/uiKit/hooks/useTimer/useTimer"
import { ScaleLoader } from "@/uiKit/loaders/scaleLoader/scaleLoader"
import { Check, ChevronDown, ChevronUp,  Clock, Cog, EllipsisVertical, HelpCircle, ListTodo, Plus, SkipForward, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

interface ITasks {
    title: string,
    pomodoros: number,
    complete: boolean,
    uuid: string,
    pomodorosComplete: number
}

interface IConfig {
    pomodoroTime: number,
    shortBreakTimer: number,
    longBreakTimer: number,
    autoStartBreak: boolean,
    autoStartPomodoro: boolean,
    longInterval: number,
    autoCompleteTask: boolean,
    moveCompleteToBottom: boolean
}

type PomodoroStateType = 'pomodoro' | 'short' | 'long'
export default function PomodoroPage() {
    const configMethods = useForm<IConfig>({
        defaultValues: {
            pomodoroTime: 25,
            shortBreakTimer: 5,
            longBreakTimer: 15,
            autoStartBreak: false,
            autoStartPomodoro: false,
            longInterval: 4,
            autoCompleteTask: false,
            moveCompleteToBottom: true
        }
    })

    const methods = useForm<ITasks>({
        defaultValues: {
            complete: false,
            pomodoros: 1,
            title: ''
        }
    })
    const [currentState, setCurrentState] = useState<PomodoroStateType>('pomodoro')
    const [currentCycle, setCurrentCycle] = useState(1)
    const [taskModal, setTaskModal] = useState(false)
    const [configModal, setConfigModal] = useState(false)
    const [elapsed, setElapsed] = useState(0)
    const { isRunning, pause, totalSeconds, restart, resume } = useTimer({ initialSeconds: getExpiry(25), autoStart: false, onExpiry: () => handleExpiry() })
    const [activeTask, setActiveTask] = useState<ITasks | null>(null)
    const [currentTasks, setCurrentTasks] = useState<Array<ITasks>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [editingTask, setEditingTask] = useState<ITasks | null>(null)

    useEffect(() => {
        let timeout: NodeJS.Timeout

        const subscription = configMethods.watch((value) => {
            clearTimeout(timeout)

            timeout = setTimeout(() => {
                localStorage.setItem(
                    'fouikit-pomodoro-configurations',
                    JSON.stringify(value)
                )
            }, 1000)
        })

        return () => {
            subscription.unsubscribe()
            clearTimeout(timeout)
        }
    }, [configMethods])

    useEffect(() => {
        const configs = localStorage.getItem('fouikit-pomodoro-configurations')
        const tasks = localStorage.getItem('fouikit-pomodoro-tasks')
        if (Notification.permission !== "denied") {
            Notification.requestPermission()
        }

        if (!configs) {
            localStorage.setItem('fouikit-pomodoro-configurations', JSON.stringify(configMethods.getValues()))
        } else {
            const parsed = JSON.parse(configs)
            configMethods.reset(parsed)
            restart(getExpiry(parsed.pomodoroTime), false)
        }

        if (tasks) {
            const parsedTasks: ITasks[] = JSON.parse(tasks)

            let shouldSort = false

            if (configs) {
                const parsedConfig: IConfig = JSON.parse(configs)
                shouldSort = parsedConfig.moveCompleteToBottom
            }

            const finalTasks = shouldSort
                ? [...parsedTasks].sort((a, b) => Number(a.complete) - Number(b.complete))
                : parsedTasks

            setCurrentTasks(finalTasks)
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 1000);
    }, [])

    useEffect(() => {
        localStorage.setItem('fouikit-pomodoro-tasks', JSON.stringify(currentTasks))
    }, [currentTasks])

    useEffect(() => {
        if (!isRunning) return

        setElapsed(prev => prev + 1)
    }, [totalSeconds])

    function getExpiry(minutes: number) {
        return minutes * 60;
    }

    function handleExpiry(shouldNotify: boolean = true) {
        const MAXSHORTBREAKCOUNT = configMethods.getValues('longInterval')

        if (currentState === 'pomodoro') {

            setCurrentTasks(prev => {
                const updated = prev.map(each => {
                    if (activeTask && each.uuid === activeTask.uuid) {
                        const pomoCompleted = Number(each.pomodorosComplete) + 1
                        const shouldComplete = (configMethods.getValues('autoCompleteTask') && pomoCompleted === each.pomodoros && !each.complete) ? true : false
                        return {
                            ...each,
                            pomodorosComplete: pomoCompleted,
                            complete: shouldComplete
                        }
                    }
                    return each
                })

                if (configMethods.getValues('moveCompleteToBottom')) {
                    return updated.sort(
                        (a, b) => (Number(a.complete) - Number(b.complete))
                    )
                }

                return updated
            })



            if (currentCycle % MAXSHORTBREAKCOUNT === 0) {
                setCurrentState('long')
                restart(getExpiry(configMethods.getValues('longBreakTimer')), configMethods.getValues('autoStartBreak'))
                // shouldAutoStart('long')
                setElapsed(0)
                shouldNotify && notify(`Você acabou seu Pomodoro #${MAXSHORTBREAKCOUNT}`, {
                    body: 'Você merece um descanso maior'
                })
            } else {
                restart(getExpiry(configMethods.getValues('shortBreakTimer')), configMethods.getValues('autoStartBreak'))
                // shouldAutoStart('short')
                setElapsed(0)
                setCurrentState('short')
                shouldNotify && notify(`Você acabou seu Pomodoro`, {
                    body: 'Você merece um descanso'
                })
            }
        } else {
            setCurrentState('pomodoro')
            restart(getExpiry(configMethods.getValues('pomodoroTime')), configMethods.getValues('autoStartPomodoro'))
            // shouldAutoStart('pomodoro')
            setElapsed(0)
            setCurrentCycle(prev => prev + 1)
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

    function getNextTask(tasks: ITasks[], excludeId?: string) {
        return tasks
            .filter(t => !t.complete && t.uuid !== excludeId)[0] ?? null
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
                const nextTask = getNextTask(currentTasks)

                if (nextTask) {
                    setActiveTask(nextTask)
                }
            }

            return updated;
        });
    }

    function taskItem(item: ITasks) {
        return (
            <div className={`min-w-[25vw] h-fit flex flex-row px-2 py-4 border-l-4 rounded-md justify-between items-center ${(activeTask && activeTask.uuid === item.uuid) ? 'border-card-foreground' : 'border-transparent hover:border-zinc-300'}`} onClick={() => { setActiveTask(item) }}>
                <div className="w-fit h-full flex flex-row gap-2 items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${item.complete ? 'bg-primary/20' : 'bg-muted-foreground/20'}`} onClick={(e) => { e.stopPropagation(); handleCompleteTask(item.uuid) }}>
                        <Check size={16} strokeWidth={2.5} />
                    </div>
                    <span className={`${item.complete ? 'line-through' : ''}`}>{item.title}</span>
                </div>

                <div className="flex flex-row gap-2 w-fit h-full items-center justify-center">
                    <span className="opacity-60 font-semibold text-base"><span className="text-lg!">{item.pomodorosComplete}</span>/{item.pomodoros}</span>
                    <div className=" h-fit w-fit cursor-pointer border border-border p-0.5" onClick={(e) => { e.stopPropagation(); methods.reset(item, { keepDefaultValues: true }); setTaskModal(true); setEditingTask(item) }}><EllipsisVertical /></div>
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
        }])

        handleCloseModal()
    }

    function editTask(task: ITasks) {
        if (!editingTask) return

        setCurrentTasks(prev => {
            return prev.map((each) => {
                if (each.uuid === editingTask.uuid) {
                    return {
                        ...each,
                        pomodoros: task.pomodoros,
                        pomodorosComplete: task.pomodorosComplete,
                        title: task.title
                    }
                }

                return each
            })
        })

        handleCloseModal()
    }

    const handleCloseModal = () => {
        methods.reset();
        setTaskModal(false)
        setEditingTask(null)
    }

    function handleChangeState(toState: PomodoroStateType) {
        if (toState === 'pomodoro') {
            setCurrentState('pomodoro')
            pause()
            restart(getExpiry(configMethods.getValues('pomodoroTime')), false)
            setElapsed(0)
        } else if (toState === 'long') {
            setCurrentState('long')
            pause()
            restart(getExpiry(configMethods.getValues('longBreakTimer')), false)
            setElapsed(0)
        } else {
            setCurrentState('short')
            pause()
            restart(getExpiry(configMethods.getValues('shortBreakTimer')), false)
            setElapsed(0)
        }
    }

    function handleCloseConfigModal() {
        const newDuration = () => {
            if (currentState === 'pomodoro') {
                return configMethods.getValues('pomodoroTime')
            } else if (currentState === 'short') {
                return configMethods.getValues('shortBreakTimer')
            } else {
                return configMethods.getValues('longBreakTimer')
            }
        }

        const newRemaining = getExpiry(newDuration() - (elapsed / 60))
        pause()
        restart(newRemaining, isRunning)
        setConfigModal(false)
    }

    function handleDeleteTask() {
        if (!editingTask?.uuid) return

        setCurrentTasks(prev => {
            return prev.filter((task) => task.uuid !== editingTask.uuid)
        })

        handleCloseModal()
    }

    function handleClearAllTasks() {
        const confirmed = window.confirm('Tem certeza que deseja apagar todas as tarefas?')

        if (confirmed) {
            setCurrentTasks([])
        }
    }

    function handleCompleteAllTasks() {
        const confirmed = window.confirm('Tem certeza que deseja completar todas as tarefas?')

        if (confirmed) {
            setCurrentTasks(prev => (prev.map((task) => {
                return { ...task, complete: true }
            })))
        }
    }

    function handleClearCompletedTasks() {
        const confirmed = window.confirm('Tem certeza que deseja apagar as tarefas completas?')

        if (confirmed) {
            setCurrentTasks(prev => prev.filter((task) => !task.complete))
        }

    }


    return (
        <>
            {isLoading ? (
                <div className="w-full h-full flex items-center justify-center flex-col gap-8">
                    <ScaleLoader color="var(--primary)" />
                    <span className="text-2xl font-semibold">Carregando...</span>
                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center py-4 relative">
                    <div className="absolute top-0 left-0 flex flex-row h-fit w-fit gap-2">
                        <Button variant="outline" onClick={() => setConfigModal(true)}><Cog /></Button>
                    </div>
                    <div className="xl:w-1/2 w-full h-[30vh] shrink-0 flex flex-col items-center justify-between py-4 bg-foreground/5 rounded-2xl ">
                        <div className="w-fit h-fit flex flex-row gap-4">
                            <span className={`text-lg cursor-pointer ${currentState === 'pomodoro' ? 'font-bold' : 'font-normal'}`} onClick={() => handleChangeState('pomodoro')}>Pomodoro</span>
                            <span className={`text-lg cursor-pointer ${currentState === 'short' ? 'font-bold' : 'font-normal'}`} onClick={() => handleChangeState('short')}>Intervalo curto</span>
                            <span className={`text-lg cursor-pointer ${currentState === 'long' ? 'font-bold' : 'font-normal'}`} onClick={() => handleChangeState('long')}>Intervalo longo</span>
                        </div>

                        <h1 className="text-7xl">{formatTime(totalSeconds)}</h1>
                        <div className="w-full h-fit flex flex-row gap-4 items-center justify-center relative">
                            <Button onClick={() => { isRunning ? pause() : resume() }}>{isRunning ? 'Pausar' : "Começar"}</Button>
                            <button className="border-none outline-none cursor-pointer transition-all duration-500 absolute right-[30%] bottom-1/2 translate-y-1/2" id="skipCycle" style={!isRunning ? { opacity: 0, pointerEvents: 'none' } : { opacity: 1, pointerEvents: 'auto' }} onClick={() => handleExpiry(false)}><SkipForward className="bg-background" /></button>
                        </div>
                    </div>

                    <div className="xl:w-1/2 w-full h-fit flex flex-col gap-2 items-center text-lg">
                        <span className="opacity-80">#{currentCycle}</span>
                        <span >{activeTask ? activeTask.title : currentState === 'pomodoro' ? 'Hora de focar!' : 'Hora de descansar!'}</span>
                    </div>

                    <div className="xl:w-1/2 w-full h-[50vh]  flex flex-col mt-4">
                        <div className="w-full h-fit flex flex-row justify-between ">
                            <span className="text-2xl w-[100%] border-b-2 pb-2 border-border">Tarefas</span>
                            <ActionsMenu className="w-fit mt-0 bg-background! border-border" buttonClassName='bg-background! border-border' position="bottomLeft">
                                <span className="min-w-64 flex flex-row gap-2 items-center h-fit px-4 py-2 cursor-pointer hover:bg-muted" onClick={() => handleClearCompletedTasks()}>
                                    <Trash2 />
                                    Limpar tarefas finalizadas
                                </span>
                                <span className="min-w-64 flex flex-row gap-2 items-center h-fit px-4 py-2 cursor-pointer hover:bg-muted" onClick={() => handleCompleteAllTasks()}>
                                    <Check />
                                    Completar todas as tarefas
                                </span>
                                <span className="min-w-64 flex flex-row gap-2 items-center h-fit px-4 py-2 cursor-pointer hover:bg-muted" onClick={() => handleClearAllTasks()}>
                                    <Trash2 />
                                    Limpar todas as tarefas
                                </span>
                            </ActionsMenu>
                        </div>
                        <DragTaskComponent changeValue={setCurrentTasks} value={currentTasks} itemTemplate={taskItem} dragAndDrop showArrows={false} />
                        <div onClick={() => setTaskModal(true)} className="w-full h-fit shrink-0 py-2! border-3 border-dashed border-border flex flex-row items-center justify-center gap-4 cursor-pointer transition-colors hover:bg-primary/5 hover:border-primary/20">
                            <Plus className="cursor-pointer" size={28} />
                            <span>Adicionar nova tarefa</span>
                        </div>
                    </div>
                </div>
            )}

            <Modal title="" isOpen={taskModal} onClose={handleCloseModal} openWidth='fit-content' className="bg-background border border-border">
                <form className="flex flex-col gap-4 justify-center" onSubmit={methods.handleSubmit(editingTask?.uuid ? editTask : saveTask)}>
                    <label htmlFor="title" className="flex flex-col gap-2">
                        <input id="title" {...methods.register('title')} autoFocus placeholder="Título da tarefa" className="text-2xl outline-none w-[30vw] font-semibold" required />
                    </label>

                    <div className="flex flex-row gap-4">
                        {editingTask?.uuid && (
                            <label htmlFor="pomodoros" className="flex flex-col gap-4 justify-center select-none">
                                <span className="opacity-80 text-lg font-medium">Pomodoros completos</span>
                                <div className="flex flex-row gap-2 items-center">
                                    <input id="pomodoros" {...methods.register('pomodorosComplete')} type="number" min={0} step={1} className="inputNumber w-24 h-12 text-2xl px-1 outline-none bg-foreground/10 rounded-md" />
                                </div>
                            </label>
                        )}

                        <label htmlFor="pomodoros" className="flex flex-col gap-4 justify-center select-none">
                            <span className="opacity-80 text-lg font-medium">Pomodoros estimados</span>
                            <div className="flex flex-row gap-2 items-center">
                                <input id="pomodoros" {...methods.register('pomodoros')} type="number" min={1} step={1} className="inputNumber w-24 h-12 text-2xl px-1 outline-none bg-foreground/10 rounded-md" />
                                <div className="bg-muted p-2 rounded-md flex items-center justify-center cursor-pointer" onClick={() => methods.setValue('pomodoros', Number(methods.getValues('pomodoros')) + 1)}>
                                    <ChevronUp size={32} strokeWidth={1.5} />
                                </div>
                                <div className="bg-muted p-2 rounded-md flex items-center justify-center cursor-pointer" onClick={() => methods.setValue('pomodoros', Number(methods.getValues('pomodoros')) > 0 ? Number(methods.getValues('pomodoros')) - 1 : 0)}>
                                    <ChevronDown size={32} strokeWidth={1.5} />
                                </div>
                            </div>
                        </label>
                    </div>

                    <div className="w-full h-fit flex flex-row gap-4 justify-between items-center">
                        {editingTask?.uuid && (
                            <div className="cursor-pointer" onClick={() => handleDeleteTask()}>
                                <Trash2 />
                            </div>
                        )}
                        <div className="w-full justify-end h-fit flex flex-row gap-4 items-center">
                            <Button variant="outline" onClick={handleCloseModal}>Cancelar</Button>
                            <Button variant="primary" type="submit">Salvar</Button>
                        </div>
                    </div>
                </form>
            </Modal>

            <Modal title="Configurações" isOpen={configModal} onClose={() => handleCloseConfigModal()} openHeight="fit-content" className="bg-background border border-border w-[100vw]! sm:w-[70vw]! md:w-[55vw]! lg:w-[40vw]! xl:w-[30vw]!">
                <div className="w-full h-fit flex flex-col gap-4 py-4 border-b border-border">
                    <div className="flex flex-row gap-2 w-fit h-fit font-medium"><Clock /> Timer</div>
                    <div className="grid grid-cols-3 gap-2 w-fit h-fit">
                        <label>
                            <span className="opacity-80 text-base font-medium">Pomodoro</span>
                            <input className="bg-foreground/10 rounded-md w-full h-12 border-none outline-none" type="number" min={0} step={1} {...configMethods.register('pomodoroTime')} />
                        </label>

                        <label>
                            <span className="opacity-80 text-base font-medium">Intervalo curto</span>
                            <input className="bg-foreground/10 rounded-md w-full h-12 border-none outline-none" type="number" min={0} step={1} {...configMethods.register('shortBreakTimer')} />
                        </label>

                        <label>
                            <span className="opacity-80 text-base font-medium">Intervalo Longo</span>
                            <input className="bg-foreground/10 rounded-md w-full h-12 border-none outline-none" type="number" min={0} step={1} {...configMethods.register('longBreakTimer')} />
                        </label>
                    </div>
                    <label className="w-full h-fit flex flex-row justify-between">
                        <span className="opacity-80 text-base font-medium">Começar pausa automaticamente</span>
                        <InputSwitch checked={configMethods.watch('autoStartBreak')} onChangeChecked={(e) => configMethods.setValue('autoStartBreak', e, { shouldDirty: true })} />
                    </label>

                    <label className="w-full h-fit flex flex-row justify-between">
                        <span className="opacity-80 text-base font-medium">Começar pomodoros automaticamente</span>
                        <InputSwitch checked={configMethods.watch('autoStartPomodoro')} onChangeChecked={(e) => configMethods.setValue('autoStartPomodoro', e, { shouldDirty: true })} />
                    </label>

                    <label className="w-full h-fit flex flex-row justify-between">
                        <span className="opacity-80 text-base font-medium">Intervalo de descanso longo</span>
                        <input className="bg-foreground/10 rounded-md w-24 h-12 border-none outline-none" type="number" min={1} step={1} {...configMethods.register('longInterval')} />
                    </label>
                </div>

                <div className="w-full h-fit flex flex-col gap-4 py-4">
                    <div className="flex flex-row gap-2 w-fit h-fit font-medium"><ListTodo /> Tarefas</div>
                    <label className="w-full h-fit flex flex-row justify-between">
                        <div className="flex flex-row gap-2">
                            <span className="opacity-80 text-base font-medium">Completar tarefas automaticamente</span>
                            <HelpCircle className="cursor-pointer" onClick={() => alert('Se você ativar "Completar tarefas automaticamente", a tarefa ativa será automaticamente marcada como concluída quando o número real de pomodoros atingir o número estimado.')} />
                        </div>
                        <InputSwitch checked={configMethods.watch('autoCompleteTask')} onChangeChecked={(e) => configMethods.setValue('autoCompleteTask', e, { shouldDirty: true })} />
                    </label>

                    <label className="w-full h-fit flex flex-row justify-between">
                        <div className="flex flex-row gap-2">
                            <span className="opacity-80 text-base font-medium">Mover completas para o final</span>
                            <HelpCircle className="cursor-pointer" onClick={() => alert('Se você ativar "Mover completas para o final", a tarefa concluída será automaticamente movida para o final da lista de tarefas.')} />
                        </div>
                        <InputSwitch checked={configMethods.watch('moveCompleteToBottom')} onChangeChecked={(e) => configMethods.setValue('moveCompleteToBottom', e, { shouldDirty: true })} />
                    </label>


                </div>


            </Modal>
        </>
    )
}