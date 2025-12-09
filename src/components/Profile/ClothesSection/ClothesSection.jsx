import "./ClothesSection.css";
import ItemCard from "../../App/Main/ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ClothesSection({
    clothingItems,
    handleOpenItemModal,
    handleOpenAddGarmentModal,
    isLoggedIn,
    onCardLike,
}) {
    const { currentUser } = useContext(CurrentUserContext);
    console.log("currentUser", currentUser);
    console.log("clothingItem", clothingItems);

    const userItems = clothingItems.filter(
        (item) =>
            item.owner &&
            (typeof item.owner === "string" ? item.owner : item.owner._id) ===
                currentUser._id
    );
    console.log("userItems", userItems);
    return (
        <section className="clothes-section">
            <div className="clothes-section__row">
                <p className="clothes-section__text">Your Items</p>
                <button
                    onClick={handleOpenAddGarmentModal}
                    className="clothes-section__btn"
                >
                    + Add new
                </button>
            </div>
            <ul className="clothes-section__card-list">
                {userItems.map((item) => (
                    <ItemCard
                        key={item._id}
                        clothingItem={item}
                        isLoggedIn={isLoggedIn}
                        isLiked={
                            isLoggedIn &&
                            item.likes &&
                            item.likes.includes(currentUser?._id)
                        }
                        onCardLike={onCardLike}
                        onCardClick={handleOpenItemModal}
                    />
                ))}
            </ul>
        </section>
    );
}

export default ClothesSection;
