import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

// это login проще говоря
export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
  // в params хранится email и пароль, который ввёл пользователь
  const { data } = await axios.post("/auth/login", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuth", async () => {
  const { data } = await axios.post("/auth/me");
  return data;
});

export const fetchRegistration = createAsyncThunk(
  "auth/fetchRegistration",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchAuth.pending]: (state, action) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuth.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuth.rejected]: (state, action) => {
      state.data = null;
      state.status = "error";
    },
    [fetchAuthMe.pending]: (state, action) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchAuthMe.rejected]: (state, action) => {
      state.data = null;
      state.status = "error";
    },
    [fetchRegistration.pending]: (state, action) => {
      state.data = null;
      state.status = "loading";
    },
    [fetchRegistration.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchRegistration.rejected]: (state, action) => {
      state.data = null;
      state.status = "error";
    },
  },
});

// Как работает selectIsAuth
// У нас есть store, в нём есть
// reducer auth. С помощью useSelector
// мы хаходим в наш store и прокидываем
// selectIsAuth полностью весь стейт
// который у нас есть.
// теперь мы уже в функции выбираем
// нужный нам reducer и поле которое нам
// нужно.

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
