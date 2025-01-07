import axios from "axios";

const httpClientPlugin = {
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await axios.get<T>(url);
      return data;
    } catch (error) {
      console.error("Error en la petición GET:", error);
      throw error;
    }
  },
};

export default httpClientPlugin;
