import { configureStore, createSlice } from '@reduxjs/toolkit'

const postData = createSlice({
  name: 'postData',
  initialState: {
    index: 4,
    data: [
      {
        id: 1,
        title: 'White and Black',
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
      },
      {
        id: 2,
        title: 'Grey Yordan',
        content: 'Truth is the only safe ground to stand upon.'
      },
      {
        id: 3,
        title: 'In god we trust',
        content: 'We live in a rainbow of chaos.'
      }
    ]
  },
  reducers: {
    addPost: (state, action) => {
      state.data.push({
        id: state.index,
        title: action.payload.title,
        content: action.payload.content
      })
      state.index++
    }
  }
})

export const store = configureStore({
  reducer: {
    postData: postData.reducer
  }
})

export const { addPost } = postData.actions
