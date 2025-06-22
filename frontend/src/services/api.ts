import axios from "axios";

import { env } from "@/config/environment.config";

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL + "/api",
});

export default api;
