"use client"

import { useState } from "react";
import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search } from "lucide-react";

// Mock Data based on DEMODATA.md
type Student = {
    id: number;
    name: string;
    gender_id: number;
    class_id: number;
    room_number: string;
    email: string;
};

const STUDENTS: Student[] = [
    { id: 1, name: "山本 太一", gender_id: 1, class_id: 1, room_number: "101", email: "yamamoto@student.ac.jp" },
    { id: 2, name: "中村 花", gender_id: 2, class_id: 1, room_number: "102", email: "nakamura@student.ac.jp" },
    { id: 3, name: "小林 健太", gender_id: 1, class_id: 2, room_number: "103", email: "kobayashi@student.ac.jp" },
    { id: 4, name: "加藤 彩", gender_id: 2, class_id: 2, room_number: "104", email: "kato@student.ac.jp" },
    { id: 5, name: "吉田 大輔", gender_id: 1, class_id: 3, room_number: "201", email: "yoshida@student.ac.jp" },
    { id: 6, name: "山口 真理", gender_id: 2, class_id: 3, room_number: "202", email: "yamaguchi@student.ac.jp" },
    { id: 7, name: "松本 翔太", gender_id: 1, class_id: 4, room_number: "203", email: "matsumoto@student.ac.jp" },
    { id: 8, name: "井上 優子", gender_id: 2, class_id: 4, room_number: "204", email: "inoue@student.ac.jp" },
    { id: 9, name: "木村 隆", gender_id: 1, class_id: 5, room_number: "301", email: "kimura@student.ac.jp" },
    { id: 10, name: "林 麻衣", gender_id: 2, class_id: 5, room_number: "302", email: "hayashi@student.ac.jp" },
    { id: 11, name: "斉藤 圭介", gender_id: 1, class_id: 6, room_number: "303", email: "saito@student.ac.jp" },
    { id: 12, name: "清水 奈々", gender_id: 2, class_id: 6, room_number: "304", email: "shimizu@student.ac.jp" },
    { id: 13, name: "森田 拓也", gender_id: 1, class_id: 1, room_number: "105", email: "morita@student.ac.jp" },
    { id: 14, name: "池田 由美", gender_id: 2, class_id: 2, room_number: "106", email: "ikeda@student.ac.jp" },
    { id: 15, name: "橋本 誠", gender_id: 1, class_id: 3, room_number: "205", email: "hashimoto@student.ac.jp" },
];

const CLASSES: Record<number, string> = {
    1: "1年A組",
    2: "1年B組",
    3: "2年A組",
    4: "2年B組",
    5: "3年A組",
    6: "3年B組",
};

const GENDERS: Record<number, { label: string; color: "default" | "secondary" | "destructive" | "outline" }> = {
    1: { label: "男性", color: "default" }, // Blue-ish in default mostly, or we can customize
    2: { label: "女性", color: "destructive" }, // Red-ish
    3: { label: "その他", color: "secondary" },
};

export default function DormitoryStaffStudents() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredStudents = STUDENTS.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto py-10 px-4">
            <Card className="shadow-lg">
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            🎓 学生一覧
                        </CardTitle>
                        <CardDescription>
                            現在登録されている学生のリストです。詳細情報の確認や編集ができます。
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 flex items-center gap-2 max-w-md">
                        <Search className="text-gray-400 w-5 h-5" />
                        <Input
                            placeholder="学生名で検索..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white"
                        />
                    </div>

                    <div className="rounded-md border overflow-hidden">
                        <Table>
                            <TableHeader className="bg-gray-50">
                                <TableRow>
                                    <TableHead className="w-[80px]">ID</TableHead>
                                    <TableHead>氏名</TableHead>
                                    <TableHead>性別</TableHead>
                                    <TableHead>クラス</TableHead>
                                    <TableHead>部屋番号</TableHead>
                                    <TableHead className="text-right">操作</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map((student) => (
                                        <TableRow key={student.id} className="hover:bg-gray-50 transition-colors">
                                            <TableCell className="font-medium">{student.id}</TableCell>
                                            <TableCell className="font-semibold text-gray-700">
                                                {student.name}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={GENDERS[student.gender_id]?.color || "outline"}>
                                                    {GENDERS[student.gender_id]?.label || "不明"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{CLASSES[student.class_id] || "不明"}</TableCell>
                                            <TableCell>{student.room_number}号室</TableCell>
                                            <TableCell className="text-right">
                                                <Link href={`/dormitoryStaff/students/${student.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        詳細
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                                            学生が見つかりませんでした。
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4 text-sm text-gray-500 text-right">
                        表示件数: {filteredStudents.length} / {STUDENTS.length} 名
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}