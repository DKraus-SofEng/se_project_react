import "./Sidebar.css";
import avatar from "../../../assets/avatar.png";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar__row">
                <p className="sidebar__userName">Terrence Tegegne</p>
                <img
                    className="sidebar__avatar"
                    src={avatar}
                    alt="Terrence Tegegne's avatar"
                />
            </div>
        </aside>
    );
}

export default Sidebar;
