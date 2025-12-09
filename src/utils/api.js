import { BASE_URL } from "./auth";

const baseUrl = "http://localhost:3001/";
const token = localStorage.getItem("jwt");

function getClothingItems() {
    return fetch(`${baseUrl}items`).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
}

function addItem({ name, imageUrl, weather, token }) {
    return fetch(`${baseUrl}items`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, imageUrl, weather }),
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
}

function deleteItem(id, token) {
    return fetch(`${baseUrl}items/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        if (res.ok) {
            return Promise.resolve();
        }
        return Promise.reject(`Error: ${res.status}`);
    });
}

function getUserInfo(token) {
    return fetch(`${BASE_URL}users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}
function updateUserProfile({ name, avatar, token }) {
    return fetch(`${BASE_URL}users/me`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, avatar }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
}

function addCardLike(id, token) {
    return fetch(`${BASE_URL}items/${id}/likes`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
}
function removeCardLike(id, token) {
    return fetch(`${BASE_URL}items/${id}/likes`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
        },
    }).then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
}
export {
    getClothingItems,
    addItem,
    deleteItem,
    getUserInfo,
    addCardLike,
    removeCardLike,
    updateUserProfile,
};
