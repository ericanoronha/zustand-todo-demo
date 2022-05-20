import create from "zustand";
import { v4 as uuidv4 } from "uuid";

import { Todo } from "./model/Todo";

interface TodoState {
    todos: Todo[]; //list of type Todo
    addTodo: (description: string) => void; //method for adding todos to our todo
    removeTodo: (id: string) => void; //method for remove todos from our to-do list
    toggleCompletedState: (id: string) => void;
}

export const useStore = create<TodoState>((set) => ({ //hook naming convention useStore //create first parameter
    //initial state
    todos: [],
    //methods for manipulation state
    addTodo: (description: string) => {
        set((state) => ({
            todos: [
                ...state.todos,
                {
                    id: uuidv4(),
                    description,
                    completed: false,                    
                } as Todo,
            ],
        }));
    },
    removeTodo: (id) => {
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        }));
    },
    toggleCompletedState: (id: string) => {
        set((state) => ({
            todos: state.todos.map((todo) => todo.id === id ? ({...todo, completed: !todo.completed } as Todo) : todo ),
        }));
    },

}));