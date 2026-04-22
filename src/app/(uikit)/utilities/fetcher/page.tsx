'use client'

import ActionsMenu from "@/uiKit/components/actionsMenu/actionsMenu"
import { Button } from "@/uiKit/components/button/button"
import Modal from "@/uiKit/components/modal/modal"
import { Cookie, FilePlus, Plus, PlusCircle, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import FetcherTabContent, { IAuth, BodyType, IFormDataField } from "./FetcherTabContent"
import { div } from "framer-motion/client"
import { ClipLoader } from "@/uiKit/loaders/clipLoader/clipLoader"
import { DotLoader } from "@/uiKit/loaders/dotLoader/dotLoader"

interface IParams {
    key: string,
    value: string,
    active: boolean,
    uuid: string
}

interface IHeaders {
    key: string,
    value: string,
    active: boolean,
    uuid: string
}

interface IResponse {
    status: string,
    delay: string,
    size: string,
    data: string,
    headers: Array<Pick<IHeaders, 'key' | 'value'>>
    cookies: Array<Omit<ICookies, 'uuid'>>
}

interface IRequest {
    method: string,
    url: string,
    body: string,
    bodyType?: BodyType,
    bodyFormData?: Array<IFormDataField>,
    createdAt: Date,
    uuid: string,
    name: string
    params?: Array<IParams>,
    headers?: Array<IHeaders>,
    auth?: IAuth,
    response?: IResponse
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

interface IMethods {
    method: string,
    color: string
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
    const [deleteAllParamsModal, setDeleteAllParamsModal] = useState(false)
    const [deleteAllHeadersModal, setDeleteAllHeadersModal] = useState(false)
    const [activeTab, setActiveTab] = useState<'params' | 'body' | 'auth' | 'headers'>('params')
    const [renameRequestModal, setRenameRequestModal] = useState(false)
    const [editingRequestName, setEditingRequestName] = useState('')
    const [activeResponseTab, setActiveResponseTab] = useState<'preview' | 'headers' | 'cookies'>('preview')
    const [isSending, setIsSending] = useState(false)


    const AVAILABLEMETHODS: Array<IMethods> = [
        { method: 'GET', color: 'purple' },
        { method: 'POST', color: 'green' },
        { method: 'PUT', color: 'orange' },
        { method: 'PATCH', color: '#cccf1a' },
        { method: 'DELETE', color: 'red' },
        { method: 'OPTIONS', color: '#0fc7fa' },
        { method: 'HEAD', color: '#0fc7fa' },
    ]


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
            const newRequest: IRequest = { body: '', bodyType: 'none', bodyFormData: [], createdAt: new Date(), method: 'GET', url: '', uuid: crypto.randomUUID(), name: 'New Request' }
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

    function syncRequest(updatedRequest: IRequest) {
        if (!currentCollection) return
        const updatedCollection = {
            ...currentCollection,
            requests: currentCollection.requests.map(r => r.uuid === updatedRequest.uuid ? updatedRequest : r)
        }
        setCurrentCollection(updatedCollection)
        updateStorage(updatedCollection)
    }

    function handleAddParam() {
        if (!currentRequest) return
        const newParam: IParams = { key: '', value: '', active: true, uuid: crypto.randomUUID() }
        const updated = { ...currentRequest, params: [...(currentRequest.params ?? []), newParam] }
        setCurrentRequest(updated)
        syncRequest(updated)
    }

    function handleRemoveParam(uuid: string) {
        if (!currentRequest) return
        const updated = { ...currentRequest, params: currentRequest.params?.filter(p => p.uuid !== uuid) ?? [] }
        setCurrentRequest(updated)
        syncRequest(updated)
    }

    function handleRemoveAllParams() {
        if (!currentRequest) return
        const updated = { ...currentRequest, params: [] }
        setCurrentRequest(updated)
        syncRequest(updated)
    }

    function handleToggleParam(uuid: string) {
        if (!currentRequest) return
        const updated = { ...currentRequest, params: currentRequest.params?.map(p => p.uuid === uuid ? { ...p, active: !p.active } : p) ?? [] }
        setCurrentRequest(updated)
        syncRequest(updated)
    }

    function handleUpdateParam(uuid: string, field: 'key' | 'value', value: string) {
        setCurrentRequest(prev => {
            if (!prev) return null
            return { ...prev, params: prev.params?.map(p => p.uuid === uuid ? { ...p, [field]: value } : p) ?? [] }
        })
    }

    function handleUpdateAuth(auth: IAuth) {
        if (!currentRequest) return
        const updated = { ...currentRequest, auth }
        setCurrentRequest(updated)
        syncRequest(updated)
    }

    function handleAddHeader() {
        if (!currentRequest) return
        const newHeader: IHeaders = { key: '', value: '', active: true, uuid: crypto.randomUUID() }
        const updated = { ...currentRequest, headers: [...(currentRequest.headers ?? []), newHeader] }
        setCurrentRequest(updated)
        syncRequest(updated)
    }

    function handleRemoveHeader(uuid: string) {
        if (!currentRequest) return
        const updated = { ...currentRequest, headers: currentRequest.headers?.filter(h => h.uuid !== uuid) ?? [] }
        setCurrentRequest(updated)
        syncRequest(updated)
    }

    function handleRemoveAllHeaders() {
        if (!currentRequest) return
        const updated = { ...currentRequest, headers: [] }
        setCurrentRequest(updated)
        syncRequest(updated)
    }

    function handleToggleHeader(uuid: string) {
        if (!currentRequest) return
        const updated = { ...currentRequest, headers: currentRequest.headers?.map(h => h.uuid === uuid ? { ...h, active: !h.active } : h) ?? [] }
        setCurrentRequest(updated)
        syncRequest(updated)
    }

    function handleUpdateHeader(uuid: string, field: 'key' | 'value', value: string) {
        setCurrentRequest(prev => {
            if (!prev) return null
            return { ...prev, headers: prev.headers?.map(h => h.uuid === uuid ? { ...h, [field]: value } : h) ?? [] }
        })
    }

    function handleSaveHeaders() {
        if (!currentRequest || !currentCollection) return
        const updatedCollection = {
            ...currentCollection,
            requests: currentCollection.requests.map(r => r.uuid === currentRequest.uuid ? currentRequest : r)
        }
        setCurrentCollection(updatedCollection)
        updateStorage(updatedCollection)
    }

    function handleSaveParams() {
        if (!currentRequest || !currentCollection) return
        const updatedCollection = {
            ...currentCollection,
            requests: currentCollection.requests.map(r => r.uuid === currentRequest.uuid ? currentRequest : r)
        }
        setCurrentCollection(updatedCollection)
        updateStorage(updatedCollection)
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

    function handleAddNewCookie() {
        setCurrentCollection(prev => {
            if (!prev) return null
            return { ...prev, cookies: [...prev.cookies ?? [], { domain: 'domain.com', expires: String(new Date()), hostOnly: false, httpOnly: false, key: 'foo', value: 'bar', path: '/', secure: false, uuid: crypto.randomUUID() }] }
        })
    }

    function handleUrlBlur() {
        if (!currentRequest || !currentCollection) return
        const updatedCollection = {
            ...currentCollection,
            requests: currentCollection.requests.map(r => r.uuid === currentRequest.uuid ? currentRequest : r)
        }
        setCurrentCollection(updatedCollection)
        updateStorage(updatedCollection)
    }

    function handleBodyTypeChange(bodyType: BodyType) {
        if (!currentRequest) return
        const updated = { ...currentRequest, bodyType, body: '', bodyFormData: [] }
        setCurrentRequest(updated)
        syncRequest(updated)
    }

    function handleBodyFormDataChange(bodyFormData: Array<IFormDataField>) {
        if (!currentRequest) return
        const updated = { ...currentRequest, bodyFormData }
        setCurrentRequest(updated)
        syncRequest(updated)
    }

    function handleBodySave() {
        if (!currentRequest) return
        syncRequest(currentRequest)
    }

    function handleRenameRequest(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!currentRequest || !editingRequestName.trim()) return
        const updated = { ...currentRequest, name: editingRequestName.trim() }
        setCurrentRequest(updated)
        syncRequest(updated)
        setRenameRequestModal(false)
    }

    function resolveEnvVars(value: string): string {
        if (!currentCollection?.envVariable) return value
        return value.replace(/\{\{(\w+)\}\}/g, (_, name) => {
            const env = currentCollection.envVariable?.find(e => e.name === name && e.active)
            return env?.value ?? `{{${name}}}`
        })
    }

    async function handleSendRequest() {
        if (!currentRequest) return

        let url = resolveEnvVars(currentRequest.url)

        const activeParams = (currentRequest.params ?? []).filter(p => p.active && p.key)
        if (currentRequest.auth?.type === 'apikey' && currentRequest.auth.addTo === 'query') {
            activeParams.push({ key: currentRequest.auth.key, value: currentRequest.auth.value, active: true, uuid: '' })
        }
        if (activeParams.length) {
            const base = url.split('?')[0]
            const qs = activeParams.map(p => `${encodeURIComponent(p.key)}=${encodeURIComponent(resolveEnvVars(p.value))}`).join('&')
            url = `${base}?${qs}`
        }

        const headersObj: Record<string, string> = {}
        for (const h of (currentRequest.headers ?? []).filter(h => h.active && h.key)) {
            headersObj[resolveEnvVars(h.key)] = resolveEnvVars(h.value)
        }

        const auth = currentRequest.auth
        if (auth?.active && auth.type !== 'none') {
            if (auth.type === 'apikey' && auth.addTo === 'header') {
                headersObj[auth.key] = auth.value
            } else if (auth.type === 'bearer') {
                headersObj['Authorization'] = `${auth.prefix} ${auth.token}`
            } else if (auth.type === 'basic') {
                headersObj['Authorization'] = `Basic ${btoa(`${auth.username}:${auth.password}`)}`
            } else if (auth.type === 'digest') {
                headersObj['Authorization'] = `Digest username="${auth.username}"`
            } else if (auth.type === 'ntlm') {
                headersObj['Authorization'] = `NTLM`
            }
        }

        let body: BodyInit | null = null
        const canHaveBody = currentRequest.method !== 'GET' && currentRequest.method !== 'HEAD'
        if (canHaveBody && currentRequest.bodyType !== 'none') {
            if (currentRequest.bodyType === 'json') {
                headersObj['Content-Type'] = 'application/json'
                body = currentRequest.body
            } else if (currentRequest.bodyType === 'xml') {
                headersObj['Content-Type'] = 'application/xml'
                body = currentRequest.body
            } else if (currentRequest.bodyType === 'yaml') {
                headersObj['Content-Type'] = 'application/x-yaml'
                body = currentRequest.body
            } else if (currentRequest.bodyType === 'edn') {
                headersObj['Content-Type'] = 'application/edn'
                body = currentRequest.body
            } else if (currentRequest.bodyType === 'text') {
                headersObj['Content-Type'] = 'text/plain'
                body = currentRequest.body
            } else if (currentRequest.bodyType === 'formdata') {
                const formData = new FormData()
                for (const field of (currentRequest.bodyFormData ?? []).filter(f => f.active && f.key)) {
                    formData.append(field.key, field.value)
                }
                body = formData
            }
        }

        const formDataEntries = currentRequest.bodyType === 'formdata'
            ? (currentRequest.bodyFormData ?? []).filter(f => f.active && f.key).map(f => ({ key: f.key, value: f.value }))
            : undefined

        try {
            setIsSending(true)
            const startTime = Date.now()
            const proxyRes = await fetch('/api/proxy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url,
                    method: currentRequest.method,
                    headers: headersObj,
                    body: formDataEntries ? undefined : (body as string | null),
                    formDataEntries,
                }),
            })
            const delay = Date.now() - startTime
            const proxyData = await proxyRes.json()

            if (proxyData.error) {
                toast.error(proxyData.error)
            }

            const responseHeaders: Array<Pick<IHeaders, 'key' | 'value'>> = Object.entries(proxyData.headers as Record<string, string>).map(([key, value]) => ({ key, value }))

            const responseCookies: Array<Omit<ICookies, 'uuid'>> = (proxyData.setCookies as string[]).map(raw => {
                const [keyValue, ...attrs] = raw.split(';').map(p => p.trim())
                const eqIdx = keyValue.indexOf('=')
                const cookie: Omit<ICookies, 'uuid'> = {
                    key: keyValue.slice(0, eqIdx).trim(),
                    value: keyValue.slice(eqIdx + 1).trim(),
                    domain: '', path: '/', expires: '', secure: false, hostOnly: false, httpOnly: false,
                }
                for (const attr of attrs) {
                    const [k, ...vParts] = attr.split('=')
                    const v = vParts.join('=').trim()
                    const kl = k.trim().toLowerCase()
                    if (kl === 'domain') cookie.domain = v
                    else if (kl === 'path') cookie.path = v
                    else if (kl === 'expires') cookie.expires = v
                    else if (kl === 'secure') cookie.secure = true
                    else if (kl === 'httponly') cookie.httpOnly = true
                    else if (kl === 'hostonly') cookie.hostOnly = true
                }
                return cookie
            })

            const text: string = proxyData.body
            const size = new Blob([text]).size
            const sizeStr = size >= 1024 ? `${(size / 1024).toFixed(2)} KB` : `${size} B`

            const response: IResponse = {
                status: `${proxyData.status} ${proxyData.statusText}`,
                delay: `${delay} ms`,
                size: sizeStr,
                data: text,
                headers: responseHeaders,
                cookies: responseCookies,
            }
            const updated = { ...currentRequest, response }
            setCurrentRequest(updated)
            syncRequest(updated)
        } catch (err) {
            console.error('Fetch error:', err)
            // toast.error('Erro ao enviar requisição')
        } finally {
            setIsSending(false)
        }
    }

    function handleChangeMethods(newMethod: IMethods['method']) {
        setCurrentRequest(prev => {
            if (!prev) return null
            const updated = { ...prev, method: newMethod }

            setCurrentCollection(prevCollection => {
                if (!prevCollection) return null
                const updatedCollection = {
                    ...prevCollection,
                    requests: prevCollection.requests.map(r => r.uuid === updated.uuid ? updated : r)
                }
                updateStorage(updatedCollection)
                return updatedCollection
            })

            return updated
        })
    }

    return (
        <>
            <div className="w-full h-full flex flex-row overflow-hidden border border-border">
                <div className="w-[20%] h-full flex flex-col px-2 gap-4 border border-border">
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

                    {currentCollection?.uuid && (
                        <>
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
                        </>
                    )}
                </div>

                {!currentRequest ? <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center text-foreground/40 text-sm">
                        Selecione uma coleção e um request para começar
                    </div>
                </div> : (
                    <div className="w-[80%] h-full flex flex-col">
                        <div className="w-full h-12 flex flex-row gap-0 items-center px-2">
                            <div className="w-full h-fit flex flex-row gap-4 items-center">
                                <span className="w-fit h-fit px-2 py-1 text-xs! rounded-md" style={{ backgroundColor: AVAILABLEMETHODS.find((each) => each.method === currentRequest?.method)?.color ?? '', color: '#fff' }}>
                                    {currentRequest?.method}
                                </span>
                                <span className="cursor-pointer select-none" onDoubleClick={() => { if (!currentRequest) return; setEditingRequestName(currentRequest.name); setRenameRequestModal(true) }}>{currentRequest?.name}</span>
                            </div>
                        </div>
                        <div className="w-full flex-1 min-h-0 flex flex-row border border-border">
                            <div className="w-[62.5%] h-full flex flex-col border-r border-border" >
                                <div className="w-full h-12 flex flex-row bg-foreground/5 px-4">
                                    <ActionsMenu buttonClassName='bg-transparent! border-none h-full' className="bg-background border-border border z-50! w-24" position="bottom" icon={<span className="w-full justify-start items-start flex" style={currentRequest?.method === 'GET' ? {} : { color: AVAILABLEMETHODS.find((each) => each.method === currentRequest?.method)?.color ?? '' }}>{currentRequest?.method}</span>}>
                                        {AVAILABLEMETHODS.map((each) => (
                                            <span key={each.method} className="w-14 h-8 flex items-center py-2" style={each.method === 'GET' ? {} : { color: each.color }} onClick={() => handleChangeMethods(each.method)}>{each.method}</span>
                                        ))}
                                    </ActionsMenu>
                                    <input className="w-full h-full outline-none border-none px-2" value={currentRequest?.url ?? ''} onChange={(e) => setCurrentRequest(prev => prev ? { ...prev, url: e.target.value } : null)} onBlur={handleUrlBlur} />
                                    <Button className="h-full rounded-0" onClick={handleSendRequest}>Enviar</Button>
                                </div>
                                <div className="flex flex-row w-full h-12 border-t border-border">
                                    <span className={`w-fit h-full px-4 py-2 cursor-pointer flex items-center gap-2 ${activeTab === 'params' ? 'bg-foreground/10' : 'bg-transparent'}`} onClick={() => setActiveTab('params')}>Params {currentRequest?.params?.length ? <span className="bg-foreground/5 p-1 rounded-lg border border-white/40 h-fit">{currentRequest.params.length}</span> : ''}</span>
                                    <span className={`w-fit h-full px-4 py-2 cursor-pointer flex items-center gap-2 ${activeTab === 'body' ? 'bg-foreground/10' : 'bg-transparent'}`} onClick={() => setActiveTab('body')}>Body {currentRequest?.bodyType !== 'none' ? <span className="bg-foreground/5 p-1 rounded-lg border border-white/40 h-fit"><div className="w-2 h-2 bg-green-500 rounded-full"></div></span> : ''}</span>
                                    <span className={`w-fit h-full px-4 py-2 cursor-pointer flex items-center gap-2 ${activeTab === 'auth' ? 'bg-foreground/10' : 'bg-transparent'}`} onClick={() => setActiveTab('auth')}>Auth {(currentRequest?.auth && currentRequest?.auth?.type !== 'none') ? <span className="bg-foreground/5 p-1 rounded-lg border border-white/40 h-fit"><div className="w-2 h-2 bg-green-500 rounded-full"></div></span> : ''}</span>
                                    <span className={`w-fit h-full px-4 py-2 cursor-pointer flex items-center gap-2 ${activeTab === 'headers' ? 'bg-foreground/10' : 'bg-transparent'}`} onClick={() => setActiveTab('headers')}>Headers {currentRequest?.headers?.length ? <span className="bg-foreground/5 p-1 rounded-lg border border-white/40 h-fit">{currentRequest.headers.length}</span> : ''}</span>
                                </div>

                                <FetcherTabContent
                                    activeTab={activeTab}
                                    body={currentRequest?.body ?? ''}
                                    onBodyChange={(value) => setCurrentRequest(prev => prev ? { ...prev, body: value } : null)}
                                    onBodySave={handleBodySave}
                                    bodyType={currentRequest?.bodyType ?? 'none'}
                                    onBodyTypeChange={handleBodyTypeChange}
                                    bodyFormData={currentRequest?.bodyFormData ?? []}
                                    onBodyFormDataChange={handleBodyFormDataChange}
                                    url={currentRequest?.url ?? ''}
                                    params={currentRequest?.params ?? []}
                                    onAddParam={handleAddParam}
                                    onRemoveParam={handleRemoveParam}
                                    onRemoveAllParams={() => setDeleteAllParamsModal(true)}
                                    onToggleParam={handleToggleParam}
                                    onUpdateParam={handleUpdateParam}
                                    onSaveParam={handleSaveParams}
                                    headers={currentRequest?.headers ?? []}
                                    onAddHeader={handleAddHeader}
                                    onRemoveHeader={handleRemoveHeader}
                                    onRemoveAllHeaders={() => setDeleteAllHeadersModal(true)}
                                    onToggleHeader={handleToggleHeader}
                                    onUpdateHeader={handleUpdateHeader}
                                    onSaveHeader={handleSaveHeaders}
                                    auth={currentRequest?.auth ?? { type: 'none', active: true }}
                                    onUpdateAuth={handleUpdateAuth}
                                />
                            </div>

                            <div className="w-[37.5%] h-full overflow-hidden flex flex-col">
                                {isSending ? <div className="w-full h-full flex items-center justify-center"><DotLoader /></div> : currentRequest?.response ? (
                                    <>
                                        <div className="w-full h-10 flex flex-row gap-4 items-center px-4 border-b border-border text-sm bg-foreground/5 shrink-0">
                                            <span className={`font-medium ${currentRequest.response.status.startsWith('2') ? 'text-green-500' : (currentRequest.response.status.startsWith('4') || currentRequest.response.status.startsWith('5')) ? 'text-red-500' : 'text-yellow-500'}`}>
                                                {currentRequest.response.status}
                                            </span>
                                            <span className="text-foreground/60">{currentRequest.response.delay}</span>
                                            <span className="text-foreground/60">{currentRequest.response.size}</span>
                                        </div>

                                        <div className="flex flex-row w-full h-10 border-b border-border shrink-0">
                                            <span className={`px-4 h-full flex items-center cursor-pointer text-sm gap-2 ${activeResponseTab === 'preview' ? 'bg-foreground/10' : ''}`} onClick={() => setActiveResponseTab('preview')}>Preview</span>
                                            <span className={`px-4 h-full flex items-center cursor-pointer text-sm gap-2 ${activeResponseTab === 'headers' ? 'bg-foreground/10' : ''}`} onClick={() => setActiveResponseTab('headers')}>
                                                Headers
                                                {currentRequest.response.headers.length > 0 && <span className="bg-foreground/5 p-1 rounded-lg border border-white/40 text-xs">{currentRequest.response.headers.length}</span>}
                                            </span>
                                            <span className={`px-4 h-full flex items-center cursor-pointer text-sm gap-2 ${activeResponseTab === 'cookies' ? 'bg-foreground/10' : ''}`} onClick={() => setActiveResponseTab('cookies')}>
                                                Cookies
                                                {currentRequest.response.cookies.length > 0 && <span className="bg-foreground/5 p-1 rounded-lg border border-white/40 text-xs">{currentRequest.response.cookies.length}</span>}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-h-0 overflow-auto">
                                            {activeResponseTab === 'preview' && (
                                                <pre className="p-4 text-sm font-mono whitespace-pre-wrap break-all">
                                                    {(() => { try { return JSON.stringify(JSON.parse(currentRequest.response.data), null, 2) } catch { return currentRequest.response.data } })()}
                                                </pre>
                                            )}
                                            {activeResponseTab === 'headers' && (
                                                <div className="flex flex-col">
                                                    {currentRequest.response.headers.map((header, i) => (
                                                        <div key={i} className="flex flex-row gap-4 px-4 py-2 border-b border-border text-sm">
                                                            <span className="w-[40%] font-medium text-foreground/80 break-all">{header.key}</span>
                                                            <span className="w-[60%] text-foreground/60 break-all">{header.value}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            {activeResponseTab === 'cookies' && (
                                                <div className="flex flex-col">
                                                    {currentRequest.response.cookies.length === 0 ? (
                                                        <span className="p-4 text-sm text-foreground/50">Nenhum cookie recebido</span>
                                                    ) : currentRequest.response.cookies.map((cookie, i) => (
                                                        <div key={i} className="flex flex-col px-4 py-3 border-b border-border text-sm gap-1">
                                                            <div className="flex flex-row gap-2">
                                                                <span className="font-medium">{cookie.key}</span>
                                                                <span className="text-foreground/60">=</span>
                                                                <span className="text-foreground/80 break-all">{cookie.value}</span>
                                                            </div>
                                                            {cookie.domain && <span className="text-xs text-foreground/50">Domain: {cookie.domain}</span>}
                                                            {cookie.path && <span className="text-xs text-foreground/50">Path: {cookie.path}</span>}
                                                            {cookie.expires && <span className="text-xs text-foreground/50">Expires: {cookie.expires}</span>}
                                                            <div className="flex flex-row gap-2">
                                                                {cookie.secure && <span className="text-xs bg-foreground/10 px-1 rounded">Secure</span>}
                                                                {cookie.httpOnly && <span className="text-xs bg-foreground/10 px-1 rounded">HttpOnly</span>}
                                                                {cookie.hostOnly && <span className="text-xs bg-foreground/10 px-1 rounded">HostOnly</span>}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-foreground/40 text-sm">
                                        Envie uma requisição para ver a resposta
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

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

            <Modal isOpen={deleteAllParamsModal} title="Remover todos os params dessa requisição" className="bg-background border border-border" onClose={() => setDeleteAllParamsModal(false)}>
                <span>Você tem certeza que deseja remover todos os params dessa requisição?</span>

                <div className="w-full h-fit flex flex-row gap-4 justify-end items-center">
                    <Button variant="outline" onClick={() => setDeleteAllParamsModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={() => { handleRemoveAllParams(); setDeleteAllParamsModal(false) }}>Remover</Button>
                </div>
            </Modal>

            <Modal isOpen={deleteAllHeadersModal} title="Remover todos os headers dessa requisição" className="bg-background border border-border" onClose={() => setDeleteAllHeadersModal(false)}>
                <span>Você tem certeza que deseja remover todos os headers dessa requisição?</span>

                <div className="w-full h-fit flex flex-row gap-4 justify-end items-center">
                    <Button variant="outline" onClick={() => setDeleteAllHeadersModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={() => { handleRemoveAllHeaders(); setDeleteAllHeadersModal(false) }}>Remover</Button>
                </div>
            </Modal>

            <Modal title="Renomear requisição" isOpen={renameRequestModal} onClose={() => setRenameRequestModal(false)} className="bg-background border-border">
                <form onSubmit={handleRenameRequest}>
                    <label htmlFor="requestName" className="flex flex-col gap-4">
                        <span>Nome</span>
                        <input
                            className="w-full h-12 border border-border px-2 outline-none"
                            placeholder="Nome da requisição"
                            id="requestName"
                            value={editingRequestName}
                            onChange={(e) => setEditingRequestName(e.target.value)}
                            autoFocus
                        />
                    </label>
                    <div className="w-full h-fit flex flex-row gap-4 justify-end mt-4">
                        <Button variant="ghost" onClick={() => setRenameRequestModal(false)}>Cancelar</Button>
                        <Button variant="primary" type="submit">Salvar</Button>
                    </div>
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