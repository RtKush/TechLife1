import { IUser } from "@/types/User.types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; //use react package dealing with these


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_AUTH_BACKEND_BASE_URL }),
    tagTypes: ['User'],

    endpoints: (builder) => ({
        // register
        register: builder.mutation<void, { email: string; password: string }>({
            query: ({ email, password }) => ({
                url: "auth/register",
                method: "POST",
                body: { email, password }
            }),

        }),

        //  forget password  
        forgetPassword: builder.mutation<void, string>({
            query: (email) => ({
                url: "auth/forget-password",
                method: "POST",
                body: email
            }),
            invalidatesTags: ['User'],
        }),

        // update-password
        updatePassword: builder.mutation<{ message: string, }, { oldPassword: string, newPassword: string }>({
            query: ({ oldPassword, newPassword }) => ({
                url: "user/update-password",
                method: "PATCH",
                body: { newPassword, oldPassword }
            }),

        }),

        // updateProfile.
        updateProfile: builder.mutation<{ data: IUser, message: string }, { userName: string, firstName: string, lastName: string, email: string, bio: string, avatar: string }>({
            query: ({ userName, firstName, lastName, email, bio, avatar }) => ({
                method: "PATCH",
                url: "user/update-profile",
                body: { userName, firstName, lastName, email, bio, avatar }
            }),
            invalidatesTags: (result, error, body) =>
                result ? [{ type: "User", id: result.data._id }] : [],


        }),

        //upload Avtar
        uploadAvtar: builder.mutation<void, { avatarUrl: string }>({
            query: ({ avatarUrl }) => ({
                method: "POST",
                url: "user/avatar",
                body: { avatarUrl }
            }),
            invalidatesTags: ['User'],

        }),

        //update Avtar
        updateAvtar: builder.mutation<void, { avatarUrl: string }>({
            query: ({ avatarUrl }) => ({
                method: "PATCH",
                url: "user/avatar",
                body: avatarUrl
            }),
            invalidatesTags: ['User'],

        }),

        // get user
        getUserById: builder.query<{ data: IUser, message: string }, string>({
            query: (id) => `user/${id}`,
            providesTags: (result, error, id) =>
                result ? [{ type: "User", id }] : [],

        }),

        // delete user
        deleteUser: builder.mutation<{ message: string }, { password: string }>({
            query: ({ password }) => ({
                method: "DELETE",
                url: `user/delete-account`,
                body: { password }

            }),
            invalidatesTags: () => [{ type: "User" }]

        })
    })
})
export const {
    useRegisterMutation,
    useForgetPasswordMutation,
    useUpdatePasswordMutation,
    useUpdateProfileMutation,
    useUploadAvtarMutation,
    useUpdateAvtarMutation,
    useGetUserByIdQuery,
    useDeleteUserMutation
} = authApi;
