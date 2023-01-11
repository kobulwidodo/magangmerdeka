import axios from "axios";

const BASE_URL = "https://api.kampusmerdeka.kemdikbud.go.id/";

export default axios.create({
  baseURL: BASE_URL,
});
