import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://645ca33b250a246ae309bcd6.mockapi.io/',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => 'contacts',
      providesTags: ['Contacts'],
    }),

    // deleteProducts: builder.mutation({
    //   query: id => ({ url: `contacts/${id}`, method: 'DELETE' }),
    //   invalidatesTags: ['Contacts'],
    // }),
  }),
});

export const { useGetContactsQuery } = contactsApi;
