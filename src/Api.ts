import axios from "axios";

axios.defaults.baseURL = "https://api.tvmaze.com";

export const searchShows = async (query: string) => {
  try {
    const { data } = await axios.get(`/search/shows`, { params: { q: query } });
    return Promise.resolve(data.map((d: any) => d.show));
  } catch (error) {
    return Promise.reject(error);
  }
};
