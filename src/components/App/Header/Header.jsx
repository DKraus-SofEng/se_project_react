import logo from "../../../assets/logo.svg";
import avatar from "../../../assets/avatar.png";
import "./Header.css";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ handleOpenAddGarmentModal, weatherData }) {
    const now = new Date();
    const dateStr = now.toLocaleString("default", {
        month: "long",
        day: "numeric",
    });

    return (
        <>
            <header className="header">
                <div className="header__side">
                    <img className="header__logo" src={logo} alt="wtwr logo" />
                    <p className="header__location">
                        <time className="header__dateTime" dateTime={now}>
                            {dateStr}
                        </time>
                        , {weatherData.location}
                    </p>
                </div>
                <div className="header__side">
                    <ToggleSwitch />
                    <button
                        onClick={handleOpenAddGarmentModal}
                        className="header__add-clothes-btn"
                    >
                        + Add clothes
                    </button>
                    <p className="header__userName">Terrence Tegegne</p>
                    <img
                        className="header__avatar"
                        src={avatar}
                        alt="Terrence Tegegne's avatar"
                    />
                </div>
            </header>
        </>
    );
}

export default Header;
