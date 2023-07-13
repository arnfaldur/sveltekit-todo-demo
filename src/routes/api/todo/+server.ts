import { json } from "@sveltejs/kit";

export type todoEntry = {
  text: string,
  done: boolean,
};

let todoEntries = [
  { text: 'one', done: false },
  { text: 'two', done: false },
  { text: 'three', done: false }
];

function addTodo(newEntry: string) {
  todoEntries.push({ text: newEntry, done: false });
}

function removeTodo(index: number) {
  todoEntries = todoEntries.filter((_, i) => i !== index);
}

function toggleTodo(index: number, state: boolean) {
  todoEntries[index].done = state;
}

export function GET() {
  return json(todoEntries);
}

export async function POST({ request }) {
  const command = await request.json()

  if (command.action === 'add') {
    addTodo(command.value);
  } else if (command.action === 'toggle') {
    toggleTodo(command.id, command.state);
  } else if (command.action === 'remove') {
    removeTodo(command.id);
  }
  return json(todoEntries);
}
