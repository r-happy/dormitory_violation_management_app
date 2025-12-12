"use client";

import { useActionState, useState } from "react";
// import { useRouter } from "next/navigation";
import { loginAction, type LoginState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const initialState: LoginState = {
    errors: {},
    success: false,
};

export default function DormitoryStaffLogin() {
    // const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(
        loginAction,
        initialState,
    );

    // Redirect logic removed in favor of Server Action redirect

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">
                        寮職員ログイン
                    </CardTitle>
                    <CardDescription className="text-center">
                        アカウント情報を入力してください
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {/* Form-level Error */}
                    {state.errors?._form && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm mb-4">
                            {state.errors._form.join(", ")}
                        </div>
                    )}

                    {/* Form */}
                    <form action={formAction} className="space-y-4">
                        {/* Email Field */}
                        <div className="space-y-2">
                            <Label htmlFor="email">メールアドレス</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@school.ac.jp"
                                aria-invalid={!!state.errors?.email}
                                required
                            />
                            {state.errors?.email && (
                                <p className="text-destructive text-sm">
                                    {state.errors.email.join(", ")}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <Label htmlFor="password">パスワード</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pr-10"
                                    aria-invalid={!!state.errors?.password}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {state.errors?.password && (
                                <p className="text-destructive text-sm">
                                    {state.errors.password.join(", ")}
                                </p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center space-x-2">
                            <input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                            />
                            <Label
                                htmlFor="rememberMe"
                                className="text-sm font-normal cursor-pointer"
                            >
                                ログイン状態を保持する
                            </Label>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full"
                            size="lg"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ログイン中...
                                </>
                            ) : (
                                "ログイン"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-center text-muted-foreground">
                        アカウントをお持ちでないですか？{" "}
                        <a
                            href="/dormitoryStaff/signup"
                            className="text-primary hover:underline font-medium"
                        >
                            新規登録
                        </a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
