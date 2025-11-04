import "./ItemCard.css";

function ItemCard({ clothingItem, onCardClick }) {
    function handleOpenCard() {
        onCardClick(clothingItem);
    }
    return (
        <li className="card">
            <h2 className="card__title">{clothingItem.name}</h2>
            <img
                src={clothingItem.imageUrl}
                alt={clothingItem.name}
                className="card__image"
                onClick={handleOpenCard}
            />
        </li>
    );
}

export default ItemCard;
