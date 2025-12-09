import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import avatar from "../../../assets/avatar.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function Header({
    handleOpenAddGarmentModal,
    weatherData,
    handleOpenRegisterModal,
    handleOpenLoginModal,
}) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const now = new Date();
    const dateStr = now.toLocaleString("default", {
        month: "long",
        day: "numeric",
    });

    return (
        <>
            <header className="header">
                <div className="header__side">
                    <Link to="/">
                        <img
                            className="header__logo"
                            src={logo}
                            alt="wtwr logo"
                        />
                    </Link>
                    <p className="header__location">
                        <time className="header__dateTime" dateTime={now}>
                            {dateStr}
                        </time>
                        , {weatherData.location}
                    </p>
                </div>
                <div className="header__side">
                    <ToggleSwitch />
                    {currentUser ? (
                        // Render this is user is logged in
                        <>
                            <button
                                onClick={handleOpenAddGarmentModal}
                                className="header__add-clothes-btn"
                            >
                                + Add clothes
                            </button>
                            <Link
                                className="header__profile-link"
                                to="/profile"
                            >
                                <p className="header__userName">
                                    {currentUser.name}
                                </p>
                                {currentUser.avatar ? (
                                    <img
                                        className="header__avatar"
                                        src={currentUser.avatar}
                                        alt={`${currentUser.name}'s avatar`}
                                    />
                                ) : (
                                    <div className="header__avatar-placeholder">
                                        {currentUser.name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}
                            </Link>
                        </>
                    ) : (
                        // Render this if user is not logged in
                        <>
                            <button
                                className="header__auth-btn"
                                onClick={handleOpenRegisterModal}
                            >
                                Sign Up
                            </button>
                            <button
                                className="header__auth-btn"
                                onClick={handleOpenLoginModal}
                            >
                                Log In
                            </button>
                        </>
                    )}
                </div>
            </header>
        </>
    );
}

export default Header;
