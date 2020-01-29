//Requires database
let database = require("./database.js")

let initialEntries = [
	{
		creator_id: 1,
		date: "12/11/2019",
		content:`Today was a great day in class! I felt like I learned 
		a lot! React is tough but I'm sure I'll get it down soon!`
	},
	{
		creator_id: 1,
		date: "12/12/2019",
		content:`Sooooooo last night I got hit by a car. I vaguely remember 
		crossing the street and then next thing I was waking up in a hospital.
		Yesterday is no longer a good day.`
	},
	{
		creator_id: 1,
		date: "12/13/2019",
		content:`Doctors said that there don't seem to be any immediate dangers 
		or lasting side effects. Looks like I can make a full recovery in time!
		It's great but everything hurtssss. Stairs are now the worst thing ever
		but my best friend Daniel is taking good care of me. Bless his heart`
	},
	{
		creator_id: 1,
		date: "12/20/2019",
		content:`The last week have been pretty bad. Feeling both terrible \
		physically and mentally despite the upcoming holiday season`
	},
	{
		creator_id: 1,
		date: "12/23/2019",
		content:`My friends surprised me with a random holiday party! They got
		me a bunch of nice care packages and it was absolutely wonderful! I love 
		my friends so much!`
	},
]

//Queries to initialize seeds
let clearTable = "DELETE FROM entries"
let runSeed = "INSERT INTO entries VALUES (?, ?, ?)"

//Adds seed to database
database.run(clearTable, (error) => {
	if (error) console.log(new Error("Could not clear entries table"), error)
	else {
		initialEntries.forEach(function(entry) {
			database.run(runSeed, [entry.creator_id, entry.date,  entry.content], (error) => {
				if (error) console.log(new Error("Could not seed entries"), error)
				else console.log(`Entries seeded successfully`)
			})
		})
	}
})