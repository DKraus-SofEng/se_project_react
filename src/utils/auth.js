// BASE_URL for the API
export const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://api.wtwr.bot.nu"
        : "http://localhost:3001";

// SIGNUP (REGISTER) function
export const signup = ({ name, avatar, email, password }) => {
    return fetch(`${BASE_URL}signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, avatar, email, password }),
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
};

// SIGNIN (LOGIN) function
export const signin = (email, password) => {
    return fetch(`${BASE_URL}signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
};

// CHECK TOKEN function
export const checkToken = (token) => {
    return fetch(`${BASE_URL}users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
};
