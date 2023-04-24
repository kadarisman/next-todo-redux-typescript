import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function Navbar() {
    const router = useRouter();
    const path = router.pathname;
    return (
        <nav className="fixed bg-gray-900 mx-auto w-full">
            <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-center h-16">
                <div className="hidden md:block">
                    <div className="flex space-x-4">
                        <a  className={`text-gray-300 hover:bg-gray-700 ${path ==="/" ? "bg-gray-700" : ""} hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
                            <Link href="/">
                                Todo List
                            </Link> 
                        </a>
                        <a className={`text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>
                            <Link href="/image">
                                Image List
                            </Link>
                        </a>
                    </div>
                </div>
            </div>
        </nav>


    )
}
