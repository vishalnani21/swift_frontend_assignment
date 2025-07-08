import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
  searchTerm: '',
  sortColumn: null,
  sortOrder: null,
  page: 1,
  pageSize: 10,
  user:null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.page = 1;
    },
    setSort: (state, action) => {
      const { column } = action.payload;
      if (state.sortColumn !== column) {
        state.sortColumn = column;
        state.sortOrder = 'asc';
      } else {
        if (state.sortOrder === 'asc') state.sortOrder = 'desc';
        else if (state.sortOrder === 'desc') {
          state.sortColumn = null;
          state.sortOrder = null;
        } else {
          state.sortOrder = 'asc';
        }
      }
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
    setUser:(state,action)=>{
      state.user=action.payload;
    }
  },
});

export const {
  setComments,
  setSearchTerm,
  setSort,
  setPage,
  setPageSize,
  setUser
} = commentsSlice.actions;

export default commentsSlice.reducer;
