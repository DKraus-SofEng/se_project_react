import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { Link } from "react-router-dom";
import "./LoginModal.css";

function LoginModal({ isOpen, handleCloseModal, onLogin }) {
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
        },
        validationRules
    );

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (isValid) {
            onLogin(values);
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
            title="Log In"
            buttonText="Log In"
            name="login-form"
            handleSubmit={handleFormSubmit}
            isValid={isValid}
            extraContent={
                <div className="modal__extra">
                    <Link to="register" className="modal__extra-link">
                        or Sign Up
                    </Link>
                </div>
            }
        >
            <fieldset className="modal__fieldset">
                {/* EMAIL INPUT */}
                <label className="modal__label">
                    Email{" "}
                    <input
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
                <label className="modal__label">
                    Password{" "}
                    <input
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
            </fieldset>
        </ModalWithForm>
    );
}

export default LoginModal;
