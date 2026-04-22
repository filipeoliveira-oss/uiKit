'use client'

import { Plus, Trash2 } from 'lucide-react'

interface IParam {
    key: string
    value: string
    active: boolean
    uuid: string
}

type ActiveTab = 'params' | 'body' | 'auth' | 'headers'

export type IAuth =
    | { type: 'none'; active: boolean }
    | { type: 'apikey'; active: boolean; key: string; value: string; addTo: 'header' | 'query' | 'cookies' }
    | { type: 'basic'; active: boolean; username: string; password: string; useIso88591: boolean }
    | { type: 'digest'; active: boolean; username: string; password: string }
    | { type: 'ntlm'; active: boolean; username: string; password: string }
    | { type: 'awsiam'; active: boolean; accessKeyId: string; secretAccessKey: string; region: string; service: string; sessionToken: string }
    | { type: 'bearer'; active: boolean; token: string; prefix: string }
    | { type: 'hawk'; active: boolean; authId: string; authKey: string; algorithm: 'sha256' | 'sha1'; ext: string; validatePayload: boolean }

const AUTH_LABELS: Record<IAuth['type'], string> = {
    none: 'None',
    apikey: 'API Key',
    basic: 'Basic',
    digest: 'Digest',
    ntlm: 'NTLM',
    awsiam: 'AWS IAM',
    bearer: 'Bearer Token',
    hawk: 'Hawk',
}

function defaultAuth(type: IAuth['type']): IAuth {
    switch (type) {
        case 'none': return { type: 'none', active: true }
        case 'apikey': return { type: 'apikey', active: true, key: '', value: '', addTo: 'header' }
        case 'basic': return { type: 'basic', active: true, username: '', password: '', useIso88591: false }
        case 'digest': return { type: 'digest', active: true, username: '', password: '' }
        case 'ntlm': return { type: 'ntlm', active: true, username: '', password: '' }
        case 'awsiam': return { type: 'awsiam', active: true, accessKeyId: '', secretAccessKey: '', region: '', service: '', sessionToken: '' }
        case 'bearer': return { type: 'bearer', active: true, token: '', prefix: 'Bearer' }
        case 'hawk': return { type: 'hawk', active: true, authId: '', authKey: '', algorithm: 'sha256', ext: '', validatePayload: false }
    }
}

interface IHeader {
    key: string
    value: string
    active: boolean
    uuid: string
}

interface FetcherTabContentProps {
    activeTab: ActiveTab
    body: string
    onBodyChange: (value: string) => void
    params: IParam[]
    onAddParam: () => void
    onRemoveParam: (uuid: string) => void
    onRemoveAllParams: () => void
    onToggleParam: (uuid: string) => void
    onUpdateParam: (uuid: string, field: 'key' | 'value', value: string) => void
    onSaveParam: () => void
    url: string
    headers: IHeader[]
    onAddHeader: () => void
    onRemoveHeader: (uuid: string) => void
    onRemoveAllHeaders: () => void
    onToggleHeader: (uuid: string) => void
    onUpdateHeader: (uuid: string, field: 'key' | 'value', value: string) => void
    onSaveHeader: () => void
    auth: IAuth
    onUpdateAuth: (auth: IAuth) => void
}

function buildPreviewUrl(url: string, params: IParam[]): string {
    const base = url.split('?')[0]
    const active = params.filter(p => p.active && p.key)
    if (!active.length) return base
    const qs = active.map(p => `${p.key}${p.value ? '=' + p.value : ''}`).join('&')
    return base ? `${base}?${qs}` : `?${qs}`
}

