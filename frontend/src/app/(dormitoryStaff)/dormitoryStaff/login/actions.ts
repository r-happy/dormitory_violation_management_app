"use server"

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Zod schema for login validation
const loginSchema = z.object({
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z
        .string()
        .min(1, "パスワードを入力してください")
        .min(6, "パスワードは6文字以上である必要があります"),
    rememberMe: z.boolean().optional(),
});

export type LoginState = {
    errors?: {
        email?: string[];
        password?: string[];
        _form?: string[];
    };
    success?: boolean;
};

export async function loginAction(
    prevState: LoginState,
    formData: FormData
): Promise<LoginState> {
    // Parse and validate form data
    const validatedFields = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        rememberMe: formData.get("rememberMe") === "on",
    });

    // Return validation errors
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password, rememberMe } = validatedFields.data;

    try {
        // Placeholder authentication - replace with actual API call when backend is ready
        // Example:
        // const response = await fetch(`${process.env.API_URL}/auth/login`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password }),
        // });
        // 
        // if (!response.ok) {
        //     return {
        //         errors: {
        //             _form: ['メールアドレスまたはパスワードが正しくありません'],
        //         },
        //     };
        // }
        //
        // const data = await response.json();
        // const token = data.token;

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock token for development
        const mockToken = "mock-jwt-token-" + Date.now();

        // Set cookie with token
        const cookieStore = await cookies();
        cookieStore.set("accessToken", mockToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days or 1 day
        });

        cookieStore.set("userRole", "dormitoryStaff", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
        });

    } catch (error) {
        return {
            errors: {
                _form: ["ログインに失敗しました。もう一度お試しください。"],
            },
        };
    }

    redirect("/dormitoryStaff/dashboard");
}
