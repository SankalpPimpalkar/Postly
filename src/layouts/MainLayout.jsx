import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import CreatePostModal from "../components/CreatePostModal"
import { useState } from "react"

export default function MainLayout() {

    const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false)

    function closeCreatePostModal() {
        setIsCreatePostModalOpen(false)
    }
    function openCreatePostModal() {
        setIsCreatePostModalOpen(true)
    }

    return (
        <div className="w-full h-full min-h-dvh">
            <Navbar openModal={openCreatePostModal} />
            <Outlet />
            <CreatePostModal
                isModalOpen={isCreatePostModalOpen}
                closeModal={closeCreatePostModal}
            />
        </div>
    )
}
