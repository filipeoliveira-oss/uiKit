import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const { url, method, headers, body, formDataEntries } = await req.json()

    let fetchBody: BodyInit | null = null
    const fetchHeaders: Record<string, string> = { ...headers }

    if (formDataEntries) {
        const fd = new FormData()
        for (const { key, value } of formDataEntries as Array<{ key: string; value: string }>) {
            fd.append(key, value)
        }
        delete fetchHeaders['Content-Type']
        fetchBody = fd
    } else if (body) {
        fetchBody = body
    }

    try {
        const res = await fetch(url, { method, headers: fetchHeaders, body: fetchBody })
        const text = await res.text()

        const responseHeaders: Record<string, string> = {}
        res.headers.forEach((value, key) => { responseHeaders[key] = value })

        // Node 18+ exposes getSetCookie() which returns all Set-Cookie values as an array
        const setCookies: string[] = typeof (res.headers as unknown as { getSetCookie?: () => string[] }).getSetCookie === 'function'
            ? (res.headers as unknown as { getSetCookie: () => string[] }).getSetCookie()
            : res.headers.get('set-cookie') ? [res.headers.get('set-cookie')!] : []

        return NextResponse.json({
            status: res.status,
            statusText: res.statusText,
            headers: responseHeaders,
            setCookies,
            body: text,
        })
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 })
    }
}
