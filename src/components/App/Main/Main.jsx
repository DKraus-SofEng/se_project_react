import { useMemo } from "react";
import { useCurrentTemperatureUnit } from "../../../contexts/CurrentTemperatureUnitContext.jsx";

import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";

function Main({
    clothingItems,
    handleOpenItemModal,
    weatherData,
    getWeatherCondition,
    isLoggedIn,
    currentUser,
    onCardLike,
}) {
    const { currentTempUnit = "F" } = useCurrentTemperatureUnit();
    const tempToShow =
        weatherData?.temp?.[currentTempUnit] ?? weatherData?.temp ?? "0";

    const weatherCondition = getWeatherCondition(weatherData.temp.F);

    const itemsToShow = useMemo(() => {
        if (!weatherCondition) return clothingItems;
        return clothingItems.filter(
            (item) =>
                (item.weather || "").toLowerCase() ===
                weatherCondition.toLowerCase()
        );
    }, [clothingItems, weatherCondition]);

    const isItemLiked = (item) =>
        isLoggedIn && item.likes && item.likes.includes(currentUser?._id);

    return (
        <main className="main">
            <WeatherCard weatherData={weatherData} />
            <p className="main__text">
                Today is {tempToShow}&deg; {currentTempUnit} / You may want to
                wear:
            </p>
            <ul className="main__card-list">
                {itemsToShow.map((item) => (
                    <ItemCard
                        key={item._id}
                        clothingItem={item}
                        isLiked={isItemLiked(item)}
                        isLoggedIn={isLoggedIn}
                        onCardLike={onCardLike}
                        onCardClick={handleOpenItemModal}
                    />
                ))}
            </ul>
        </main>
    );
}

export default Main;
