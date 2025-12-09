// import { Link } from "react-router-dom";
import ClothesSection from "./ClothesSection/ClothesSection";
import Sidebar from "./Sidebar/Sidebar";

import "./Profile.css";

function Profile({
    clothingItems,
    handleOpenItemModal,
    handleOpenAddGarmentModal,
    setIsLoggedIn,
    isLoggedIn,
    onCardLike,
    handleOpenEditProfileModal,
}) {
    return (
        <main className="profile">
            <Sidebar
                setIsLoggedIn={setIsLoggedIn}
                handleOpenEditProfileModal={handleOpenEditProfileModal}
            />
            <ClothesSection
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                isLoggedIn={isLoggedIn}
                onCardLike={onCardLike}
            />
        </main>
    );
}

export default Profile;
