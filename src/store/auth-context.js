import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  userId: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const retrieveStoredInfo = () => {
  const storedToken = localStorage.getItem("token");
  const storedID = localStorage.getItem("userId");
  return { token: storedToken, id: storedID };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredInfo();
  let initialToken;
  let initialID;
  if (tokenData) {
    initialToken = tokenData.token;
    initialID = tokenData.id;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialID);
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationTime");
  };

  const loginHandler = (token, expirationTime, userId) => {
    setToken(token);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expirationTime", expirationTime);
  };

  const refreshTokenHandler = (newToken, newExpirationTime) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    localStorage.setItem("expirationTime", newExpirationTime);
  };

  const contextValue = {
    token: token,
    userId: userId,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    refreshToken: refreshTokenHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
