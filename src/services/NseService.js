import call from "./CommonService";

/*
 * Get NSE Details
 */
const getNse = async () => {
  let apiCall = await call({
    path: "/stocks",
    method: "get",
  });

  return apiCall;
};

const setting_get = async () => {
  let apiCall = await call({
    path: "/setting_nse",
    method: "get",
  });

  return apiCall;
};

export default {
  getNse,
  setting_get,
};
