import axios from "axios";
import { Show, Season } from "./Interfaces";
axios.defaults.baseURL = "https://api.tvmaze.com";

const extractShowDetails = (data: Show): Show => ({
  name: data.name,
  premiered: data.premiered,
  id: data.id,
  genres: data.genres,
  rating: data.rating,
  image: data.image,
  summary: data.summary?.replace(/<p>|<b>|<\/p>|<\/b>/g, "") || "",
});

const extractSeasonDetails = (data: Season): Season => ({
  number: data.number,
  url: data.url,
  episodeOrder: data.episodeOrder,
  name: data.name,
  summary: data.summary?.replace(/<p>|<b>|<\/p>|<\/b>/g, "") || "",
  premiereDate: data.premiereDate,
  image: data.image,
});

type singleShow = { showDetails: Show; showSeasons: Array<Season> };

export const searchShows = async (query: string): Promise<Show | any> => {
  try {
    const { data } = await axios.get(`/search/shows`, { params: { q: query } });
    return Promise.resolve(
      data.map((d: { show: Show }) => extractShowDetails(d.show))
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchShowById = async (id: string): Promise<singleShow | any> => {
  try {
    const { data: details } = await axios.get(`/shows/${id}`, {
      params: { embed: "cast" },
    });
    const { data: seasons } = await axios.get(`/shows/${id}/seasons`);

    const showDetails: Show = extractShowDetails(details);
    const showSeasons = seasons.map((data: Season) =>
      extractSeasonDetails(data)
    );

    return Promise.resolve({ showDetails, showSeasons });
  } catch (error) {
    return Promise.reject(error);
  }
};
