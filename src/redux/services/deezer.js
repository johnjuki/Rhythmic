import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deezerApi = createApi({
  reducerPath: 'deezerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cors-anywhere.herokuapp.com/https://api.deezer.com',
  }),
  endpoints: (builder) => ({
    getTopChart: builder.query({ query: () => '/chart' }),
    getAlbumTracks: builder.query({ query: (albumId) => `/album/${albumId}/tracks` }),
  }),
});

export const {
  useGetTopChartQuery,
  useGetAlbumTracksQuery,
} = deezerApi;
