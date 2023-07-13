import { writable } from "svelte/store";

export type todoEntry = {
  text: string,
  done: boolean,
};

export const todoEntries = writable([
  { text: 'one', done: false },
  { text: 'two', done: false },
  { text: 'three', done: false }
]);

export function addTodo(newEntry: string) {
  todoEntries.update((entries) => [...entries, { text: newEntry, done: false }])
}

export function removeTodo(index: number) {
  todoEntries.update((entries) => entries.filter((_, i) => i !== index));
}

export function toggleTodo(index: number, state: boolean) {
  todoEntries.update((entries) => entries.map((value, i) => i === index ? { ...value, done: state } : value));
}
