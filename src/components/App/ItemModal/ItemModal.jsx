import "./ItemModal.css";
import closeIcon from "../../../assets/close-icon-white.svg";

function ItemModal({ card, isOpen, onClose, handleOpenConfirmationModal }) {
    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }
    function handleDelete() {
        handleOpenConfirmationModal(card);
    }

    return (
        <div
            className={`modal ${isOpen ? "modal_is-opened" : ""}`}
            onClick={handleOverlayClick}
        >
            <div className="modal__container">
                <button
                    type="button"
                    className="modal__close-btn"
                    onClick={onClose}
                >
                    <img src={closeIcon} alt="close icon" />
                </button>
                <img
                    src={card.imageUrl}
                    alt={card.name}
                    className="modal__image"
                />

                <div className="modal__footer">
                    <div className="modal__footer-row">
                        <h2 className="modal__text">{card.name}</h2>

                        <button
                            type="button"
                            className="modal__delete-btn"
                            onClick={handleDelete}
                        >
                            Delete item
                        </button>
                    </div>
                    <p className="modal__text">{card.weather}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;
