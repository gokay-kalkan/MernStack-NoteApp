import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const kullanici = JSON.parse(localStorage.getItem("kullanici"));

const initialState = {
    kullanici: kullanici ? kullanici : null,
    isHata: false,
    isBasari: false,
    isYukleniyor: false,
    mesaj: "",
  };
  export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
      try {
        return await authService.register(user);
      } catch (error) {
        const mesaj =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        return thunkAPI.rejectWithValue(mesaj);
      }
    }
  );

  export const logout = createAsyncThunk('auth/logout', async()=>{
    await authService.logout()
});

export const login = createAsyncThunk("auth/login", async(user, thunkAPI)=>{
    try {

        return await authService.login(user)
        
    } catch (error) {
        const mesaj =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(mesaj);
    }
});

  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      reset: (state) => {
        //işlem bittikten sonra state'i başlangıca çekecek
        state.isHata = false;
        state.isBasari = false;
        state.isYukleniyor = false;
        state.mesaj = "";
      },
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
          state.isYukleniyor = true;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.isYukleniyor = false;
          state.isBasari = true;
          state.kullanici = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
          state.isYukleniyor = false;
          state.isHata = true;
          state.mesaj = action.payload;
          state.kullanici = null;
        })
        .addCase(login.pending, (state) => {
            state.isYukleniyor = true;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isYukleniyor = false;
            state.isBasari = true;
            state.kullanici = action.payload;
          })
          .addCase(login.rejected, (state, action) => {
            state.isYukleniyor = false;
            state.isHata = true;
            state.mesaj = action.payload;
            state.kullanici = null;
          })
          
        .addCase(logout.fulfilled, (state)=>{
            state.kullanici = null
          })
    }
  });

  export const { reset } = authSlice.actions;
export default authSlice.reducer;