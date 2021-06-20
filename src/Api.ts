import axios from "axios";

axios.defaults.baseURL = "https://api.tvmaze.com";

type image = { medium: string; original: string };
interface Show {
  premiered: Date;
  id: number;
  summary?: string;
  rating: { avergae: number };
  genres: Array<string>;
  name: string;
  image: image;
}

interface Season {
  name: string;
  number: number;
  url: string;
  episodeOrder: number;
}

interface Episode {
  name: string;
  season: number;
  url: string;
  image: image;
  runtime: number;
  number: number;
}

const extractShowDetails = (data: Show): Show => ({
  name: data.name,
  premiered: data.premiered,
  id: data.id,
  genres: data.genres,
  rating: data.rating,
  image: data.image,
  summary: data.summary,
});

const extractSeasonDetails = (data: Season): Season => ({
  number: data.number,
  url: data.url,
  episodeOrder: data.episodeOrder,
  name: data.name,
});

const extractEpisodeDetails = (data: Episode): Episode => ({
  number: data.number,
  url: data.url,
  name: data.name,
  image: data.image,
  runtime: data.runtime,
  season: data.season,
});

export const searchShows = async (query: string) => {
  try {
    const { data } = await axios.get(`/search/shows`, { params: { q: query } });
    return Promise.resolve(
      data.map((d: { show: Show }) => extractShowDetails(d.show))
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchShowById = async (id: string) => {
  try {
    const { data: details } = await axios.get(`/shows/${id}`, {
      params: { embed: "cast" },
    });
    const { data: episodes } = await axios.get(`/shows/${id}/episodes`);
    const { data: seasons } = await axios.get(`/shows/${id}/seasons`);

    const showDetails: Show = extractShowDetails(details);

    const showSeasons = seasons.map((data: Season) => ({
      ...extractSeasonDetails(data),
      episodes: episodes
        .filter(({ season }: Episode) => season === data.number)
        .map((data: Episode) => extractEpisodeDetails(data)),
    }));
    return Promise.resolve({ showDetails, showSeasons });
  } catch (error) {
    return Promise.reject(error);
  }
};
