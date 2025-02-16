import { Album, BASE_URL } from './searchAlbums';

/**
 * Fetches an album by ID
 *
 * @param albumId ID of the album to fetch
 * @returns the album
 */
export const fetchAlbum = async (albumId: string): Promise<Album> => {
  const url = new URL(`${BASE_URL}/album/${albumId}`);

  const response = await fetch(url, {
    headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_IMGUR_CLIENT_ID}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch album');
  }

  const data = await response.json();

  return data.data;
};
