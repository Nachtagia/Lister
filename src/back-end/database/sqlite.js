const {DatabaseSync} = require('node:sqlite');
const myDatabase = new DatabaseSync('database')

myDatabase.exec(`
    CREATE TABLE IF NOT EXISTS items(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    data TEXT) STRICT
    `)

const dbAdd = (name, data) => {
    myDatabase.prepare(`INSERT INTO items (name, data) VALUES (?, ?)`).run(name, data)
}
const dbDelete = (name) => {
    myDatabase.prepare(`DELETE FROM items WHERE id = ?`).run(name)
}
const dbDisplay = () => {
    let results = []
    for(const entry of myDatabase.prepare(`SELECT id, name, data FROM items`).iterate()) {
        results.push({id: entry.id, name: entry.name, data: entry.data})
    }
    return results;
}

module.exports = {myDatabase, dbAdd, dbDelete, dbDisplay}
