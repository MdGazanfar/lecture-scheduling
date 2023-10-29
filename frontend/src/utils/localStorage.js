export const persistToken = (token) => {
    localStorage.setItem("authToken", token);
};

export const readToken = () => {
    return localStorage.getItem("authToken");
};

export const deleteToken = () => localStorage.removeItem("authToken");

export const persistUserData = (type) => {
    localStorage.setItem("userType", type);
};

export const readUserData = () => {
    return localStorage.getItem("userType");
};

export const deleteUserData = () => localStorage.removeItem("userType");
