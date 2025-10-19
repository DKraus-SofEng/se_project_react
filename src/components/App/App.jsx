import { useState } from "react";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { defaultClothingItems } from "../../utils/ClothingItems";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "./ItemModal/ItemModal";

function App() {
    const [clothingItems, setClothingItems] = useState(defaultClothingItems);
    const [activeModal, setActiveModal] = useState("");
    const [selectedCard, setselectedCard] = useState({});

    function handleOpenItemModal(card) {
        setActiveModal("item-modal");
        setselectedCard(card);
    }

    function handleOpenAddGarmentModal() {
        setActiveModal("add-garment-modal");
    }

    function handleCloseModal() {
        setActiveModal("");
    }

    return (
        <>
            <div className="app">
                <Header handleOpenAddGarmentModal={handleOpenAddGarmentModal} />
                <Main
                    clothingItems={clothingItems}
                    handleOpenItemModal={handleOpenItemModal}
                />
                <Footer />
                <ItemModal
                    card={selectedCard}
                    isOpen={activeModal === "item-modal"}
                    onClose={handleCloseModal}
                />
                <ModalWithForm
                    isOpen={activeModal === "add-garment-modal"}
                    onClose={handleCloseModal}
                    title="New Garment"
                    buttonText="Add Garment"
                    name="add-garment-form"
                >
                    <fieldset className="modal__fieldset">
                        <label
                            htmlFor="add-garment-name-input"
                            className="modal__label"
                        >
                            Name{" "}
                            <input
                                type="text"
                                className="modal__input"
                                placeholder="Name"
                            />
                        </label>
                        <label
                            htmlFor="add-garment-image-input"
                            className="modal__label"
                        >
                            Image
                            <input
                                type="url"
                                className="modal__input"
                                placeholder="Image URL"
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
                                readOnly //to change later//
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
                            />
                            <label className="modal__label" htmlFor="cold">
                                Cold
                            </label>
                        </div>
                    </fieldset>
                </ModalWithForm>
            </div>
        </>
    );
}

export default App;
