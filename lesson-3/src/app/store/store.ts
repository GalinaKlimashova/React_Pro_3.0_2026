import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from 'shared/api/baseApi';

export const store = configureStore({
    reducer: {
        // Подключаем единый редьюсер
        [baseApi.reducerPath]: baseApi.reducer,
    },
    // Добавляем единый middleware для поддержки кэширования, инвалидации и т.д.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;