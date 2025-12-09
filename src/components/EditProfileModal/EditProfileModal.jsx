import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useEffect } from "react";

function EditProfileModal({ isOpen, handleCloseModal, onEditProfile }) {
    const { currentUser } = useContext(CurrentUserContext);
    // Validation rules
    const validationRules = {
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
        setValues,
    } = useFormWithValidation(
        {
            name: currentUser?.name || "",
            avatar: currentUser?.avatar || "",
        },
        validationRules
    );

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (isValid) {
            onEditProfile(values);
            handleReset();
            handleCloseModal();
        }
    };

    const handleModalClose = () => {
        handleReset();
        handleCloseModal();
    };
    // Pre-fill form when modal opens
    useEffect(() => {
        if (isOpen && currentUser) {
            setValues({
                name: currentUser.name || "",
                avatar: currentUser.avatar || "",
            });
        }
    }, [isOpen, currentUser, setValues]);

    return (
        <ModalWithForm
            isOpen={isOpen}
            onClose={handleModalClose}
            title="Change profile data"
            buttonText="Save changes"
            name="edit-profile-form"
            handleSubmit={handleFormSubmit}
            isValid={isValid}
        >
            <fieldset className="modal__fieldset">
                {/* NAME INPUT */}
                <label htmlFor="name-input" className="modal__label">
                    Name*{" "}
                    <input
                        id="name-input-2"
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
                        id="avatar-input-2"
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

export default EditProfileModal;