function ParamsTab({ url, params, onAdd, onRemove, onRemoveAll, onToggle, onUpdate, onSave }: {
    url: string
    params: IParam[]
    onAdd: () => void
    onRemove: (uuid: string) => void
    onRemoveAll: () => void
    onToggle: (uuid: string) => void
    onUpdate: (uuid: string, field: 'key' | 'value', value: string) => void
    onSave: () => void
}) {
    const preview = buildPreviewUrl(url, params)

    return (
        <div className="w-full h-full flex flex-col">
            {preview && (
                <div className="w-full border-t border-border px-3 py-2 flex flex-col gap-1">
                    <span className="text-xs text-foreground/40">Preview</span>
                    <span className="text-xs text-foreground/70 break-all font-mono">
                        {preview.split('?').map((part, i) => i === 0
                            ? <span key={i}>{part}</span>
                            : <span key={i}><span className="text-foreground/40">?</span>{part.split('&').map((seg, j) => {
                                const [k, v] = seg.split('=')
                                return (
                                    <span key={j}>
                                        {j > 0 && <span className="text-foreground/40">&</span>}
                                        <span className="text-blue-400">{k}</span>
                                        {v !== undefined && <><span className="text-foreground/40">=</span><span className="text-green-400">{v}</span></>}
                                    </span>
                                )
                            })}</span>
                        )}
                    </span>
                </div>
            )}
            <div className="w-full h-8 flex flex-row gap-6 border-b border-border px-3 items-center">
                <span className="cursor-pointer text-xs text-foreground/60 flex flex-row gap-1 items-center hover:text-foreground transition-colors" onClick={onAdd}>
                    <Plus size={12} /> Adicionar
                </span>
                <span className="cursor-pointer text-xs text-foreground/60 flex flex-row gap-1 items-center hover:text-foreground transition-colors" onClick={onRemoveAll}>
                    <Trash2 size={12} /> Remover todos
                </span>
            </div>
            <div className="w-full h-7 flex flex-row border-b border-border text-xs text-foreground/40 items-center">
                <div className="w-8 shrink-0" />
                <span className="flex-1 px-2">Chave</span>
                <span className="flex-1 px-2 border-l border-border/50">Valor</span>
                <div className="w-8 shrink-0" />
            </div>
            {params.map((param) => (
                <div key={param.uuid} className={`w-full h-9 flex flex-row border-b border-border/50 items-center ${param.active ? '' : 'opacity-40'}`}>
                    <div className="w-8 shrink-0 flex items-center justify-center">
                        <input
                            type="checkbox"
                            className="w-3 h-3 cursor-pointer"
                            checked={param.active}
                            onChange={() => onToggle(param.uuid)}
                        />
                    </div>
                    <input
                        className="flex-1 h-full px-2 outline-none border-r border-border/50 bg-transparent text-sm"
                        placeholder="chave"
                        value={param.key}
                        onChange={(e) => onUpdate(param.uuid, 'key', e.target.value)}
                        onBlur={onSave}
                    />
                    <input
                        className="flex-1 h-full px-2 outline-none border-r border-border/50 bg-transparent text-sm"
                        placeholder="valor"
                        value={param.value}
                        onChange={(e) => onUpdate(param.uuid, 'value', e.target.value)}
                        onBlur={onSave}
                    />
                    <div className="w-8 shrink-0 flex items-center justify-center">
                        <Trash2 size={14} className="cursor-pointer text-foreground/40 hover:text-foreground transition-colors" onClick={() => onRemove(param.uuid)} />
                    </div>
                </div>
            ))}
            
        </div>
    )
}

function HeadersTab({ headers, onAdd, onRemove, onRemoveAll, onToggle, onUpdate, onSave }: {
    headers: IHeader[]
    onAdd: () => void
    onRemove: (uuid: string) => void
    onRemoveAll: () => void
    onToggle: (uuid: string) => void
    onUpdate: (uuid: string, field: 'key' | 'value', value: string) => void
    onSave: () => void
}) {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-8 flex flex-row gap-6 border-b border-border px-3 items-center">
                <span className="cursor-pointer text-xs text-foreground/60 flex flex-row gap-1 items-center hover:text-foreground transition-colors" onClick={onAdd}>
                    <Plus size={12} /> Adicionar
                </span>
                <span className="cursor-pointer text-xs text-foreground/60 flex flex-row gap-1 items-center hover:text-foreground transition-colors" onClick={onRemoveAll}>
                    <Trash2 size={12} /> Remover todos
                </span>
            </div>
            <div className="w-full h-7 flex flex-row border-b border-border text-xs text-foreground/40 items-center">
                <div className="w-8 shrink-0" />
                <span className="flex-1 px-2">Header</span>
                <span className="flex-1 px-2 border-l border-border/50">Valor</span>
                <div className="w-8 shrink-0" />
            </div>
            {headers.map((header) => (
                <div key={header.uuid} className={`w-full h-9 flex flex-row border-b border-border/50 items-center ${header.active ? '' : 'opacity-40'}`}>
                    <div className="w-8 shrink-0 flex items-center justify-center">
                        <input
                            type="checkbox"
                            className="w-3 h-3 cursor-pointer"
                            checked={header.active}
                            onChange={() => onToggle(header.uuid)}
                        />
                    </div>
                    <input
                        className="flex-1 h-full px-2 outline-none border-r border-border/50 bg-transparent text-sm"
                        placeholder="header"
                        value={header.key}
                        onChange={(e) => onUpdate(header.uuid, 'key', e.target.value)}
                        onBlur={onSave}
                    />
                    <input
                        className="flex-1 h-full px-2 outline-none border-r border-border/50 bg-transparent text-sm"
                        placeholder="valor"
                        value={header.value}
                        onChange={(e) => onUpdate(header.uuid, 'value', e.target.value)}
                        onBlur={onSave}
                    />
                    <div className="w-8 shrink-0 flex items-center justify-center">
                        <Trash2 size={14} className="cursor-pointer text-foreground/40 hover:text-foreground transition-colors" onClick={() => onRemove(header.uuid)} />
                    </div>
                </div>
            ))}
        </div>
    )
}

