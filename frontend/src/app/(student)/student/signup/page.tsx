"use client"

import { useActionState, useState } from "react";
// import { useRouter } from "next/navigation";
import { signupAction, type SignupState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const initialState: SignupState = {
    errors: {},
    success: false,
};

export default function StudentSignup() {
    // const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [state, formAction, isPending] = useActionState(signupAction, initialState);

    // Client-side redirect removed

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl text-center">学生アカウント作成</CardTitle>
                    <CardDescription className="text-center">
                        新しいアカウントを作成してください
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    {state.errors?._form && (
                        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm mb-4">
                            {state.errors._form.join(", ")}
                        </div>
                    )}

                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">名前</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="山田 太郎"
                                aria-invalid={!!state.errors?.name}
                                required
                            />
                            {state.errors?.name && (
                                <p className="text-destructive text-sm">{state.errors.name.join(", ")}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">メールアドレス</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="student@school.ac.jp"
                                aria-invalid={!!state.errors?.email}
                                required
                            />
                            {state.errors?.email && (
                                <p className="text-destructive text-sm">{state.errors.email.join(", ")}</p>
                            )}
                        </div>

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
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {state.errors?.password && (
                                <p className="text-destructive text-sm">{state.errors.password.join(", ")}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">パスワード（確認）</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="pr-10"
                                    aria-invalid={!!state.errors?.confirmPassword}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {state.errors?.confirmPassword && (
                                <p className="text-destructive text-sm">{state.errors.confirmPassword.join(", ")}</p>
                            )}
                        </div>

                        <Button type="submit" disabled={isPending} className="w-full" size="lg">
                            {isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    アカウント作成中...
                                </>
                            ) : (
                                "アカウント作成"
                            )}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <div className="text-sm text-center text-muted-foreground">
                        既にアカウントをお持ちですか？{" "}
                        <a href="/student/login" className="text-primary hover:underline font-medium">
                            ログイン
                        </a>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}