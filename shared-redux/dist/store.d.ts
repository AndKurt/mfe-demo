export interface User {
    id: string;
    name: string;
    email: string;
    isAuthenticated: boolean;
}
export interface CounterState {
    value: number;
    lastUpdatedBy?: string;
}
export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    user: User;
    counter: CounterState;
    notifications: string[];
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        user: User;
        counter: CounterState;
        notifications: string[];
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export declare const login: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    name: string;
    email: string;
}, "user/login">, logout: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/logout">;
export declare const increment: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    by: number;
    module: string;
}, "counter/increment">, decrement: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<{
    by: number;
    module: string;
}, "counter/decrement">, reset: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "counter/reset">;
export declare const addNotification: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<string, "notifications/addNotification">, clearNotifications: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"notifications/clearNotifications">;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
