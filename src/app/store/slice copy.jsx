//slice.jsx //samai 2024-03-14
import { createSlice } from "@reduxjs/toolkit";

// todo - status(complete, incomplete), text, id
const initialState = {
  todos: [
    { id: 1, text: "Create a react app", status: "incomplete" },
    { id: 2, text: "Create a redux app", status: "incomplete" },
    { id: 3, text: "Create a redux toolkit app", status: "incomplete" },
  ],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addToTodos: (state, action) => {
      const newTodo = action.payload;
      state.todos.push(newTodo);
    },
    editTodos: (state, action) => {
      const { id, text } = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo) {
        existingTodo.text = text;
      }
    },
    removeFromTodos: (state, action) => {
      const id = action.payload;
      state.todos = state.todos.filter((todo) => todo.id !== id);
    },
    changeTodoStatus: (state, action) => {
      const id = action.payload;
      const existingTodo = state.todos.find((todo) => todo.id === id);
      if (existingTodo.status === "incomplete") {
        existingTodo.status = "complete";
      } else {
        existingTodo.status = "incomplete";
      }
    },
  },
});

export const { addToTodos, editTodos, removeFromTodos, changeTodoStatus } =
  todoSlice.actions;

export default todoSlice.reducer;