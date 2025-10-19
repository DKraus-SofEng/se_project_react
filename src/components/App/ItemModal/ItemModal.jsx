import "./ItemModal.css";
import closeIcon from "../../../assets/close-icon-white.svg";

function ItemModal({ card, isOpen, onClose }) {
    return (
        <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
            <div className="modal__container">
                <button
                    type="button"
                    className="modal__close-btn"
                    onClick={onClose}
                >
                    <img src={closeIcon} alt="close icon" />
                </button>
                <img src={card.link} alt={card.name} className="modal__image" />
                <div className="modal__footer">
                    <h2 className="modal__text">{card.name}</h2>
                    <p className="modal__text">{card.weather}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;
