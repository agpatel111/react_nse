import call from "./CommonService";

/*
 * Login user
 */
const login = async (data) => {
  let apiCall = await call({
    path: "/login",
    method: "post",
    data,
  });

  return apiCall;
};

const add_setting_data = async (data) => {
  let apiCall = await call({
    path: "/setting_nse",
    method: "post",
    data,
  });

  return apiCall;
};

const logout_user = async (data) => {
  let apiCall = await call({
    path: "/Logout",
    method: "post",
    data,
  });

  return apiCall;
};

export default {
  login,
  add_setting_data,
  logout_user,
};
