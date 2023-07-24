import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bacApi = createApi({
  reducerPath: "bacApi",
  tagTypes: ["Ads"],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8090/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().userToken.accessToken;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (build) => ({
    getAllProducts: build.query({
      query: () => ({
        url: "ads",
      }),
      providesTags: ["Products"],
    }),
    addProduct: build.mutation({
      query: (payload) => {
        const searchParams = new URLSearchParams();
        searchParams.append("title", payload.title);
        searchParams.append("description", payload.description);
        searchParams.append("price", payload.price);

        const formData = new FormData();
        for (let i = 0; i < payload.files.length; i++) {
          formData.append("files", payload.files[i]);
        }

        return {
          url: `ads?${searchParams.toString()}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Products", "MyProducts"],
    }),

    addProductText: build.mutation({
      query: (payload) => ({
        url: "/adstext",
        method: "POST",
        body: {
          title: payload.title,
          description: payload.description,
          price: payload.price,
        },
      }),
      invalidatesTags: ["MyProducts", "Products"],
    }),
    editProduct: build.mutation({
      query: ({ ...payload }) => ({
        url: `/ads/${payload.id}`,
        method: "PATCH",
        body: payload.body,
      }),
      invalidatesTags: ["Products", "MyProducts", "Ads"],
    }),
    editImgAds: build.mutation({
      query: ({ ...payload }) => ({
        url: `/ads/${payload.id}/image`,
        method: "POST",
        body: payload.data,
      }),
      invalidatesTags: ["Products", "MyProducts", "Ads"],
    }),
    deleteAddProduct: build.mutation({
      query: (id) => ({
        url: `/ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "MyProducts"],
    }),
    getMyProducts: build.query({
      query: () => ({
        url: "ads/me",
      }),
      providesTags: ["MyProducts"],
    }),
    getProduct: build.query({
      query: (id) => ({
        url: `ads/${id}`,
      }),
      providesTags: ["Ads"],
    }),
    getCommentAds: build.query({
      query: (id) => ({
        url: `ads/${id}/comments`,
      }),
      providesTags: ["Comment"],
    }),
    AddComment: build.mutation({
      query: ({ ...payload }) => ({
        url: `ads/${payload.id}/comments`,
        method: "POST",
        body: {
          text: payload.text,
        },
      }),
      invalidatesTags: ["Comment"],
    }),
    getUser: build.query({
      query: () => ({
        url: `user`,
      }),
      providesTags: ["User"],
    }),
    changeUser: build.mutation({
      query: (payload) => ({
        url: "user",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    changeUserAvatar: build.mutation({
      query: (payload) => ({
        url: "user/avatar",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["User"],
    }),
    userRegistation: build.mutation({
      query: ({ ...payload }) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    userLogin: build.mutation({
      query: ({ ...payload }) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useUserRegistationMutation,
  useUserLoginMutation,
  useGetUserQuery,
  useAddProductMutation,
  useChangeUserMutation,
  useChangeUserAvatarMutation,
  useGetMyProductsQuery,
  useGetCommentAdsQuery,
  useAddCommentMutation,
  useAddProductTextMutation,
  useDeleteAddProductMutation,
  useEditProductMutation,
  useEditImgAdsMutation,
} = bacApi;
