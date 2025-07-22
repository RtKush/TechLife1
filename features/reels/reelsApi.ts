import { IVideo } from '@/types/Video.types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const reelApi = createApi({
    reducerPath: "reelApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_AUTH_BACKEND_BASE_URL, credentials: "include" }),
    tagTypes: ["reel"],
    endpoints: (build) => ({
        // get Reel by Id
        getReelById: build.query<{ message: string, data: IVideo }, string>({
            query: (id) => `/reel/${id}`,

        }),

        // get reel
        getReel: build.query<{ message: string, data: IVideo[], hasMore: boolean, totalVideo: SVGAnimatedNumberList }, { page: number, limit: number }>({
            query: ({ page = 1, limit = 5 }) => ({
                url: `/reel?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: (result) =>
                result?.data
                    ? result.data.map(({ _id }) => ({ type: "reel" as const, id: _id.toString() }))
                    : ["reel"],
        }),

        // create Reel
        createReel: build.mutation<void, { title: string, description: string, tags: string[], videoUrl: string }>({
            query: ({ title, description, tags, videoUrl }) => ({
                url: "/reel",
                method: "POST",
                body: { title, description, tags, videoUrl },

            }),
            invalidatesTags: ["reel"],

        }),

        // delete Reel
        deleteReel: build.mutation<void, string>({
            query: (id) => ({
                url: `/reel/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["reel"],

        }),

        // like reel
        likeReel: build.mutation<{ liked: boolean; likesCount: number; message: string }, string>({
            query: (id) => ({
                url: `/reel/${id}/like`,
                method: "POST",
            }),
            invalidatesTags: ["reel"],

        }),
    })
})


export const { useCreateReelMutation, useDeleteReelMutation, useGetReelByIdQuery, useGetReelQuery, useLikeReelMutation } = reelApi

