import { StatusCodes } from "http-status-codes";

const API_BASE_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:8080/api/v1"

export class ApiError extends Error {
    status: number;
    data: any;

    constructor(status: number, message: string, data?: any) {
        super(message)
        this.status = status
        this.data = data
    }
}

type RequestOptions = RequestInit & {
    token?: string;
    params?: Record<string, string | number | boolean>
}

async function fetchClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { token, params, headers, ...customConfig } = options

    const url = new URL(`${API_BASE_URL}/${endpoint}`)
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, String(value))
            }
        })
    }

    const requestHeadrs: HeadersInit = {
        "Content-Type": "application/json",
        ...((headers as Record<string, string>) || {})
    }

    let authToken = token;

    if (!authToken) {
        if (typeof window !== "undefined") {
            authToken = localStorage.getItem("accessToken") || undefined
        } else {
            try {
                const { cookies } = await import("next/headers")
                const cookieStore = await cookies();
                authToken = cookieStore.get("accessToken")?.value;
            } catch (error) {
                console.warn("ServerSide cookie retrieval failed: ", error)
            }
        }
    }

    if (authToken) {
        (requestHeadrs as Record<string, string>)["Authorization"] = `Bearer ${authToken}`
    }

    const config: RequestInit = {
        ...customConfig,
        headers: requestHeadrs,
    }

    try {
        const response = await fetch(url.toString(), config);

        if (!response.ok) {
            if (response.status === StatusCodes.UNAUTHORIZED) {
                console.error("Unauthrorized access")
            }
            if (response.status === StatusCodes.NOT_FOUND) {
                // 
            }

            const errorData = await response.json().catch(() => ({}))
            throw new ApiError(response.status, response.statusText, errorData)
        }

        if (response.status === StatusCodes.NO_CONTENT) {
            return null as T
        }

        return await response.json();
    } catch (error) {
        if (error instanceof ApiError) {
            throw error
        }
        throw new Error(error instanceof Error ? error.message : "An unknown error occurred")
    }
}


