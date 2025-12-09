import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./RegisterModal.css";
import { signup } from "../../utils/auth";

function RegisterModal({ isOpen, handleCloseModal, onRegister, handleOpenLoginModal }) {
    // Validation rules
    const validationRules = {
        email: {
            required: { message: "Email is required" },
            pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Please enter a valid email address",
            },
        },
        password: {
            required: { message: "Password is required" },
            minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
            },
        },
        name: {
            required: { message: "Name is required" },
            minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
            },
            maxLength: {
                value: 30,
                message: "Name must be no more than 30 characters",
            },
        },
        avatar: {
            required: { message: "An image URL is required" },
            pattern: {
                value: /^https?:\/\/.+\.(jpg|jpeg|png|gif|bmp|webp)(\?.*)?$/i,
                message:
                    "Please enter a valid image URL (jpg, jpeg, png, gif, bmp, webp)",
            },
        },
    };

    const {
        values,
        errors,
        isValid,
        handleChange,
        handleBlur,
        handleReset,
        getFieldError,
    } = useFormWithValidation(
        {
            email: "",
            password: "",
            name: "",
            avatar: "",
        },
        validationRules
    );

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (isValid) {
            onRegister(values);
            handleReset();
            handleCloseModal();
        }
    };

    const handleModalClose = () => {
        handleReset();
        handleCloseModal();
    };
    return (
        <ModalWithForm
            isOpen={isOpen}
            onClose={handleModalClose}
            title="Sign Up"
            buttonText="Sign Up"
            name="sign-up-form"
            handleSubmit={handleFormSubmit}
            isValid={isValid}
            extraContent={
                <div className="modal__extra">
                    <button
                        type="button"
                        className="modal__extra-link"
                        onClick={handleOpenLoginModal}
                    >
                        or Login
                    </button>
                </div>
            }
        >
            <fieldset className="modal__fieldset">
                {/* EMAIL INPUT */}
                <label htmlFor="email-input" className="modal__label">
                    Email*{" "}
                    <input
                        id="email-input"
                        name="email"
                        type="email"
                        className={`modal__input ${
                            getFieldError("email")
                                ? "modal__input_type_error"
                                : ""
                        }`}
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    {getFieldError("email") && (
                        <span className="modal__error">
                            {getFieldError("email")}
                        </span>
                    )}
                </label>
                {/* PASSWORD INPUT */}
                <label htmlFor="password-input" className="modal__label">
                    Password*{" "}
                    <input
                        id="password-input"
                        name="password"
                        type="password"
                        className={`modal__input ${
                            getFieldError("password")
                                ? "modal__input_type_error"
                                : ""
                        }`}
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    {getFieldError("password") && (
                        <span className="modal__error">
                            {getFieldError("password")}
                        </span>
                    )}
                </label>

                {/* NAME INPUT */}
                <label htmlFor="name-input" className="modal__label">
                    Name*{" "}
                    <input
                        id="name-input"
                        name="name"
                        type="text"
                        className={`modal__input ${
                            getFieldError("name")
                                ? "modal__input_type_error"
                                : ""
                        }`}
                        placeholder="Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                    />
                    {getFieldError("name") && (
                        <span className="modal__error">
                            {getFieldError("name")}
                        </span>
                    )}
                </label>
                {/* AVATAR INPUT */}
                <label htmlFor="avatar-input" className="modal__label">
                    Avatar URL*{" "}
                    <input
                        id="avatar-input"
                        name="avatar"
                        type="url"
                        className={`modal__input ${
                            getFieldError("avatar")
                                ? "modal__input_type_error"
                                : ""
                        }`}
                        placeholder="Avatar URL"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.avatar}
                    />
                    {getFieldError("avatar") && (
                        <span className="modal__error">
                            {getFieldError("avatar")}
                        </span>
                    )}
                </label>
            </fieldset>
        </ModalWithForm>
    );
}

export default RegisterModal;
