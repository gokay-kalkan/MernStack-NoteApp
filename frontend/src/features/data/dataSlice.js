import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dataService from "./dataService";

const initialState = {
  notlar: [],
  isHata: false,
  isBasari: false,
  isYukleniyor: false,
};

export const notOlustur = createAsyncThunk(
  "notlar/create",
  async (notData, thunkAPI) => {
    try {
      //thunk api ile state'e erişilebilir
      const token = thunkAPI.getState().auth.kullanici.token;

      return await dataService.notOlustur(notData, token);
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
//ilk parametreyi boş geçtik çünkü data göndermiyoruz
export const notlarGetir = createAsyncThunk(
  "notlar/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.kullanici.token;
      return await dataService.notlarGetir(token);
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

export const notSil = createAsyncThunk(
  "notlar/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.kullanici.token;
      return await dataService.notSil(id, token);
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

export const notSlice = createSlice({
  name: "notlar",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(notOlustur.pending, (state) => {
        state.isYukleniyor = true;
      })
      .addCase(notOlustur.fulfilled, (state, action) => {
        state.isYukleniyor = false;
        state.isBasari = true;
        state.notlar.unshift(action.payload); //push yerine unshift son eklenen en başa gelir
      })
      .addCase(notOlustur.rejected, (state, action) => {
        state.isYukleniyor = false;
        state.isHata = true;
        state.isBasari = false;
        state.mesaj = action.payload;
      })
      .addCase(notlarGetir.pending, (state) => {
        state.isYukleniyor = true;
      })
      .addCase(notlarGetir.fulfilled, (state, action) => {
        state.isYukleniyor = false;
        state.isBasari = true;
        state.notlar = action.payload;
      })
      .addCase(notlarGetir.rejected, (state, action) => {
        state.isYukleniyor = false;
        state.isHata = true;
        state.mesaj = action.payload;
      })
      .addCase(notSil.pending, (state) => {
        state.isYukleniyor = true;
      })
      .addCase(notSil.fulfilled, (state, action) => {
        state.isYukleniyor = false;
        state.isBasari = true;
        state.notlar = state.notlar.filter(
          (not) => not._id !== action.payload.id
        );
   
      })
      .addCase(notSil.rejected, (state, action) => {
        state.isYukleniyor = false;
        state.isHata = true;
        state.isBasari = false;
        state.mesaj = action.payload;
      });
  },
});

export const { reset } = notSlice.actions;
export default notSlice.reducer;