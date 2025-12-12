import React, { ReactNode } from "react";
import type { Metadata } from "next";
import "./global.css"

export const metadata: Metadata = {
    title: "Dormitory Violation Management",
    description: "Dormitory violation management system",
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
};

export default Layout;
