export type Image = {
  link: string;
  width: number;
  height: number;
  id: string;
  title: string;
  description: string;
  type: string;
};

export type Album = {
  id: string;
  title: string;
  description: string;
  nsfw: boolean;
  cover: string;
  cover_width: number;
  cover_height: number;
  images: Array<Image>;
};

export const BASE_URL = 'https://api.imgur.com/3';

/**
 * Searches for albums by a search term
 *
 * @param searchTerm term to search for
 * @returns an array of albums
 */
export const searchAlbums = async (
  searchTerm: string,
): Promise<Array<Album>> => {
  const url = new URL(`${BASE_URL}/gallery/search`);
  url.searchParams.append('q_all', searchTerm);
  url.searchParams.append('q_type', 'album');

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_IMGUR_CLIENT_ID}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch albums');
  }

  const data = await response.json();

  return data.data;
};
