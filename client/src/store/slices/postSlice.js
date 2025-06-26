import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPosts(state, action) {
      console.log("From the redux post slice:", action.payload);
      state.posts = action.payload;
    },
    deletePosts(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter(post => post._id !== postId);
    },
    updatePosts(state, action) {
      const updatedPost = action.payload;
      const index = state.posts.findIndex(post => post._id === updatedPost._id);
      if (index !== -1) {
        state.posts[index] = updatedPost;
      }
    },
    createPost(state, action) {
      state.posts.push(action.payload);
    },
  },
});

export const { getPosts, deletePosts, updatePosts, createPost } = postSlice.actions;
export default postSlice.reducer;
