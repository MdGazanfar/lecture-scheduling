export const persistToken = (token) => {
    localStorage.setItem("authToken", token);
};

export const readToken = () => {
    return localStorage.getItem("authToken");
};

export const deleteToken = () => localStorage.removeItem("authToken");
