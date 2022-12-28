import axios from "axios";

const URL = "/api/goals";

const getGoals = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(URL, config);

  return response.data;
};

const addGoal = async (goal, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(URL, goal, config);

  return response.data;
};

const deleteGoal = async (id, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${URL}/${id}`, config);

  return response.data;
};

const goalService = {
  getGoals,
  addGoal,
  deleteGoal,
};

export default goalService;