function BodyTab({ body, onChange }: { body: string; onChange: (v: string) => void }) {
    return (
        <textarea
            className="w-full h-full resize-none outline-none p-3 font-mono text-sm bg-transparent"
            value={body}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Request body (JSON, XML, text...)"
            spellCheck={false}
        />
    )
}

function AuthTab({ auth, onUpdate }: { auth: IAuth; onUpdate: (auth: IAuth) => void }) {
    const inp = "h-9 px-2 border border-border bg-transparent outline-none text-sm w-full"
    const lbl = "text-xs text-foreground/50 mb-1 block"
    const upd = (patch: object) => onUpdate({ ...auth, ...patch } as IAuth)

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <div className="flex flex-row gap-4 items-center">
                <div className="flex flex-row gap-3 items-center flex-1">
                    <label className="text-sm text-foreground/60 whitespace-nowrap">Tipo</label>
                    <select
                        className="h-9 px-2 border border-border bg-background outline-none text-sm"
                        value={auth.type}
                        onChange={(e) => onUpdate(defaultAuth(e.target.value as IAuth['type']))}
                    >
                        {(Object.entries(AUTH_LABELS) as [IAuth['type'], string][]).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>
                <label className="flex flex-row gap-2 items-center text-sm text-foreground/60 cursor-pointer select-none">
                    <input
                        type="checkbox"
                        className="w-3 h-3 cursor-pointer"
                        checked={auth.active}
                        onChange={(e) => upd({ active: e.target.checked })}
                    />
                    Ativo
                </label>
            </div>

            {auth.type !== 'none' && <div className="h-px bg-border" />}

            {auth.type === 'apikey' && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={lbl}>Chave</label>
                        <input className={inp} value={auth.key} onChange={(e) => upd({ key: e.target.value })} placeholder="X-Api-Key" />
                    </div>
                    <div>
                        <label className={lbl}>Valor</label>
                        <input className={inp} value={auth.value} onChange={(e) => upd({ value: e.target.value })} placeholder="valor" />
                    </div>
                    <div>
                        <label className={lbl}>Adicionar a</label>
                        <select className={`${inp} bg-background!`} value={auth.addTo} onChange={(e) => upd({ addTo: e.target.value })}>
                            <option value="header">Header</option>
                            <option value="query">Query Params</option>
                            <option value="cookies">Cookies</option>
                        </select>
                    </div>
                </div>
            )}

            {(auth.type === 'basic' || auth.type === 'digest' || auth.type === 'ntlm') && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={lbl}>Usuário</label>
                        <input className={inp} value={auth.username} onChange={(e) => upd({ username: e.target.value })} placeholder="username" />
                    </div>
                    <div>
                        <label className={lbl}>Senha</label>
                        <input className={inp} type="password" value={auth.password} onChange={(e) => upd({ password: e.target.value })} placeholder="••••••••" />
                    </div>
                    {auth.type === 'basic' && (
                        <label className="col-span-2 flex items-center gap-2 cursor-pointer select-none text-sm text-foreground/70">
                            <input type="checkbox" className="w-3 h-3 cursor-pointer" checked={auth.useIso88591} onChange={(e) => upd({ useIso88591: e.target.checked })} />
                            Usar ISO 8859-1
                        </label>
                    )}
                </div>
            )}

            {auth.type === 'awsiam' && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={lbl}>Access Key ID</label>
                        <input className={inp} value={auth.accessKeyId} onChange={(e) => upd({ accessKeyId: e.target.value })} placeholder="AKIAIOSFODNN7EXAMPLE" />
                    </div>
                    <div>
                        <label className={lbl}>Secret Access Key</label>
                        <input className={inp} type="password" value={auth.secretAccessKey} onChange={(e) => upd({ secretAccessKey: e.target.value })} placeholder="••••••••" />
                    </div>
                    <div>
                        <label className={lbl}>Region</label>
                        <input className={inp} value={auth.region} onChange={(e) => upd({ region: e.target.value })} placeholder="us-east-1" />
                    </div>
                    <div>
                        <label className={lbl}>Service</label>
                        <input className={inp} value={auth.service} onChange={(e) => upd({ service: e.target.value })} placeholder="execute-api" />
                    </div>
                    <div className="col-span-2">
                        <label className={lbl}>Session Token</label>
                        <input className={inp} value={auth.sessionToken} onChange={(e) => upd({ sessionToken: e.target.value })} placeholder="token temporário (opcional)" />
                    </div>
                </div>
            )}

            {auth.type === 'bearer' && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={lbl}>Prefixo</label>
                        <input className={inp} value={auth.prefix} onChange={(e) => upd({ prefix: e.target.value })} placeholder="Bearer" />
                    </div>
                    <div>
                        <label className={lbl}>Token</label>
                        <input className={inp} value={auth.token} onChange={(e) => upd({ token: e.target.value })} placeholder="token" />
                    </div>
                </div>
            )}

            {auth.type === 'hawk' && (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className={lbl}>Auth ID</label>
                        <input className={inp} value={auth.authId} onChange={(e) => upd({ authId: e.target.value })} placeholder="id" />
                    </div>
                    <div>
                        <label className={lbl}>Auth Key</label>
                        <input className={inp} value={auth.authKey} onChange={(e) => upd({ authKey: e.target.value })} placeholder="chave" />
                    </div>
                    <div>
                        <label className={lbl}>Algoritmo</label>
                        <select className={`${inp} bg-background!`} value={auth.algorithm} onChange={(e) => upd({ algorithm: e.target.value })}>
                            <option value="sha256">SHA-256</option>
                            <option value="sha1">SHA-1</option>
                        </select>
                    </div>
                    <div>
                        <label className={lbl}>Ext</label>
                        <input className={inp} value={auth.ext} onChange={(e) => upd({ ext: e.target.value })} placeholder="dados extras (opcional)" />
                    </div>
                    <label className="col-span-2 flex items-center gap-2 cursor-pointer select-none text-sm text-foreground/70">
                        <input type="checkbox" className="w-3 h-3 cursor-pointer" checked={auth.validatePayload} onChange={(e) => upd({ validatePayload: e.target.checked })} />
                        Validar payload
                    </label>
                </div>
            )}
        </div>
    )
}

