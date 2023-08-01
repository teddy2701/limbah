// authActions.js
export const login = (userData) => {
  return (dispatch) => {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
  };
};
