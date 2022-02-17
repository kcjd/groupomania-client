import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import api from '../api/api'
import { RootState } from '../app/store'
import { FollowData, FollowValues } from '../types/types'
import { getUsers } from './usersSlice'

export const addFollow = createAsyncThunk<FollowData, FollowValues>('follows/addFollow', async (data) => {
  const { data: follow } = await api.post('follows', data)
  return follow
})

export const deleteFollow = createAsyncThunk<number, number>('follows/deleteFollow', async (id) => {
  await api.delete(`follows/${id}`)
  return id
})

const followsAdapter = createEntityAdapter<FollowData>()

export const followsSlice = createSlice({
  name: 'likes',
  initialState: followsAdapter.getInitialState(),
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        const follows = payload.map((user) => user.follows).flat()
        followsAdapter.addMany(state, follows)
      })
      .addCase(addFollow.fulfilled, (state, { payload }) => {
        followsAdapter.addOne(state, payload)
      })
      .addCase(deleteFollow.fulfilled, (state, { payload }) => {
        followsAdapter.removeOne(state, payload)
      })
})

export const { selectAll: selectAllFollows } = followsAdapter.getSelectors<RootState>(({ follows }) => follows)

export const selectFollowingByUser = (state: RootState, userId: number | undefined) => {
  return selectAllFollows(state).filter((follow) => follow.userId === userId)
}

export const selectFollowersByUser = (state: RootState, userId: number | undefined) => {
  return selectAllFollows(state).filter((follow) => follow.following === userId)
}

export const selectFollow = (state: RootState, userId: number | undefined, following: number | undefined) => {
  return selectAllFollows(state).find((follow) => follow.userId === userId && follow.following == following)
}

export default followsSlice.reducer
