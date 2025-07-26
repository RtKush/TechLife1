import { authApi } from '@/features/auth/authApi'
import { blogsApi } from '@/features/blogs/blogsApi'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'
import { commentsApi } from '@/features/comments/commentsApi'
// import { reelApi } from '@/features/reels/reelsApi'
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: "root",
    storage,
    whitelist: ['auth'],  // only persist the auth slice

}
const rootReducer = combineReducers({
    auth: authReducer,
    [blogsApi.reducerPath]: blogsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    // [reelApi.reducerPath]: reelApi.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const makeStore = () =>
    configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            })
                .concat(authApi.middleware)
                .concat(blogsApi.middleware)
                .concat(commentsApi.middleware)
                // .concat(reelApi.middleware),
    })

// export persistor for PersistGate
const store = makeStore()
export const persistor = persistStore(store)

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

