import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "./ItemModal/ItemModal";
import { getWeatherData } from "../../utils/weatherApi";
import { addItem, getClothingItems, deleteItem } from "../../utils/api";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
    const [clothingItems, setClothingItems] = useState([]);
    const [activeModal, setActiveModal] = useState("");
    const [selectedCard, setselectedCard] = useState({});
    const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
    const [cardToDelete, setCardToDelete] = useState(null);

    function handleOpenItemModal(card) {
        setActiveModal("item-modal");
        setselectedCard(card);
    }

    function handleOpenAddGarmentModal() {
        setActiveModal("add-garment-modal");
    }

    function handleOpenConfirmationModal(card) {
        setActiveModal("delete-confirmation-modal");
        setCardToDelete(card);
    }
    function handleCloseModal() {
        setActiveModal("");
        setCardToDelete(null);
    }

    function getWeatherCondition(temperature) {
        if (temperature >= 82) {
            return "hot";
        } else if (temperature >= 66) {
            return "warm";
        } else {
            return "cold";
        }
    }

    function handleAddItemSubmit(inputValues) {
        addItem(inputValues)
            .then((data) => {
                setClothingItems([data, ...clothingItems]);
            })
            .catch(console.error);
    }

    function handleDeleteItem() {
        deleteItem(cardToDelete._id)
            .then(() => {
                const result = clothingItems.filter((clothingItem) => {
                    return clothingItem._id !== cardToDelete._id;
                });
                setClothingItems(result);
                handleCloseModal();
            })
            .catch(console.error);
    }

    useEffect(() => {
        getWeatherData()
            .then((data) => {
                setWeatherData(data);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        getClothingItems()
            .then((items) => {
                const sortedItems = items.sort((a, b) => b._id - a._id);
                setClothingItems(sortedItems);
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <CurrentTemperatureUnitProvider>
                <div className="app">
                    <Header
                        weatherData={weatherData}
                        handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                    />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Main
                                    weatherData={weatherData}
                                    clothingItems={clothingItems}
                                    handleOpenItemModal={handleOpenItemModal}
                                    getWeatherCondition={getWeatherCondition}
                                />
                            }
                        ></Route>
                        <Route
                            path="/profile"
                            element={
                                <Profile
                                    clothingItems={clothingItems}
                                    handleOpenItemModal={handleOpenItemModal}
                                    handleOpenAddGarmentModal={
                                        handleOpenAddGarmentModal
                                    }
                                />
                            }
                        ></Route>
                    </Routes>

                    <Footer />
                    <ItemModal
                        card={selectedCard}
                        isOpen={activeModal === "item-modal"}
                        onClose={handleCloseModal}
                        handleOpenConfirmationModal={
                            handleOpenConfirmationModal
                        }
                    />
                    <AddItemModal
                        isOpen={activeModal === "add-garment-modal"}
                        handleCloseModal={handleCloseModal}
                        onAddItem={handleAddItemSubmit}
                    />
                    <DeleteConfirmationModal
                        isOpen={activeModal === "delete-confirmation-modal"}
                        onClose={handleCloseModal}
                        onConfirm={handleDeleteItem}
                    />
                </div>
            </CurrentTemperatureUnitProvider>
        </>
    );
}

export default App;
