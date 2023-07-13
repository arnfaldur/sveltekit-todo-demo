import { json } from "@sveltejs/kit";
import sqlite from "sqlite3";

export type todoEntry = {
  id: number,
  text: string,
  done: boolean,
};

const db = sqlite.cached.Database("database.db");

await new Promise(function (resolve, _reject) {
  db.run(`create table if not exists
      todos(id integer primary key autoincrement, text text, done boolean)`,
    resolve
  );
});

function addTodo(newEntry: string) {
  db.run("insert into todos (text, done) values(?, ?)", newEntry, false);
}

function removeTodo(index: number) {
  db.run("delete from todos where id = ?", index);
}

function toggleTodo(index: number, state: boolean) {
  db.run("update todos set done = ? where id = ?", state, index)
}

export async function GET() {
  let result = new Promise(function (resolve, _reject) {
    db.all("select * from todos", function (_err, rows) {
      resolve(rows);
    });
  });
  return json(await result);
}

export async function POST({ request }) {
  const command = await request.json()

  let result = new Promise(function (resolve, _reject) {
    // serialized to ensure updates happen before result is read
    db.serialize(() => {
      if (command.action === 'add' && command.value !== '') {
        addTodo(command.value);
      } else if (command.action === 'toggle') {
        toggleTodo(command.id, command.state);
      } else if (command.action === 'remove') {
        removeTodo(command.id);
      }
      db.all("select * from todos", function (_err, rows) {
        resolve(rows);
      });
    })
  })
  return json(await result);
}
