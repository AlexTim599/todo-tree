import { configureStore } from '@reduxjs/toolkit'
import todoSlice from '../features/todos/todoSlise'

export const store = configureStore({
    reducer: {
        todos: todoSlice
    },
})