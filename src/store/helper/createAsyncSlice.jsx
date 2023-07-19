import { createSlice } from '@reduxjs/toolkit';

const createAsyncSlice = (config) => {
  const slice = createSlice({
    name: config.name,
    initialState: {
      loading: false,
      data: null,
      error: null,
      ...config.initialState,
    },
    reducers: {
      fetchStarted(state) {
        state.loading = true;
        state.error = null;
      },
      fetchSuccess(state, action) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      fetchError(state, action) {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      },
      ...config.reducers,
    },
  });

  const { fetchStarted, fetchSuccess, fetchError } = slice.actions;

  const asyncAction = (payload) => async (dispatch) => {
    try {
      dispatch(fetchStarted());
      const { url, options } = config.fetchConfig(payload);
      const r = await fetch(url, options);
      const data = await r.json();
      dispatch(fetchSuccess(data));
    } catch (err) {
      dispatch(fetchError(err.message));
    }
  };

  return { ...slice, asyncAction };
};

export default createAsyncSlice;
