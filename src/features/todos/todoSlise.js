import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit'
import axios from 'axios'
import { buildTree } from '../../utils'

const initialState = {
    todos: null,
    selectedItem: null,


}


export const getTodos = createAsyncThunk(
    'todos/getTodos',
    async (_, { rejectWithValue, dispatch }) => {
        const result = await axios.get('https://api.github.com/gists/e1702c1ef26cddd006da989aa47d4f62')
        console.log(result.data.files, 'result');
        dispatch(setTodos(buildTree(JSON.parse(result.data.files['view.json'].content).entityLabelPages[0])))

    }
)

export const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setTodos: (state, action) => {
            state.todos = action.payload
        },

        setSelectedItem: (state, action) => {
            state.selectedItem = action.payload
        },
        deleteItem: (state) => {
            const node = state.selectedItem
            if (node.content.startsWith('element')) {
                state.todos = state.todos.filter((todo) => {
                    if (todo.id === node.id) {
                        return false
                    }
                    return todo.parentId !== node.id
                })
            } else {
                state.todos = state.todos.filter((todo) => todo.id !== node.id)
            }
            state.selectedItem = null

        },
        dragItem: (state, action) => {
            const tempArr = JSON.parse(JSON.stringify(state.todos))
            const { nodeId, newParentId } = action.payload

            const nodeIndex = tempArr.findIndex((el) => el.id === nodeId)

            if (nodeIndex !== -1) {

                tempArr[nodeIndex] = {
                    ...tempArr[nodeIndex], parentId: newParentId
                }
                state.todos = tempArr
            }

        }

    },
    extraReducers: {
        [getTodos.fulfilled]: () => console.log('fulfilled'),
        [getTodos.pending]: () => console.log('pending'),
        [getTodos.rejected]: () => console.log('rejected'),
    }
})


export const { setTodos, setSelectedItem, deleteItem, dragItem } = todoSlice.actions

export default todoSlice.reducer