import logo from "../../../assets/logo.svg";
import avatar from "../../../assets/avatar.png";
import "./Header.css";

function Header({ handleOpenAddGarmentModal }) {
    const now = new Date();
    const dateStr = now.toLocaleString("default", {
        month: "long",
        day: "numeric",
    });
    return (
        <>
            <header className="header">
                <img className="header__logo" src={logo} alt="wtwr logo" />
                <p className="header__location">
                    <time className="header__dateTime" dateTime={now}>
                        {dateStr}
                    </time>
                    , location
                </p>
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
            </header>
        </>
    );
}

export default Header;
