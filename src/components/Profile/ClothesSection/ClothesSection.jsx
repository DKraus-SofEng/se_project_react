import "./ClothesSection.css";
import ItemCard from "../../App/Main/ItemCard/ItemCard";

function ClothesSection({
    clothingItems,
    handleOpenItemModal,
    handleOpenAddGarmentModal,
}) {
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
                {clothingItems.map((item) => (
                    <ItemCard
                        key={item._id}
                        clothingItem={item}
                        onCardClick={handleOpenItemModal}
                    />
                ))}
            </ul>
        </section>
    );
}

export default ClothesSection;
