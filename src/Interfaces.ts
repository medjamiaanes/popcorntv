type image = { medium: string; original: string };
type rating = { average: number };

export interface Show {
  premiered: Date;
  id: number;
  summary?: string;
  rating: rating;
  genres: Array<string>;
  name: string;
  image: image;
}

export interface Season {
  name: string;
  number: number;
  url: string;
  episodeOrder: number;
  summary: string;
  premiereDate: Date;
  image: image;
}
