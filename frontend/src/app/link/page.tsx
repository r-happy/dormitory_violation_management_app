import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DevLinkPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-slate-900">開発用ナビゲーション</h1>
                    <p className="text-slate-600">全26ルートへのリンク集</p>
                </div>

                {/* Common Routes */}
                <Card>
                    <CardHeader>
                        <CardTitle>共通ルート</CardTitle>
                        <CardDescription>認証不要のページ</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/" className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                            <div className="font-semibold text-slate-900">ホーム</div>
                            <div className="text-sm text-slate-600">/</div>
                        </Link>
                    </CardContent>
                </Card>

                {/* Dormitory Staff Routes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-blue-700">🏢 寮職員 (DormitoryStaff)</CardTitle>
                        <CardDescription>寮職員用ページ一覧</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Auth */}
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-3">認証</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/dormitoryStaff/login" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="font-semibold text-blue-900">ログイン</div>
                                    <div className="text-sm text-blue-600">/dormitoryStaff/login</div>
                                </Link>
                                <Link href="/dormitoryStaff/signup" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="font-semibold text-blue-900">新規登録</div>
                                    <div className="text-sm text-blue-600">/dormitoryStaff/signup</div>
                                </Link>
                            </div>
                        </div>

                        {/* Main */}
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-3">メイン</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/dormitoryStaff/dashboard" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="font-semibold text-blue-900">ダッシュボード</div>
                                    <div className="text-sm text-blue-600">/dormitoryStaff/dashboard</div>
                                </Link>
                                <Link href="/dormitoryStaff/applications" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="font-semibold text-blue-900">申請管理</div>
                                    <div className="text-sm text-blue-600">/dormitoryStaff/applications</div>
                                </Link>
                                <Link href="/dormitoryStaff/menu" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="font-semibold text-blue-900">寮食メニュー管理</div>
                                    <div className="text-sm text-blue-600">/dormitoryStaff/menu</div>
                                </Link>
                            </div>
                        </div>

                        {/* Student Management */}
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-3">学生管理</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/dormitoryStaff/students" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="font-semibold text-blue-900">学生管理トップ</div>
                                    <div className="text-sm text-blue-600">/dormitoryStaff/students</div>
                                </Link>
                                <Link href="/dormitoryStaff/students/list" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="font-semibold text-blue-900">学生一覧</div>
                                    <div className="text-sm text-blue-600">/dormitoryStaff/students/list</div>
                                </Link>
                                <Link href="/dormitoryStaff/students/new" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="font-semibold text-blue-900">新規学生登録</div>
                                    <div className="text-sm text-blue-600">/dormitoryStaff/students/new</div>
                                </Link>
                                <Link href="/dormitoryStaff/students/upload" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="font-semibold text-blue-900">一括アップロード</div>
                                    <div className="text-sm text-blue-600">/dormitoryStaff/students/upload</div>
                                </Link>
                                <Link href="/dormitoryStaff/students/1" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                                    <div className="font-semibold text-blue-900">学生詳細 (Dynamic)</div>
                                    <div className="text-sm text-blue-600">/dormitoryStaff/students/[id]</div>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Student Routes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-green-700">🎓 学生 (Student)</CardTitle>
                        <CardDescription>学生用ページ一覧</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Auth */}
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-3">認証</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/student/login" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">ログイン</div>
                                    <div className="text-sm text-green-600">/student/login</div>
                                </Link>
                                <Link href="/student/signup" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">新規登録</div>
                                    <div className="text-sm text-green-600">/student/signup</div>
                                </Link>
                            </div>
                        </div>

                        {/* Main */}
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-3">メイン</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/student/dashboard" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">ダッシュボード</div>
                                    <div className="text-sm text-green-600">/student/dashboard</div>
                                </Link>
                                <Link href="/student/duty" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">当番・役割</div>
                                    <div className="text-sm text-green-600">/student/duty</div>
                                </Link>
                                <Link href="/student/history" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">違反履歴</div>
                                    <div className="text-sm text-green-600">/student/history</div>
                                </Link>
                                <Link href="/student/menu" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">寮食メニュー</div>
                                    <div className="text-sm text-green-600">/student/menu</div>
                                </Link>
                            </div>
                        </div>

                        {/* Applications */}
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-3">申請管理</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/student/applications" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">申請トップ</div>
                                    <div className="text-sm text-green-600">/student/applications</div>
                                </Link>
                                <Link href="/student/applications/list" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">申請履歴一覧</div>
                                    <div className="text-sm text-green-600">/student/applications/list</div>
                                </Link>
                                <Link href="/student/applications/new" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">新規申請</div>
                                    <div className="text-sm text-green-600">/student/applications/new</div>
                                </Link>
                                <Link href="/student/applications/new/volunteer" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">ボランティア申請</div>
                                    <div className="text-sm text-green-600">/student/applications/new/volunteer</div>
                                </Link>
                                <Link href="/student/applications/new/appeal" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">異議申し立て</div>
                                    <div className="text-sm text-green-600">/student/applications/new/appeal</div>
                                </Link>
                                <Link href="/student/applications/new/appeal/1" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                    <div className="font-semibold text-green-900">特定違反への異議 (Dynamic)</div>
                                    <div className="text-sm text-green-600">/student/applications/new/appeal/[history_id]</div>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Teacher Routes */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-orange-700">👨‍🏫 教員 (Teacher)</CardTitle>
                        <CardDescription>教員用ページ一覧</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Auth */}
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-3">認証</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/teacher/login" className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                                    <div className="font-semibold text-orange-900">ログイン</div>
                                    <div className="text-sm text-orange-600">/teacher/login</div>
                                </Link>
                                <Link href="/teacher/signup" className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                                    <div className="font-semibold text-orange-900">新規登録</div>
                                    <div className="text-sm text-orange-600">/teacher/signup</div>
                                </Link>
                            </div>
                        </div>

                        {/* Main */}
                        <div>
                            <h3 className="font-semibold text-slate-700 mb-3">メイン</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href="/teacher/dashboard" className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                                    <div className="font-semibold text-orange-900">ダッシュボード</div>
                                    <div className="text-sm text-orange-600">/teacher/dashboard</div>
                                </Link>
                                <Link href="/teacher/1" className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                                    <div className="font-semibold text-orange-900">学生詳細 (Dynamic)</div>
                                    <div className="text-sm text-orange-600">/teacher/[student_id]</div>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Development Info */}
                <Card className="bg-slate-50 border-slate-300">
                    <CardHeader>
                        <CardTitle className="text-slate-700">📋 開発情報</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600 space-y-2">
                        <div><strong>総ルート数:</strong> 26ルート</div>
                        <div><strong>Static Pages:</strong> 24ルート</div>
                        <div><strong>Dynamic Pages:</strong> 2ルート ([student_id], [history_id])</div>
                        <div><strong>認証方式:</strong> Server Actions + httpOnly cookies</div>
                        <div><strong>詳細:</strong> <Link href="/docs/ROUTE.md" className="text-blue-600 hover:underline">ROUTE.md</Link></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
