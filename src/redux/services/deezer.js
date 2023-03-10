import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deezerApi = createApi({
  reducerPath: 'deezerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://api.deezer.com',
  }),
  endpoints: (builder) => ({
    getTopChart: builder.query({ query: () => '/chart' }),
    getAlbumTracks: builder.query({ query: (albumid) => `/album/${albumid}/tracks` }),
    getSongDetails: builder.query({ query: ({ songid }) => `/track/${songid}` }),
  }),
});

export const {
  useGetTopChartQuery,
  useGetAlbumTracksQuery,
  useGetSongDetailsQuery,
} = deezerApi;
