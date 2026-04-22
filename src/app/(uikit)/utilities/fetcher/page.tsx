'use client'

import DropdownUtilities from "@/components/dropdownUtilities"
import { Button } from "@/uiKit/components/button/button"
import Modal from "@/uiKit/components/modal/modal"
import { Cookie, FilePlus, Plus, PlusCircle, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

interface IRequest {
    method: string,
    url: string,
    body: string,
    createdAt: Date,
    uuid: string,
    name: string
}

interface IEnvVariable {
    name: string,
    value: string,
    active: boolean,
    uuid: string,
}

interface ICookies {
    key: string,
    value: string,
    domain: string,
    path: string,
    expires: string,
    secure: boolean,
    hostOnly: boolean,
    httpOnly: boolean,
    uuid: string
}

interface ICollection {
    name: string,
    createdAt: Date,
    requests: Array<IRequest>,
    uuid: string,
    envVariable?: Array<IEnvVariable>,
    cookies?: Array<ICookies>
}

export default function Fetcher() {
    const [currentCollection, setCurrentCollection] = useState<ICollection | null>(null)
    const [newCollectionModal, setNewCollectionModal] = useState(false)
    const [requestSearch, setRequestSearch] = useState('')
    const [collections, setCollections] = useState<Array<ICollection>>([])
    const [currentRequest, setCurrentRequest] = useState<null | IRequest>(null)
    const [envsModal, setEnvsModal] = useState(false)
    const [deleteAllEnvsModal, setDeleteAllEnvsModal] = useState(false)
    const [cookiesModal, setCookiesModal] = useState(false)
    const [currentEditingCookie, setCurrentEditingCookie] = useState<null | ICookies>(null)
    const [deleteAllCookiesModal, setDeleteAllCookiesModal] = useState(false)


    useEffect(() => {
        const collections = localStorage.getItem('fouikit-fetcher-collections')

        if (collections) {
            setCollections(JSON.parse(collections))
        }
    }, [])

    function handleNewCollection(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const collections = localStorage.getItem('fouikit-fetcher-collections')

        const formData = new FormData(e.currentTarget)
        const name = formData.get("collectionName")

        if (!name) {
            toast.error('Informe um nome')

            return
        }

        if (collections) {
            const parsed: Array<ICollection> = JSON.parse(collections)
            const newCollection = {
                createdAt: new Date(),
                name: name as string,
                requests: [],
                uuid: crypto.randomUUID()
            }
            parsed.push(newCollection)
            setCurrentCollection(newCollection)
            localStorage.setItem('fouikit-fetcher-collections', JSON.stringify(parsed))
            setCollections(parsed)
        } else {
            const newCollection: Array<ICollection> = [{
                createdAt: new Date(),
                name: name as string,
                requests: [],
                uuid: crypto.randomUUID()
            }]
            localStorage.setItem('fouikit-fetcher-collections', JSON.stringify(newCollection))
            setCollections(newCollection)
            setCurrentCollection(newCollection[0])
        }

        setNewCollectionModal(false)
    }

    function handleAddNewRequest() {
        if (!currentCollection) {
            toast.info("Selecione uma coleção!")
            return
        }

        setCurrentCollection(prev => {
            if (!prev) return null
            const newRequest: IRequest = { body: '', createdAt: new Date(), method: 'GET', url: '', uuid: crypto.randomUUID(), name: 'New Request' }
            const updated = { ...prev, requests: [...prev.requests, newRequest] }
            updateStorage(updated)

            return updated
        })
    }

    function handleAddNewEnv() {
        setCurrentCollection(prev => {
            if (!prev) return null
            alert('2')
            const newEnv: IEnvVariable = { active: true, name: '', uuid: crypto.randomUUID(), value: '' }
            const updated: ICollection = { ...prev, envVariable: [...(prev.envVariable ?? []), newEnv] }
            updateStorage(updated)
            return updated
        })
    }

    function updateStorage(updatedValue: ICollection) {
        const localCollections = localStorage.getItem('fouikit-fetcher-collections')
        const parsed: Array<ICollection> = JSON.parse(localCollections!)

        const index = parsed.findIndex((each) => each.uuid === updatedValue.uuid)

        if (index > -1) {
            parsed[index] = updatedValue
        }

        localStorage.setItem('fouikit-fetcher-collections', JSON.stringify(parsed))
    }

    function updateEnv(uuid: string, field: keyof IEnvVariable, value: string | boolean) {
        setCurrentCollection(prev => {
            if (!prev) return null
            return { ...prev, envVariable: prev.envVariable?.map(env => env.uuid === uuid ? { ...env, [field]: value } : env) }
        })
    }

    function updateCookie(field: keyof ICookies, value: string | boolean) {
        setCurrentEditingCookie(prev => {
            if (!prev) return null
            return { ...prev, [field]: value }
        })
    }

    function handleCloseCookieEdit() {
        setCurrentCollection(prev => {
            if (!prev || !currentEditingCookie) return prev
            const updated = { ...prev, cookies: prev.cookies?.map(c => c.uuid === currentEditingCookie.uuid ? currentEditingCookie : c) }
            updateStorage(updated)
            return updated
        })
        setCurrentEditingCookie(null)
    }

    function handleCloseEnvs() {
        if (currentCollection) updateStorage(currentCollection)
        setEnvsModal(false)
    }

    function handleCloseCookies() {
        if (currentCollection) updateStorage(currentCollection)
        setCookiesModal(false)
    }

    function handleRemoveEnv(uuid: string) {
        setCurrentCollection(prev => {
            if (!prev) return null
            return { ...prev, envVariable: prev.envVariable?.filter(env => env.uuid !== uuid) }
        })
    }
    function handleRemoveCookie(uuid: string) {
        setCurrentCollection(prev => {
            if (!prev) return null
            return { ...prev, cookies: prev.cookies?.filter(cookie => cookie.uuid !== uuid) }
        })
    }

    function handleDeleteAllEnvs() {
        setCurrentCollection(prev => {
            if (!prev) return null
            return { ...prev, envVariable: [] }
        })
        setDeleteAllEnvsModal(false)
    }

    function handleDeleteAllCookies() {
        setCurrentCollection(prev => {
            if (!prev) return null
            return { ...prev, cookies: [] }
        })
        setDeleteAllCookiesModal(false)
    }

    function formatKeyValue(key?: string, value?: string): string {
        if (key && value) return `${key}=${value}`
        if (value) return value
        if (key) return `${key}=`
        return ''
    }

    function handleAddNewCookie(){
        setCurrentCollection(prev => {
            if (!prev) return null
            return { ...prev, cookies: [...prev.cookies ?? [] , {domain:'domain.com', expires:String(new Date()), hostOnly:false, httpOnly:false, key:'foo',value:'bar',path:'/',secure:false,uuid:crypto.randomUUID()}] }
        })
    }

    return (
        <>
            <div className="w-full h-full flex flex-row overflow-auto">
                <div className="w-[20%] h-full border border-green-400 flex flex-col px-2 gap-4">
                    <div className="flex flex-row gap-2 w-full h-fit justify-between items-center border-b-2 border-border py-2">
                        <select name="collections" id="fectherCollection" value={currentCollection?.name ?? 'optionCollectionDisable'} onChange={(e) => { setCurrentCollection(collections.find(c => c.name === e.target.value) ?? null); setCurrentRequest(null) }}>
                            <option value="optionCollectionDisable" disabled>Selecione uma coleção</option>
                            {collections.sort((a, b) => a.name.localeCompare(b.name)).map((collection) => (
                                <option key={collection.uuid} value={collection.name}>{collection.name}</option>
                            ))}
                        </select>
                        <div className="flex flex-row gap-2 w-fit h-full cursor-pointer items-center" onClick={() => setNewCollectionModal(true)}>
                            <Plus />
                            Nova
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 items-center border-b-2 border-border pb-2">
                        <span className="w-full h-fit flex flex-row gap-2 cursor-pointer" onClick={() => setEnvsModal(true)}>
                            <FilePlus />
                            Variáveis de ambiente
                        </span>

                        <span className="w-full h-fit flex flex-row gap-2 cursor-pointer" onClick={() => setCookiesModal(true)}>
                            <Cookie />
                            Gerenciar cookies
                        </span>
                    </div>

                    <div className="flex flex-row w-full h-fit items-center gap-4">
                        <input className="w-full h-8 border border-border px-2 outline-none" placeholder="Pesquisa" value={requestSearch} onChange={(e) => setRequestSearch(e.target.value)} />
                        <PlusCircle fill="var(--foreground)" className="cursor-pointer text-background" onClick={() => handleAddNewRequest()} />
                    </div>

                    <div className="flex flex-col gap-2 h-full w-full  overflow-y-auto">
                        {currentCollection?.requests.map((request, index) => (
                            <div className={`w-full h-fit flex flex-row py-2 gap-2 border-l-3 items-center cursor-pointer ${(currentRequest && currentRequest?.uuid === request.uuid) ? 'border-primary' : 'border-transparent'}`} key={index} onClick={() => setCurrentRequest(request)}>
                                <div className=" w-fit h-fit flex items-center justify-center px-2 py-1 text-xs!"><span>{request.method}</span></div>
                                <span>{request.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-[50%] h-full border border-yellow-400">

                </div>

                <div className="w-[30%] h-full border border-pink-400">

                </div>

            </div>

            <Modal title="Criar nova coleção de requisições" isOpen={newCollectionModal} className="bg-background border-border">
                <form onSubmit={(e) => handleNewCollection(e)}>
                    <label htmlFor="collectionName" className="flex flex-col gap-4">
                        <span>Nome</span>
                        <input className="w-full h-12 border border-border px-2 outline-none" placeholder="Nome da coleção" name="collectionName" id="collectionName" />
                    </label>

                    <div className="w-full h-fit flex flex-row gap-4 justify-end mt-4">
                        <Button variant="ghost" onClick={() => setNewCollectionModal(false)}>Cancelar</Button>
                        <Button variant="primary" type="submit">Salvar</Button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={envsModal} title="Gerenciar variáveis de ambiente" onClose={() => handleCloseEnvs()} openHeight="90vh" openWidth="90vw" className="bg-background border border-border">
                <div className="flex flex-row w-full h-fit gap-8">
                    <span className="cursor-pointer text-sm! w-fit h-fit flex flex-row gap-2 items-center" onClick={() => handleAddNewEnv()}><Plus /> Adicionar</span>
                    <span className="cursor-pointer text-sm! w-fit h-fit flex flex-row gap-2 items-center" onClick={() => setDeleteAllEnvsModal(true)}><Trash2 /> Deletar todas</span>
                </div>

                <form className="w-full h-full flex flex-col gap-2 overflow-y-auto mt-4">
                    {currentCollection?.envVariable?.map((env) => (
                        <div className={`w-full h-fit flex flex-row border gap-4 items-center ${env.active ? 'opacity-100' : 'opacity-50'} `} key={env.uuid}>
                            <input className="px-2 outline-none w-full h-10" value={env.name} onChange={(e) => updateEnv(env.uuid, 'name', e.target.value)} placeholder="Nome" />
                            <input className="px-2 outline-none w-full h-10" value={env.value} onChange={(e) => updateEnv(env.uuid, 'value', e.target.value)} placeholder="Valor" />
                            <div className="w-fit flex flex-row gap-4">
                                <input className="w-5 h-5 cursor-pointer" type="checkbox" checked={env.active} onChange={(e) => updateEnv(env.uuid, 'active', e.target.checked)} />
                                <Trash2 className="w-5 h-5 cursor-pointer" onClick={() => handleRemoveEnv(env.uuid)} />
                            </div>
                        </div>
                    ))}
                </form>
            </Modal>

            <Modal isOpen={deleteAllEnvsModal} title="Deletar todas as variáveis dessa coleção" className="bg-background border border-border" onClose={() => setDeleteAllEnvsModal(false)}>
                <span>Você tem certeza que deseja deletar todas as variáveis dessa coleção?</span>

                <div className="w-full h-fit flex flex-row gap-4 justify-end items-center">
                    <Button variant="outline" onClick={() => setDeleteAllEnvsModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={() => handleDeleteAllEnvs()}>Deletar</Button>
                </div>
            </Modal>

            <Modal isOpen={cookiesModal} title="Gerenciar cookies" onClose={() => handleCloseCookies()} openHeight="90vh" openWidth="90vw" className="bg-background border border-border">
                <div className="flex flex-row w-full h-fit gap-8">
                    <span className="cursor-pointer text-sm! w-fit h-fit flex flex-row gap-2 items-center" onClick={() => handleAddNewCookie()}><Plus /> Adicionar</span>
                    <span className="cursor-pointer text-sm! w-fit h-fit flex flex-row gap-2 items-center" onClick={() => setDeleteAllCookiesModal(true)}><Trash2 /> Deletar todos</span>
                </div>

                {/* onChange={(e) => updateCookie(cookie.uuid, 'key', e.target.value)} */}
                <form className="w-full h-full flex flex-col gap-2 overflow-y-auto mt-4">
                    {currentCollection?.cookies?.map((cookie) => (
                        <div className={`w-full h-fit flex flex-row border gap-4 items-center `} key={cookie.uuid}>
                            <span className="px-2 outline-none w-[30%] h-10 flex items-center">{cookie.domain}</span>
                            <span className="px-2 outline-none w-[60%] h-10 flex items-center">{formatKeyValue(cookie.key, cookie.value)}{cookie.path ? `; ${formatKeyValue('expires', cookie.expires.toString().split(' (')[0])}` : ''}{cookie.domain ? `; ${formatKeyValue('domain', cookie.domain)}` : ''}{cookie.path ? `; ${formatKeyValue('path', cookie.path)}` : ''}{cookie.hostOnly ? `; hostOnly` : ''}{cookie.httpOnly ? `; httpOnly` : ''}{cookie.secure ? `; Secure` : ''}</span>
                            <div className="w-fit flex flex-row gap-4">
                                <span className="cursor-pointer text-sm!" onClick={() => setCurrentEditingCookie(cookie)}>Editar</span>
                                <Trash2 className="w-5 h-5 cursor-pointer" onClick={() => handleRemoveCookie(cookie.uuid)} />
                            </div>
                        </div>
                    ))}
                </form>
            </Modal>

            <Modal isOpen={!!currentEditingCookie} title="Editar cookie" onClose={handleCloseCookieEdit} openHeight="fit-content" openWidth="40vw" className="bg-background border border-border">
                <form className="w-full h-full grid grid-cols-2 gap-2 overflow-y-auto mt-4">
                    <label htmlFor="key">
                        Chave
                        <input id="key" className="px-2 outline-none w-full h-10 border border-border" value={currentEditingCookie?.key} onChange={(e) => updateCookie('key', e.target.value)} placeholder="Chave" />
                    </label>
                    <label htmlFor="value">
                        Valor
                        <input id="value" className="px-2 outline-none w-full h-10 border border-border" value={currentEditingCookie?.value} onChange={(e) => updateCookie('value', e.target.value)} placeholder="Valor" />
                    </label>

                    <label htmlFor="domain">
                        Domínio
                        <input id="domain" className="px-2 outline-none w-full h-10 border border-border" value={currentEditingCookie?.domain} onChange={(e) => updateCookie('domain', e.target.value)} placeholder="domain.com" />
                    </label>

                    <label htmlFor="Path">
                        Caminho
                        <input id="Path" className="px-2 outline-none w-full h-10 border border-border" value={currentEditingCookie?.path} onChange={(e) => updateCookie('path', e.target.value)} placeholder="/" />
                    </label>

                    <label htmlFor="expires" className="col-span-2">
                        Expira em
                        <input id="expires" type="datetime-local" className="px-2 outline-none w-full h-10  border border-border" value={currentEditingCookie?.expires} onChange={(e) => updateCookie('expires', e.target.value)} placeholder="/" />
                    </label>
                    <label className="flex flex-row gap-4 items-center mt-2" htmlFor="secure">
                        Seguro
                        <input id="secure" type="checkbox" className="w-5 h-5 cursor-pointer" checked={currentEditingCookie?.secure} onChange={(e) => updateCookie('secure', e.target.checked)} />
                    </label>
                    <label className="flex flex-row gap-4 items-center" htmlFor="httpOnly">
                        HttpOnly
                        <input id="httpOnly" type="checkbox" className="w-5 h-5 cursor-pointer" checked={currentEditingCookie?.httpOnly} onChange={(e) => updateCookie('httpOnly', e.target.checked)} />
                    </label>

                    <label className="flex flex-row gap-4 items-center mt-2" htmlFor="hostOnly">
                        HostOnly
                        <input id="hostOnly" type="checkbox" className="w-5 h-5 cursor-pointer" checked={currentEditingCookie?.hostOnly} onChange={(e) => updateCookie('hostOnly', e.target.checked)} />
                    </label>
                </form>
            </Modal>

            <Modal isOpen={deleteAllCookiesModal} title="Deletar todos os cookies dessa coleção" className="bg-background border border-border" onClose={() => setDeleteAllCookiesModal(false)}>
                <span>Você tem certeza que deseja deletar todos os cookies dessa coleção?</span>

                <div className="w-full h-fit flex flex-row gap-4 justify-end items-center">
                    <Button variant="outline" onClick={() => setDeleteAllCookiesModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={() => handleDeleteAllCookies()}>Deletar</Button>
                </div>
            </Modal>
        </>
    )
}