"use server"

import { z } from "zod";
import { cookies } from "next/headers";

// Zod schema for signup validation
const signupSchema = z.object({
    name: z
        .string()
        .min(1, "名前を入力してください")
        .min(2, "名前は2文字以上である必要があります"),
    email: z.email("有効なメールアドレスを入力してください"),
    password: z
        .string()
        .min(1, "パスワードを入力してください")
        .min(6, "パスワードは6文字以上である必要があります"),
    confirmPassword: z.string().min(1, "確認用パスワードを入力してください"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
});

export type SignupState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
        _form?: string[];
    };
    success?: boolean;
};

export async function signupAction(
    prevState: SignupState,
    formData: FormData
): Promise<SignupState> {
    // Parse and validate form data
    const validatedFields = signupSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    });

    // Return validation errors
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validatedFields.data;

    try {
        // Placeholder signup - replace with actual API call when backend is ready
        // Example:
        // const response = await fetch(`${process.env.API_URL}/domitoryStaffs`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, password }),
        // });
        // 
        // if (!response.ok) {
        //     if (response.status === 409) {
        //         return {
        //             errors: {
        //                 _form: ['このメールアドレスは既に登録されています'],
        //             },
        //         };
        //     }
        //     throw new Error('Signup failed');
        // }
        //
        // const data = await response.json();
        // const token = data.token;

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock token for development
        const mockToken = "mock-jwt-token-" + Date.now();

        // Set cookie with token (auto-login after signup)
        const cookieStore = await cookies();
        cookieStore.set("accessToken", mockToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24, // 1 day
        });

        cookieStore.set("userRole", "dormitoryStaff", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24,
        });

        return { success: true };
    } catch (error) {
        return {
            errors: {
                _form: ["アカウント作成に失敗しました。もう一度お試しください。"],
            },
        };
    }
}
