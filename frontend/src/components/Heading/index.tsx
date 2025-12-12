import { ReactNode } from "react";

export default function Heading({ children, size }: { children: ReactNode, size?: 'sm' | 'md' | 'lg' }) {
    let className = "font-bold ";
    if (size === 'sm') {
        className += "text-lg ";
    } else if (size === 'md') {
        className += "text-2xl ";
    } else {
        className += "text-4xl ";
    }

    return (
        <h1 className={className}>
            {children}
        </h1>
    )
}
