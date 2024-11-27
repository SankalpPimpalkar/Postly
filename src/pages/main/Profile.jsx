import UserDetails from "../../components/UserDetails";
import UserProfileContent from "../../components/UserProfileContent";

export default function Profile() {
    return (
        <div className="w-full h-full max-w-[90rem] mx-auto py-6 px-2 flex flex-col md:flex-row gap-4">
            <UserDetails />
            <UserProfileContent />
        </div>
    )
}
