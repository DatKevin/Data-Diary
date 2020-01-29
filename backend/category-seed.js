//Requires database
let database = require("./database.js")

let initialCategories = [
	{
		name: "Mood",
	},
	{
		name: "Friend",
	},
	{
		name: "Activity",
	},
]

//Queries to initialize seeds
let clearTable = "DELETE FROM categories"
let runSeed = "INSERT INTO categories VALUES (?)"

//Adds seed to database
database.run(clearTable, (error) => {
	if (error) console.log(new Error("Could not clear categories table"), error)
	else {
		initialCategories.forEach(function(category) {
			database.run(runSeed, [category.name], (error) => {
				if (error) console.log(new Error("Could not seed categories"), error)
				else console.log(`Category ${category.name} seeded successfully`)
			})
		})
	}
})