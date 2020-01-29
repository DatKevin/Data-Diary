//Requires database
let database = require("./database.js")

let initialTags = [
	{
		name: "Amazing",
		category_id: 1
	},
	{
		name: "Good",
		category_id: 1
	},
	{
		name: "Meh",
		category_id: 1
	},
	{
		name: "Bad",
		category_id: 1
	},
	{
		name: "Terrible",
		category_id: 1
	},
	{
		name: "Tired",
		category_id: 1
	},
	{
		name: "Motivated",
		category_id: 1
	},
	{
		name: "Daniel",
		category_id: 2
	},
	{
		name: "Jinhai",
		category_id: 2
	},
	{
		name: "Alex",
		category_id: 2
	},
	{
		name: "Class",
		category_id: 3
	},
	{
		name: "Video Games",
		category_id: 3
	},
		{
		name: "Walk",
		category_id: 3
	},
	{
		name: "Party",
		category_id: 3
	},

]

//Queries to initialize seeds
let clearTable = "DELETE FROM tags"
let runSeed = "INSERT INTO tags VALUES (?, ?)"

//Adds seed to database
database.run(clearTable, (error) => {
	if (error) console.log(new Error("Could not clear tags table"), error)
	else {
		initialTags.forEach(function(tag) {
			database.run(runSeed, [tag.name, tag.category_id], (error) => {
				if (error) console.log(new Error("Could not seed tags"), error)
				else console.log(`Tag ${tag.name} seeded successfully`)
			})
		})
	}
})