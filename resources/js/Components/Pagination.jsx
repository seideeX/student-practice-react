import { Link } from "@inertiajs/react";

export default function Pagination({links}){
    return (
        <nav className="text-center mt-4">
            {links.map((link) => (
                <Link
                    key={link.label}
                    href={link.url}
                    className={"inline-block py-2 px-3 rounded-lg text-gray-200 text-xs " +
                        (link.active ? "bg-gray-950 " : " ") +
                        (!link.url ? " !text-gray-200 cursor-not-allowed " : "hover:bg-gray-950 ")}
                    dangerouslySetInnerHTML={{__html: link.label}}>
                </Link>
            ))}
        </nav>
    )
}
