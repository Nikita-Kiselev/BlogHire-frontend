import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/posts/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    axios.delete(`/posts/${id}`);
  }
);

export const fetchSortedPostsByPopularity = createAsyncThunk(
  "posts/fetchSortedPostsByPopularity",
  async () => {
    const { data } = await axios.get("/popularPosts");
    return data;
  }
);

export const fetchNewPosts = createAsyncThunk(
  "posts/fetchNewPosts",
  async () => {
    const { data } = await axios.get("/newPosts");
    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // Get Posts
    [fetchPosts.pending]: (state, action) => {
      // т.к fetchPosts это Promise у него есть состояния : pending, fulfilled, rejected
      // когда мы запросили данные и нам вернулся промис со статусом pending
      // ставим постам статус loading
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload; // в случае, если нам пришли данные, добавляем в posts
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    // Get Tags
    [fetchTags.pending]: (state, action) => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    // Remove Posts
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
    [fetchRemovePost.rejected]: (state, action) => {
      state.posts.status = "error";
    },

    // Get sorted posts by popularity
    [fetchSortedPostsByPopularity.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchSortedPostsByPopularity.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchSortedPostsByPopularity.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },

    // Get new posts 
    [fetchNewPosts.pending]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchNewPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchNewPosts.rejected]: (state, action) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
  },
});

export const postReducer = postsSlice.reducer;
