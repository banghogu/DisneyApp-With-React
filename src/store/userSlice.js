import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: {
        id: "",
        email: "",
        photoURL: "",
        displayName: "",
    }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userInfo.id = action.payload.id
            state.userInfo.email = action.payload.email
            state.userInfo.displayName = action.payload.displayName
            state.userInfo.photoURL = action.payload.photoURL
        },
        removeUser: (state) => {
            state.userInfo.id = ""
            state.userInfo.email = ""
            state.userInfo.displayName = ""
            state.userInfo.photoURL = ""
        },
    }
})

export const {setUser,removeUser} = userSlice.actions