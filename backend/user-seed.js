//Requires database
let database = require("./database.js")

let initialUsers = [
	{
		username: "datkevin",
		email: "datkevin@gmail.com",
		profilepicture: "imagelink.com/image",
		password: "dog"
	},
	{
		username: "doggers",
		email: "doggy@doggy.com",
		profilepicture: "imagelink.com/image",
		password: "cat"
	},
]

//Queries to initialize seeds
let clearTable = "DELETE FROM users"
let runSeed = "INSERT INTO users VALUES (?, ?, ?, ?)"

//Adds seed to database
database.run(clearTable, (error) => {
	if (error) console.log(new Error("Could not users clear table"), error)
	else {
		initialUsers.forEach(function(user) {
			database.run(runSeed, [user.username, user.email,  user.profilepicture, user.password], (error) => {
				if (error) console.log(new Error("Could not seed users"), error)
				else console.log(`User ${user.username} seeded successfully`)
			})
		})
	}
})