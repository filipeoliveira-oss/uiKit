import { NextRequest, NextResponse } from 'next/server'

async function handler(req: NextRequest) {
    const url = new URL(req.url)

    const queryParams: Record<string, string> = {}
    url.searchParams.forEach((value, key) => { queryParams[key] = value })

    const headers: Record<string, string> = {}
    req.headers.forEach((value, key) => { headers[key] = value })

    const rawCookies = req.headers.get('cookie') ?? ''
    const cookies: Record<string, string> = {}
    if (rawCookies) {
        rawCookies.split(';').forEach(pair => {
            const [k, ...rest] = pair.trim().split('=')
            if (k) cookies[k.trim()] = rest.join('=').trim()
        })
    }

    const authHeader = req.headers.get('authorization') ?? null
    let auth: Record<string, string> | null = null
    if (authHeader) {
        const [scheme, credentials] = authHeader.split(' ')
        auth = { scheme }
        if (scheme?.toLowerCase() === 'basic' && credentials) {
            try {
                const decoded = Buffer.from(credentials, 'base64').toString('utf-8')
                const [username, ...passwordParts] = decoded.split(':')
                auth.username = username
                auth.password = passwordParts.join(':')
            } catch {}
        } else if (credentials) {
            auth.credentials = credentials
        }
    }

    const contentType = req.headers.get('content-type') ?? ''
    let body: unknown = null

    try {
        const text = await req.text()
        if (text) {
            if (contentType.includes('application/json')) {
                try { body = JSON.parse(text) } catch { body = text }
            } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
                const formData = await new Request(req.url, { method: req.method, headers: req.headers, body: text }).formData().catch(() => null)
                if (formData) {
                    const fields: Record<string, string> = {}
                    formData.forEach((value, key) => { fields[key] = value.toString() })
                    body = fields
                } else {
                    body = text
                }
            } else {
                body = text
            }
        }
    } catch {}

    const payload = {
        method: req.method,
        url: req.url,
        path: url.pathname,
        queryParams,
        headers,
        auth,
        cookies,
        body,
        receivedAt: new Date().toISOString(),
    }

    return NextResponse.json(payload, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',
            'Access-Control-Allow-Headers': '*',
        },
    })
}

export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
export const HEAD = handler

export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD',
            'Access-Control-Allow-Headers': '*',
        },
    })
}
