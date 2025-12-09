import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "./ItemModal/ItemModal";
import ProtectedRoute from "../ProtectedRoute.jsx";

import { getWeatherData } from "../../utils/weatherApi";
import {
    getCurrentPosition,
    getFallbackCoordinates,
} from "../../utils/geolocation";
import {
    addItem,
    getClothingItems,
    deleteItem,
    addCardLike,
    removeCardLike,
} from "../../utils/api";
import { CurrentTemperatureUnitProvider } from "../../contexts/CurrentTemperatureUnitContext.jsx";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { signup, signin, checkToken } from "../../utils/auth";
import { getUserInfo } from "../../utils/api";
import { updateUserProfile } from "../../utils/api";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import { defaultClothingItems } from "../../utils/ClothingItems.js";

function App() {
    const [activeModal, setActiveModal] = useState("");
    const [clothingItems, setClothingItems] = useState([]);
    const [selectedCard, setselectedCard] = useState({});
    const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
    const [cardToDelete, setCardToDelete] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("jwt"));
    const [currentUser, setCurrentUser] = useState(null);

    function handleOpenRegisterModal() {
        setActiveModal("register-modal");
    }
    function handleCloseRegisterModal() {
        setActiveModal("");
    }

    // REGISTER/Signup function
    function handleRegister(values) {
        signup(values)
            .then(() => {
                return signin(values.email, values.password);
            })
            .then((res) => {
                if (res && res.token) {
                    localStorage.setItem("jwt", res.token);
                    setToken(res.token);
                    setIsLoggedIn(true);
                    handleCloseRegisterModal();
                } else {
                    console.error(
                        "Registration succeeded but no token received."
                    );
                }
            })
            .catch(console.error);
    }

    function handleOpenLoginModal() {
        setActiveModal("login-modal");
    }
    function handleCloseLoginModal() {
        setActiveModal("");
    }
    // LOGIN function
    function handleLogin(values) {
        signin(values.email, values.password)
            .then((res) => {
                if (res && res.token) {
                    localStorage.setItem("jwt", res.token);
                    setToken(res.token);
                    setIsLoggedIn(true);
                    handleCloseLoginModal();
                } else {
                    console.error("Login failed:  no token received.");
                }
            })
            .catch((err) => {
                console.error("Login error:", err);
            });
    }
    // LOGOUT function
    function handleLogout() {
        localStorage.removeItem("jwt");
        setToken(null);
        setIsLoggedIn(false);
        navigate("/");
    }

    function handleOpenEditProfileModal() {
        setActiveModal("edit-profile-modal");
    }

    useEffect(() => {
        if (!token) return;

        getUserInfo(token)
            .then((userData) => {
                setIsLoggedIn(true);
                setCurrentUser(userData);
            })
            .catch((err) => {
                console.error("Token check failed:", err);
                setIsLoggedIn(false);
                setCurrentUser(null);
            });
    }, [token]);

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
        addItem({ ...inputValues, token })
            .then((res) => {
                setClothingItems([res.data, ...clothingItems]);
            })
            .catch(console.error);
    }

    function handleDeleteItem() {
        deleteItem(cardToDelete._id, token)
            .then(() => {
                const result = clothingItems.filter((clothingItem) => {
                    return clothingItem._id !== cardToDelete._id;
                });
                setClothingItems(result);
                handleCloseModal();
            })
            .catch(console.error);
    }
    function handleCardLike({ id, isLiked }) {
        const token = localStorage.getItem("jwt");
        if (!isLiked) {
            // Like the item
            addCardLike(id, token)
                .then((updatedCard) => {
                    setClothingItems((cards) =>
                        cards.map((item) =>
                            item._id === id ? updatedCard.data : item
                        )
                    );
                })
                .catch(console.error);
        } else {
            // Unlike the item
            removeCardLike(id, token)
                .then((updatedCard) => {
                    setClothingItems((cards) =>
                        cards.map((item) =>
                            item._id === id ? updatedCard.data : item
                        )
                    );
                })
                .catch(console.error);
        }
    }
    function handleEditProfile(values) {
        const token = localStorage.getItem("jwt");
        updateUserProfile({ ...values, token })
            .then((updatedUser) => {
                setCurrentUser(updatedUser);
            })
            .catch((err) => {
                console.error("Profile update failed:", err);
            });
    }

    useEffect(() => {
        // First try to get user's current location
        getCurrentPosition()
            .then((coordinates) => {
                console.log(
                    "✅ Geolocation SUCCESS - Using user location:",
                    coordinates
                );
                return getWeatherData(coordinates);
            })
            .catch((locationError) => {
                console.warn("❌ Geolocation FAILED:", locationError.message);
                console.log("🔄 Using fallback coordinates (Denver)");
                // If geolocation fails, use fallback coordinates
                const fallbackCoords = getFallbackCoordinates();
                console.log("📍 Fallback coordinates:", fallbackCoords);
                return getWeatherData(fallbackCoords);
            })
            .then((data) => {
                console.log("🌤️ Weather data received for:", data.location);
                setWeatherData(data);
            })
            .catch((weatherError) => {
                console.error("Failed to get weather data:", weatherError);
            });
    }, []);

    useEffect(() => {
        getClothingItems()
            .then((dbItems) => {
                setClothingItems([...dbItems, ...defaultClothingItems]);
            })
            .catch(console.error);
    }, [isLoggedIn]);

    return (
        <>
            <CurrentUserContext.Provider
                value={{ currentUser, setCurrentUser }}
            >
                <CurrentTemperatureUnitProvider>
                    <div className="app">
                        <Header
                            weatherData={weatherData}
                            handleOpenAddGarmentModal={
                                handleOpenAddGarmentModal
                            }
                            handleOpenRegisterModal={handleOpenRegisterModal}
                            handleOpenLoginModal={handleOpenLoginModal}
                        />
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Main
                                        weatherData={weatherData}
                                        clothingItems={clothingItems}
                                        handleOpenItemModal={
                                            handleOpenItemModal
                                        }
                                        getWeatherCondition={
                                            getWeatherCondition
                                        }
                                        isLoggedIn={isLoggedIn}
                                        currentUser={currentUser}
                                        onCardLike={handleCardLike}
                                    />
                                }
                            ></Route>
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                                        <Profile
                                            clothingItems={clothingItems}
                                            handleOpenItemModal={
                                                handleOpenItemModal
                                            }
                                            handleOpenAddGarmentModal={
                                                handleOpenAddGarmentModal
                                            }
                                            handleOpenEditProfileModal={
                                                handleOpenEditProfileModal
                                            }
                                            setIsLoggedIn={setIsLoggedIn}
                                            isLoggedIn={isLoggedIn}
                                            onCardLike={handleCardLike}
                                        />
                                    </ProtectedRoute>
                                }
                            ></Route>
                        </Routes>

                        <Footer />
                        <RegisterModal
                            isOpen={activeModal === "register-modal"}
                            handleCloseModal={handleCloseRegisterModal}
                            onRegister={handleRegister}
                            handleOpenLoginModal={handleOpenLoginModal}
                        />
                        <LoginModal
                            isOpen={activeModal === "login-modal"}
                            handleCloseModal={handleCloseLoginModal}
                            onLogin={handleLogin}
                        />
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

                        <EditProfileModal
                            isOpen={activeModal === "edit-profile-modal"}
                            handleCloseModal={handleCloseModal}
                            onEditProfile={handleEditProfile}
                        />
                        <DeleteConfirmationModal
                            isOpen={activeModal === "delete-confirmation-modal"}
                            onClose={handleCloseModal}
                            onConfirm={handleDeleteItem}
                        />
                    </div>
                </CurrentTemperatureUnitProvider>
            </CurrentUserContext.Provider>
        </>
    );
}

export default App;
