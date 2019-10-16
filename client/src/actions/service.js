import axios from "axios";
export const registerService = async (userData, history) => {
  const res = await axios.post("/api/users/register", userData);
  history.push("/login");
};
