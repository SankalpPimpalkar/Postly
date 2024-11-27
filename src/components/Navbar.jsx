/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContextProvider"

const navs = [
    {
        id: 1,
        slug: '/explore',
        name: 'Explore'
    },
    {
        id: 2,
        slug: '/people',
        name: 'People'
    },
]

export default function Navbar({ openModal }) {

    const { user } = useAuth();

    return (
        <nav className="w-full shadow bg-white text-gray-700 py-3 px-5">
            <div className="w-full md:max-w-[90rem] mx-auto flex items-center justify-between">
                <Link to={'/'} className="text-lg font-bold">
                    Postly
                </Link>

                <ul className="flex items-center gap-8">
                    <li onClick={openModal} className="font-semibold text-sm cursor-pointer">
                        Create
                    </li>

                    {
                        navs.map(nav => (
                            <Link to={nav.slug} key={nav.id} className="font-semibold text-sm">
                                {nav.name}
                            </Link>
                        ))
                    }

                    <Link to={`/profile/${user?.$id}`}>
                        <img
                            className="w-7 h-7 rounded-full"
                            src={user?.avatar}
                            alt={user?.username}
                            title={user?.username}
                        />
                    </Link>
                </ul>
            </div>
        </nav>
    )
}
