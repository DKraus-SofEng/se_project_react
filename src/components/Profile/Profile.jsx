// import { Link } from "react-router-dom";
import ClothesSection from "./ClothesSection/ClothesSection";
import Sidebar from "./Sidebar/Sidebar";

import "./Profile.css";

function Profile({
    clothingItems,
    handleOpenItemModal,
    handleOpenAddGarmentModal,
}) {
    return (
        <main className="profile">
            <Sidebar />
            <ClothesSection
                clothingItems={clothingItems}
                handleOpenItemModal={handleOpenItemModal}
                handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            />
        </main>
    );
}

export default Profile;
