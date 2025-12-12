import Link from "next/link";
import {GoArrowRight} from "react-icons/go";

export default function ForwardLink({href,children}:{href: string,children: string}){
    return(
        <div className="flex items-center gap-4">
            <div>
                <Link href={href}>{children}</Link>
            </div>
            <GoArrowRight />
        </div>
    )
}