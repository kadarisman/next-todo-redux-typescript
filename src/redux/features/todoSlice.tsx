import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

interface Todo {
    id: number;
    task: string;
    status: string;
}

interface TodoState extends ReturnType<typeof todoEntity.getInitialState> {}

export const getTodos = createAsyncThunk<Todo[]>("todos/getTodos", async()=> {
    const response = await axios.get<Todo[]>("http://localhost:5000/todos");
    return response.data;
});

export const createTodo = createAsyncThunk<Todo, Partial<Todo>>("todos/createTodo", async ({ task, status }: Partial<Todo>) => {
    const response = await axios.post<Todo>("http://localhost:5000/todos", { task, status });
    return response.data;
  });
  

export const updateTodo = createAsyncThunk<Todo, { id: number, task: string, status: string }>("todos/updateTodo", async ({ id, task, status }) => {
    const response = await axios.patch<Todo>(`http://localhost:5000/todos/${id}`, {task, status });
    return response.data;
});

export const deleteTodo = createAsyncThunk<void, number>("todos/deleteTodo", async (id: number) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
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