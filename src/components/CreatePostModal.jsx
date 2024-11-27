/* eslint-disable react/prop-types */
import { useEffect, useState, useRef, forwardRef } from "react";
import { X, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { useAuth } from "../context/AuthContextProvider";
import { createNewPost } from "../lib/appwrite/database";
import { useNavigate } from "react-router-dom";

export default function CreatePostModal({ isModalOpen, closeModal }) {
    const [selectedImages, setSelectedImages] = useState([]);
    const { user } = useAuth();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [postDetails, setPostDetails] = useState({
        images: [],
        tags: [],
        creator: '',
        description: ''
    });
    const [tag, setTag] = useState("");
    const fileInputRef = useRef(null);
    const [activeSection, setActiveSection] = useState("image");
    const navigate = useNavigate()


    useEffect(() => {
        setPostDetails({
            ...postDetails,
            creator: user?.$id
        })
        document.body.style.overflow = isModalOpen ? "hidden" : "auto";
        return () => (document.body.style.overflow = "auto");
    }, [isModalOpen, user]);

    const resetModal = () => {
        setPostDetails({ images: [], tags: [] });
        setSelectedImages([]);
        setCurrentIndex(0);
        setActiveSection("image"); // Reset to image section
        if (fileInputRef.current) fileInputRef.current.value = "";
        closeModal();
    };

    const addTag = () => {
        if (tag.trim()) {
            setPostDetails((prev) => ({
                ...prev,
                tags: [...prev.tags, tag],
            }));
            setTag("");
        }
    };

    const handleDescription = (value) => {
        setPostDetails({
            ...postDetails,
            description: value
        })
    }

    const removeTag = (tagToRemove) => {
        setPostDetails((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tagToRemove),
        }));
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const urls = files.map((file) => URL.createObjectURL(file));

        setSelectedImages(urls);
        setPostDetails((prev) => ({ ...prev, images: files }));
        setCurrentIndex(0);
    };

    const removeImage = (index) => {
        setSelectedImages((prev) => {
            const updated = prev.filter((_, i) => i !== index);
            setPostDetails((prevDetails) => ({
                ...prevDetails,
                images: prevDetails.images.filter((_, i) => i !== index),
            }));
            setCurrentIndex((prevIndex) =>
                updated.length > 0 ? Math.min(prevIndex, updated.length - 1) : 0
            );
            return updated;
        });
    };

    const handleNavigation = (direction) => {
        setCurrentIndex((prev) =>
            direction === "next"
                ? (prev + 1) % selectedImages.length
                : (prev - 1 + selectedImages.length) % selectedImages.length
        );
    };

    const toggleSection = () => {
        setActiveSection((prev) => (prev === "image" ? "form" : "image"));
    };

    const handlePost = async () => {
        try {

            const post = await createNewPost(postDetails)

            if (post) {
                console.log(post);
                navigate('/')
                closeModal()
            }

        } catch (error) {
            console.log(error)
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed bg-black/50 text-white w-full h-full top-0 left-0 flex items-center justify-center px-5">
            <div className="bg-gray-50 w-full max-w-2xl h-full rounded-md max-h-[30rem] overflow-hidden relative">
                <div className="border-b p-2 flex items-center justify-center relative">
                    <h1 className="text-gray-700 font-medium text-center">
                        Create new Post
                    </h1>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between absolute top-1 bottom-1 right-1">
                        {activeSection === "form" && (
                            <button
                                onClick={toggleSection}
                                className="text-indigo-600 px-4 py-2 rounded text-sm font-medium">
                                Previous
                            </button>
                        )}
                        {activeSection === "image" && (
                            <button
                                onClick={toggleSection}
                                className="text-indigo-600 px-4 py-2 rounded text-sm font-medium">
                                Next
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex w-full h-full relative">
                    {/* Image Section */}
                    <div
                        className={`${activeSection === "image" ? "block" : "hidden"
                            } w-full h-full`}
                    >
                        <div className="text-gray-700 bg-gray-800 w-full h-full flex items-center justify-center overflow-hidden relative">
                            {selectedImages.length > 0 ? (
                                <ImagePreview
                                    images={selectedImages}
                                    currentIndex={currentIndex}
                                    onNext={() => handleNavigation("next")}
                                    onPrev={() => handleNavigation("prev")}
                                    onDelete={() => removeImage(currentIndex)}
                                />
                            ) : (
                                <FileInput
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                />
                            )}
                        </div>
                    </div>

                    {/* Form Section */}
                    <div
                        className={`${activeSection === "form" ? "block" : "hidden"
                            } w-full h-full p-5 overflow-y-auto`}
                    >
                        <UserHeader user={user} />
                        <textarea
                            className="bg-indigo-100 border border-indigo-200 rounded resize-none w-full mt-5 p-2 outline-none text-gray-500"
                            name="description"
                            placeholder="Add description"
                            value={postDetails.description}
                            onChange={(e) => handleDescription(e.target.value)}
                            rows={7}
                        />
                        <TagInput
                            tag={tag}
                            setTag={setTag}
                            onAdd={addTag}
                            tags={postDetails.tags}
                            onRemove={removeTag}
                        />
                        <button
                            onClick={handlePost}
                            className="mt-5 bg-indigo-500 text-gray-100 w-full p-2 font-medium rounded"
                        >
                            Post
                        </button>
                    </div>
                </div>

            </div>
            <button onClick={resetModal} className="absolute top-0 right-0 p-4">
                <X className="w-8 h-8" />
            </button>
        </div>
    );
}

/* Helper Components */
const FileInput = forwardRef(function FileInput({ onChange }, ref) {
    return (
        <>
            <label
                className="bg-indigo-500 active:bg-indigo-600 px-3 py-2 rounded-md text-gray-100 font-medium cursor-pointer"
                htmlFor="images"
            >
                Select from computer
            </label>
            <input
                ref={ref} // Attach ref to file input
                className="hidden"
                id="images"
                type="file"
                onChange={onChange}
                multiple
            />
        </>
    );
});

const ImagePreview = ({ images, currentIndex, onNext, onPrev, onDelete }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center bg-black">
            <img
                src={images[currentIndex]}
                alt={`Preview ${currentIndex + 1}`}
                className="w-full h-full object-contain rounded-l"
            />
            {images.length > 1 && (
                <>
                    <button
                        className="absolute left-4 bg-black/30 p-2 rounded-full text-white"
                        onClick={onPrev}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        className="absolute right-4 bg-black/30 p-2 rounded-full text-white"
                        onClick={onNext}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </>
            )}
            <button
                className="absolute bottom-8 right-0 m-4 bg-black/30 p-2 rounded-full text-white"
                onClick={onDelete}
            >
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    );
};

const UserHeader = ({ user }) => {
    return (
        <div className="flex items-center gap-4">
            <img
                className="rounded-full w-10 aspect-square"
                src={user?.avatar}
                alt={user?.username}
            />
            <h3 className="font-semibold text-lg">{user?.username}</h3>
        </div>
    );
};

const TagInput = ({ tag, setTag, onAdd, tags, onRemove }) => {
    return (
        <>
            <div className="mt-2 flex items-center gap-2">
                <input
                    className="bg-indigo-100 border border-indigo-200 rounded resize-none w-full p-2 text-sm outline-none text-gray-600"
                    type="text"
                    placeholder="Add tags"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
                <button
                    onClick={onAdd}
                    className="bg-indigo-500 text-gray-100 px-4 py-2 text-sm rounded font-medium"
                >
                    Add
                </button>
            </div>
            <div className="mt-2 flex flex-wrap w-full gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="flex items-center gap-2 px-4 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
                    >
                        {tag}
                        <X
                            onClick={() => onRemove(tag)}
                            className="w-4 h-4 cursor-pointer"
                        />
                    </span>
                ))}
            </div>
        </>
    );
};