export default function FetcherTabContent({ activeTab, body, onBodyChange, params, onAddParam, onRemoveParam, onRemoveAllParams, onToggleParam, onUpdateParam, onSaveParam, url, headers, onAddHeader, onRemoveHeader, onRemoveAllHeaders, onToggleHeader, onUpdateHeader, onSaveHeader, auth, onUpdateAuth }: FetcherTabContentProps) {
    return (
        <div className="w-full flex-1 min-h-0 overflow-auto">
            {activeTab === 'params' && (
                <ParamsTab
                    url={url}
                    params={params}
                    onAdd={onAddParam}
                    onRemove={onRemoveParam}
                    onRemoveAll={onRemoveAllParams}
                    onToggle={onToggleParam}
                    onUpdate={onUpdateParam}
                    onSave={onSaveParam}
                />
            )}
            {activeTab === 'body' && <BodyTab body={body} onChange={onBodyChange} />}
            {activeTab === 'auth' && <AuthTab auth={auth} onUpdate={onUpdateAuth} />}
            {activeTab === 'headers' && (
                <HeadersTab
                    headers={headers}
                    onAdd={onAddHeader}
                    onRemove={onRemoveHeader}
                    onRemoveAll={onRemoveAllHeaders}
                    onToggle={onToggleHeader}
                    onUpdate={onUpdateHeader}
                    onSave={onSaveHeader}
                />
            )}
        </div>
    )
}
