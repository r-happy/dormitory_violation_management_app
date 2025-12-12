"use server"

import { z } from "zod";
import { cookies } from "next/headers";

// Zod schema for student login validation
const loginSchema = z.object({
    email: z.email("有効なメールアドレスを入力してください"),
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
    const validatedFields = loginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        rememberMe: formData.get("rememberMe") === "on",
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password, rememberMe } = validatedFields.data;

    try {
        // Placeholder - replace with actual API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockToken = "mock-jwt-token-" + Date.now();
        const cookieStore = await cookies();
        
        cookieStore.set("accessToken", mockToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
        });

        cookieStore.set("userRole", "student", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
        });

        return { success: true };
    } catch (error) {
        return {
            errors: {
                _form: ["ログインに失敗しました。もう一度お試しください。"],
            },
        };
    }
}
