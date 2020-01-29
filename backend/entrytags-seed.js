//Requires database
let database = require("./database.js")

let initialEntryTags = [
	{
		entry_id: 1,
		tag_id: 4,
	},
	{
		entry_id: 1,
		tag_id: 8,
	},
	{
		entry_id: 1,
		tag_id: 10,
	},
	{
		entry_id: 2,
		tag_id: 2,
	},
	{
		entry_id: 2,
		tag_id: 3,
	},
	{
		entry_id: 2,
		tag_id: 15,
	},
	{
		entry_id: 3,
		tag_id: 1,
	},
	{
		entry_id: 3,
		tag_id: 3,
	},
	{
		entry_id: 3,
		tag_id: 9,
	},
	{
		entry_id: 3,
		tag_id: 16,
	},	
	{
		entry_id: 4,
		tag_id: 1,
	},
	{
		entry_id: 4,
		tag_id: 5,
	},
	{
		entry_id: 4,
		tag_id: 7,
	},
	{
		entry_id: 4,
		tag_id: 11,
	},
	{
		entry_id: 4,
		tag_id: 16,
	},
]

//Queries to initialize seeds
let clearTable = "DELETE FROM entrytags"
let runSeed = "INSERT INTO entrytags VALUES (?, ?)"

//Adds seed to database
database.run(clearTable, (error) => {
	if (error) console.log(new Error("Could not clear entrytags table"), error)
	else {
		initialEntryTags.forEach(function(entrytag) {
			database.run(runSeed, [entrytag.entry_id, entrytag.tag_id], (error) => {
				if (error) console.log(new Error("Could not seed entrytags"), error)
				else console.log(`Entrytag for entry ${entrytag.entry_id} seeded successfully`)
			})
		})
	}
})