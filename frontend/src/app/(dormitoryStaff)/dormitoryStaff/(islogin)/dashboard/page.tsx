import ForwardLink from "@/components/UI/ForwardLink";
import Link from "next/link";

export default function DormitoryStaffDashboard() {
    return (
        <div>
            <h1>DormitoryStaffDashboard</h1>
            <ForwardLink href="/dormitoryStaff/applications">申請</ForwardLink>
            <ForwardLink href="/dormitoryStaff/students">学生一覧</ForwardLink>
            <ForwardLink href="/dormitoryStaff/menu">寮食</ForwardLink>
        </div>
    );
}
