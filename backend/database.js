//Modules
let sqlite3 = require("sqlite3")


//Database
let database = new sqlite3.Database("./database.db")


//Table creation statements
let createUsersTable = "CREATE TABLE IF NOT EXISTS users (username TEXT, email TEXT, profilepicture TEXT, password TEXT)"
let createEntriesTable = "CREATE TABLE IF NOT EXISTS entries (creator_id INTEGER, date TEXT, content TEXT)"
let createTagsTable = "CREATE TABLE IF NOT EXISTS tags (name TEXT, category_id INTEGER)"
let createEntryTagsTable = "CREATE TABLE IF NOT EXISTS entrytags (entry_id TEXT, tag_id TEXT)"
let createCategoriesTable = "CREATE TABLE IF NOT EXISTS categories (name TEXT)"
database.run(createUsersTable, (error) => {
	if (error) console.error(new Error("Failed to create UsersTable"), error)
	else console.log("Users Table created")
})
database.run(createEntriesTable, (error) => {
	if (error) console.error(new Error("Failed to create Entries Table"), error)
	else console.log("Entries Table created")
})
database.run(createTagsTable, (error) => {
	if (error) console.error(new Error("Failed to create Tags Table"), error)
	else console.log("Tags Table created")
})
database.run(createEntryTagsTable, (error) => {
	if (error) console.error(new Error("Failed to create Entry Tags Table"), error)
	else console.log("Entry Tags Table created")
})
database.run(createCategoriesTable, (error) => {
	if (error) console.error(new Error("Failed to create Categories Table"), error)
	else console.log("Categories Table created")
})

module.exports = database