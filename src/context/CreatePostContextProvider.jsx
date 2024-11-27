/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const CreatePostContext = createContext({
    isModalOpen: false,
    closeModal: () => { },
    openModal: () => { },
})

export default function CreatePostContextProvider({ children }) {

    const [isModalOpen, setIsModalOpen] = useState(true)

    function openModal() {
        console.log(isModalOpen)
        setIsModalOpen(true)
    }

    function closeModal() {
        console.log(isModalOpen)
        setIsModalOpen(false)
    }

    const values = {
        isModalOpen,
        openModal,
        closeModal
    }

    return (
        <CreatePostContext.Provider value={values}>
            {children}
        </CreatePostContext.Provider>
    )
}

export const useCreatePost = () => useContext(CreatePostContext);