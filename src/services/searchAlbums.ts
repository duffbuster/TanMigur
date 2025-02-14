export type Album = {
  id: string;
  title: string;
  description: string;
  nsfw: boolean;
  cover: string;
  cover_width: number;
  cover_height: number;
};

const BASE_URL = 'https://api.imgur.com/3/gallery';

/**
 * Searches for an album by keyword
 */
export const searchAlbums = async (
  searchTerm: string,
): Promise<Array<Album>> => {
  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.append('q_all', searchTerm);
  url.searchParams.append('q_type', 'album');

  console.log('searching for albums', searchTerm);

  // This works...
  // https://pokeapi.co/api/v2/pokemon/ditto
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
