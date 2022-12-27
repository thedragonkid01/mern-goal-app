import axios from "axios";

const URL = "/api/users";

const register = async (user) => {
  const response = await axios.post(`${URL}/register`, user);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userLogin) => {
  const response = await axios.post(`${URL}/login`, userLogin);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
