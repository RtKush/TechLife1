import { Blog } from "@/types/blog.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface PaginatedResponse {
    totalPosts: number;
    totalPages: number;
    currentPage: number;
    posts: responseBlog[];
}

interface imageDetail {

    type: string;
    url: string

}
export interface responseBlog {
    _id: string;
    title?: string,
    isPublished?: Boolean,
    summary?: string,
    authorId?: { userName: string; _id: string, avatar: string },
    slug?: string,
    media?: imageDetail[] | [], // for image only
    tags?: string[] | [],
    createdAt?: string,
    updatedAt?: string,
    content?: string,
    likes?: []
}

export const blogsApi = createApi({
    reducerPath: 'blogsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_AUTH_BACKEND_BASE_URL,
        credentials: 'include'
    }),

    tagTypes: ['Blog'],
    endpoints: (builder) => ({
        // get all blog
        getBlogs: builder.query<PaginatedResponse, { page: number; limit: number }>({
            query: ({ page = 1, limit = 10 }) => `/post?page=${page}&limit=${limit}`,
            providesTags: ["Blog"]

        }),

        // get blog by id
        getBlogByID: builder.query<{ message: string; data: responseBlog }, string>({
            query: (id) => `/post/${id}`,
            providesTags: (result, error, slug) => [{ type: "Blog", id: slug }],
        }),

        // create blog
        createBlog: builder.mutation<responseBlog, Blog>({
            query: (newBlog) => ({
                url: "/post",
                method: "POST",
                body: newBlog,

            }),
            invalidatesTags: ['Blog'],

        }),

        // update blog
        updateBlog: builder.mutation<{ message: string }, { id: string; updateBlog: Partial<Blog> }>({
            query: ({ updateBlog, id }) => ({
                url: `/post/${id}`,
                method: "PATCH",
                body: updateBlog
            }),
            invalidatesTags: ['Blog'],
        }),

        // delete blog
        deleteBlog: builder.mutation<void, string>({
            query: (id) => ({
                url: `/post/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: (result, error, slug) => [{ type: "Blog", id: slug }],
        }),

        // like blog
        likeBlog: builder.mutation<{ message: string, likesCount: number, liked: boolean }, string>({
            query: (slug: string) => ({
                url: `/post/${slug}/like`,
                method: "POST",
            }),
            invalidatesTags: (result, error, slug) => [{ type: "Blog", id: slug }],
        }),

        // all blog  by its userName
        getUserBlogs: builder.query<{ message: string, data: { blogs: responseBlog[], totalBlog: number } }, string>({
            query: (userId: string) => `/user/blogs/${userId}/`,
        })
    })
})


export const {
    useGetBlogsQuery,
    useGetBlogByIDQuery,
    useCreateBlogMutation,
    useUpdateBlogMutation,
    useDeleteBlogMutation,
    useLikeBlogMutation,
    useGetUserBlogsQuery,
} = blogsApi