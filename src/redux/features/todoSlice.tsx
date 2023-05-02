import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface Todo {
    id: number;
    task: string;
    status: number;
    created_at: string;
    updated_at: string;
}

interface TodoState extends ReturnType<typeof todoEntity.getInitialState> {}

export const getTodos = createAsyncThunk<Todo[]>("todos/getTodos", async()=> {
    const response = await axios.get<Todo[]>("https://express-todo-typescript.vercel.app/todos");
    return response.data;
});

export const createTodo = createAsyncThunk<Todo, Partial<Todo>>("todos/createTodo", async ({ task, status }: Partial<Todo>) => {
    const config = {
        headers: {
          "x-secret-key": "k4d4r15m4n",
        },
      };
    const response = await axios.post<Todo>("https://express-todo-typescript.vercel.app/todos", { task, status }, config);
    return response.data;
  });
  

export const updateTodo = createAsyncThunk<Todo, { id: number, task: string, status: number }>("todos/updateTodo", async ({ id, task, status }) => {
    const config = {
        headers: {
          "x-secret-key": "k4d4r15m4n",
        },
      };
    const response = await axios.put<Todo>(`https://express-todo-typescript.vercel.app/todos/${id}`, {task, status }, config);
    return response.data;
});

export const deleteTodo = createAsyncThunk<void, number>("todos/deleteTodo", async (id: number) => {
    const config = {
        headers: {
          "x-secret-key": "k4d4r15m4n",
        },
      };
    await axios.delete(`https://express-todo-typescript.vercel.app/todos/${id}`, config);
});

const todoEntity = createEntityAdapter<Todo>({
    selectId : (todo) => todo.id
});

const todoSlice = createSlice({
  name: "todo",
  initialState: todoEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodos.fulfilled, (state: TodoState, action: PayloadAction<Todo[]>) => {
      todoEntity.setAll(state, action.payload);
    });
    builder.addCase(createTodo.fulfilled, (state: TodoState, action: PayloadAction<Todo>) => {
        todoEntity.addOne(state, action.payload);
    });
    builder.addCase(updateTodo.fulfilled, (state: TodoState, action: PayloadAction<Todo>) => {
        todoEntity.updateOne(state, { id: action.payload.id, changes: action.payload });
    });
    builder.addCase(deleteTodo.fulfilled, (state: TodoState, action: PayloadAction<void, string, {arg: number, requestId: string, requestStatus: "fulfilled"}, never>) => {
        todoEntity.removeOne(state, action.meta.arg);
    });
  },
});

export const todoSelector = todoEntity.getSelectors((state: { todo: TodoState }) => state.todo);
export default todoSlice.reducer;