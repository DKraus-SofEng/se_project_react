import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";

function AddItemModal({ isOpen, handleCloseModal, onAddItem }) {
    const { values, handleChange, handleReset } = useForm({
        name: "",
        imageUrl: "",
        weather: "hot",
    });

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onAddItem(values);
        handleReset();
    };
    return (
        <ModalWithForm
            isOpen={isOpen}
            onClose={handleCloseModal}
            title="New Garment"
            buttonText="Add Garment"
            name="add-garment-form"
            handleSubmit={handleFormSubmit}
        >
            <fieldset className="modal__fieldset">
                <label htmlFor="add-name-input" className="modal__label">
                    Name{" "}
                    <input
                        id="add-name-input"
                        name="name"
                        type="text"
                        className="modal__input"
                        placeholder="Name"
                        onChange={handleChange}
                        value={values.name}
                    />
                </label>
                <label
                    htmlFor="add-garment-image-input"
                    className="modal__label"
                >
                    Image
                    <input
                        id="add-garment-image-input"
                        name="imageUrl"
                        type="url"
                        className="modal__input"
                        placeholder="Image URL"
                        onChange={handleChange}
                        value={values.imageUrl}
                    />
                </label>
            </fieldset>
            <fieldset className="modal__fieldset modal__fieldset_type_radio">
                <legend className="modal__legend">
                    Select the weather type:
                </legend>

                <div>
                    <input
                        className="modal__radio-btn"
                        type="radio"
                        id="hot"
                        name="weather"
                        value="hot"
                        onChange={handleChange}
                        checked={values.weather === "hot"}
                    />
                    <label className="modal__label" htmlFor="hot">
                        Hot
                    </label>
                </div>

                <div>
                    <input
                        className="modal__radio-btn"
                        type="radio"
                        id="warm"
                        name="weather"
                        value="warm"
                        checked={values.weather === "warm"}
                        onChange={handleChange}
                    />
                    <label className="modal__label" htmlFor="warm">
                        Warm
                    </label>
                </div>

                <div>
                    <input
                        className="modal__radio-btn"
                        type="radio"
                        id="cold"
                        name="weather"
                        value="cold"
                        checked={values.weather === "cold"}
                        onChange={handleChange}
                    />
                    <label className="modal__label" htmlFor="cold">
                        Cold
                    </label>
                </div>
            </fieldset>
        </ModalWithForm>
    );
}

export default AddItemModal;
