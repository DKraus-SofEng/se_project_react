import "./Sidebar.css";
import avatar from "../../../assets/avatar.png";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

function Sidebar({ handleOpenEditProfileModal, setIsLoggedIn }) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem("jwt");
        navigate("/");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar__row">
                <p className="sidebar__userName">
                    {currentUser?.name || "User"}
                </p>
                <img
                    className="sidebar__avatar"
                    src={currentUser.avatar}
                    alt={
                        currentUser?.name
                            ? `${currentUser.name}'s avatar`
                            : "User avatar"
                    }
                />
            </div>
            <button
                className="sidebar__edit-profile"
                onClick={handleOpenEditProfileModal}
            >
                Change profile data
            </button>
            <button className="sidebar__logout" onClick={handleLogout}>
                Log out
            </button>
        </aside>
    );
}

export default Sidebar;
