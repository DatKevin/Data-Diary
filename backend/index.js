//Required Modules
let express = require("express")
let database = require("./database.js")

//App + Port
let app = express()
let port = 9000

//Middleware
app.use(express.json())

//CORS
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	next()
})


/////////////////////////////////////////////////
// Routes for Users
/////////////////////////////////////////////////

//Get all users
app.get("/api/users", (request, response) => {
	console.log("Get request for all users")
	let selectUsers = "SELECT * , oid FROM users"
	database.all(selectUsers, (error, results) => {
		if (error) {
			console.error(new Error("Could not get all users: ", error))
			response.send("Could not get all users")
		}
		else {
			response.send(results)
		}
	})
})


//Get one user
app.get("/api/users/:id", (request, response) => {
	console.log(`Get request for user_id: ${request.params.id}`)
	let selectOneUser = "SELECT * , oid FROM users WHERE oid = ?"
	database.get(selectOneUser, [request.params.id], (error, results) => {
		if (error) {
			console.error(new Error(`Cannot get user_id: ${request.params.id} error: `, error))
			response.send(`Cannot get user_id: ${request.params.id}`)
		}
		else {
			response.send(results)
		}
	})
})


//Create new user
app.post("/api/users", (request, response) => {
	//Logs the request JSON body
	console.log("Create User: ", request.body)
	let body = request.body
	let createUser = "INSERT INTO users VALUES (?, ?, ?, ?)"
	database.run(createUser, [body.username, body.email, body.profilepicture, body.password], function(error) {
		if (error) {
			console.error(new Error("Could not create new user", error))
			response.send("Could not create new user")
		}
		else {
			//Returns an updated users table 
			let selectUsers = "SELECT * , oid FROM users"
			database.all(selectUsers, (error, results) => {
				if (error) {
					console.error(new Error("Could not get all users: ", error))
					response.send("Could not get all users")
				}
				else {
					response.send(results)
				}
			}
		)}
	})
})


//Update user
app.put("/api/users/:id", (request,response) => {
	console.log(`Put request for user id: ${request.params.id}`)
	//Uses the keys in request.body to create dynamic SET values
	let requestKeys = Object.keys(request.body).map(ele => `${ele} = ?`)
	//Uses dynamic SET values from requestKeys to build full UPDATE query
	let updateOneUser = `UPDATE users SET ${requestKeys.join(", ")} WHERE users.oid = ?`;
	//Add values from request.body
	let queryValues = [...Object.values(request.body), request.params.id]
	//Runs Query based on what was chosen for updates
	database.run(updateOneUser, queryValues, function (error) {
	    if (error) {
	 	    console.log(new Error("Could not update user"), error)
	     	response.send("Could not update users")
	    } 
	    else {
	    	//Returns an updated user
			let selectOneUser = "SELECT * , oid FROM users WHERE oid = ?"
	      	database.get(selectOneUser, [request.params.id], (error, results) => {
				if (error) {
					console.error(new Error(`Cannot get user_id: ${request.params.id} error: `, error))
					response.send(`Cannot get user_id: ${request.params.id}`)
				}
				else {
					response.send(results)
				}
			})
	    }
	})
})


//Delete user
app.delete("/api/users/:id", (request, response) => {
	console.log(`Delete request for user_id: ${request.params.id}`)
	let deleteUser = "DELETE FROM users WHERE oid = ?"
	database.run(deleteUser, [request.params.id], (error) => {
		if (error) {
			console.error(new Error(`Could not delete user_id: ${request.params.id} error: `, error))
			response.send("Could not delete user")
		}
		else{
			//Returns updated user table 
			let selectUsers = "SELECT * , oid FROM users"
			database.all(selectUsers, (error, results) => {
				if (error) {
					console.error(new Error("Could not get all users: ", error))
					response.send("Could not get all users")
				}
				else {
					response.send(results)
				}
			}
		)}
	})
})

/////////////////////////////////////////////////
// Routes for Entries
/////////////////////////////////////////////////

//Get all entries
app.get("/api/entries", (request, response) => {
	console.log("Get request for all entries")
	let selectEntries = "SELECT *, oid FROM entries"
	database.all(selectEntries, (error, results) => {
		if (error) {
			console.error(new Error("Could not get all entries: ", error))
			response.send("Could not get all entries")
		}
		else {
			response.send(results)
		}
	})
})


//Get one entry
app.get("/api/entries/:id", (request, response) => {
	console.log(`Get request for entry_id: ${request.params.id}`)
	let selectOneEntry = "SELECT * , oid FROM entries WHERE oid = ?"
	database.get(selectOneEntry, [request.params.id], (error, results) => {
		if (error) {
			console.error(new Error(`Cannot get entry_id: ${request.params.id} error: `, error))
			response.send(`Cannot get entry_id: ${request.params.id}`)
		}
		else {
			response.send(results)
		}
	})
})


//Create new entry
app.post("/api/entries", (request, response) => {
	//Logs the request JSON body
	console.log("Create entry: ", request.body)
	let body = request.body
	let createEntry = "INSERT INTO entries VALUES (?, ?, ?)"
	database.run(createEntry, [body.creator_id, body.date, body.content], function(error) {
		if (error) {
			console.error(new Error("Could not create new entry", error))
			response.send("Could not create new entry")
		}
		else {
			//Returns an updated entries table 
			let selectEntries = "SELECT * , oid FROM entries ORDER BY oid DESC LIMIT 1"
			database.all(selectEntries, (error, results) => {
				if (error) {
					console.error(new Error("Could not get all entries: ", error))
					response.send("Could not get all entries")
				}
				else {
					response.send(results)
				}
			}
		)}
	})
})


//Update entry
app.put("/api/entries/:id", (request,response) => {
	console.log(`Put request for entry id: ${request.params.id}`)
	//Uses the keys in request.body to create dynamic SET values
	let requestKeys = Object.keys(request.body).map(ele => `${ele} = ?`)
	//Uses dynamic SET values from requestKeys to build full UPDATE query
	let updateOneEntry = `UPDATE entries SET ${requestKeys.join(", ")} WHERE entries.oid = ?`;
	//Add values from request.body
	let queryValues = [...Object.values(request.body), request.params.id]
	//Runs Query based on what was chosen for updates
	database.run(updateOneEntry, queryValues, function (error) {
	    if (error) {
	 	    console.log(new Error("Could not update entry"), error)
	     	response.send("Could not update entries")
	    } 
	    else {
	    	//Returns an updated entry
			let selectOneEntry = "SELECT * , oid FROM entries WHERE oid = ?"
	      	database.get(selectOneEntry, [request.params.id], (error, results) => {
				if (error) {
					console.error(new Error(`Cannot get entry_id: ${request.params.id} error: `, error))
					response.send(`Cannot get entry_id: ${request.params.id}`)
				}
				else {
					console.log(results)
					response.send(results)
				}
			})
	    }
	})
})


//Delete entry
app.delete("/api/entries/:id", (request, response) => {
	console.log(`Delete request for entry_id: ${request.params.id}`)
	let deleteEntry = "DELETE FROM entries WHERE oid = ?"
	database.run(deleteEntry, [request.params.id], (error) => {
		if (error) {
			console.error(new Error(`Could not delete entry_id: ${request.params.id} error: `, error))
			response.send("Could not delete entry")
		}
		else{
			//Returns updated entry table 
			let selectEntries = "SELECT * , oid FROM entries"
			database.all(selectEntries, (error, results) => {
				if (error) {
					console.error(new Error("Could not get all entries: ", error))
					response.send("Could not get all entries")
				}
				else {
					response.send(results)
				}
			}
		)}
	})
})


/////////////////////////////////////////////////
// Routes for Categories
/////////////////////////////////////////////////

//Get all categories
app.get("/api/categories", (request, response) => {
	console.log("Get request for all categories")
	let selectCategories = "SELECT * , oid FROM categories"
	database.all(selectCategories, (error, results) => {
		if (error) {
			console.error(new Error("Could not get all categories: ", error))
			response.send("Could not get all categories")
		}
		else {
			response.send(results)
		}
	})
})


//Get one category
app.get("/api/categories/:id", (request, response) => {
	console.log(`Get request for category_id: ${request.params.id}`)
	let selectOneCategory = "SELECT * , oid FROM categories WHERE oid = ?"
	database.get(selectOneCategory, [request.params.id], (error, results) => {
		if (error) {
			console.error(new Error(`Cannot get category_id: ${request.params.id} error: `, error))
			response.send(`Cannot get category_id: ${request.params.id}`)
		}
		else {
			response.send(results)
		}
	})
})


//Create new category
app.post("/api/categories", (request, response) => {
	//Logs the request JSON body
	console.log("Create category: ", request.body)
	let body = request.body
	let createCategory = "INSERT INTO categories VALUES (?)"
	database.run(createCategory, [body.name], function(error) {
		if (error) {
			console.error(new Error("Could not create new category", error))
			response.send("Could not create new category")
		}
		else {
			//Returns an updated categories table 
			let selectCategories = "SELECT * , oid FROM categories"
			database.all(selectCategories, (error, results) => {
				if (error) {
					console.error(new Error("Could not get all categories: ", error))
					response.send("Could not get all categories")
				}
				else {
					response.send(results)
				}
			}
		)}
	})
})


//Update category
app.put("/api/categories/:id", (request,response) => {
	console.log(`Put request for category id: ${request.params.id}`)
	//Uses the keys in request.body to create dynamic SET values
	let requestKeys = Object.keys(request.body).map(ele => `${ele} = ?`)
	//Uses dynamic SET values from requestKeys to build full UPDATE query
	let updateOneCategory = `UPDATE categories SET ${requestKeys.join(", ")} WHERE categories.oid = ?`;
	//Add values from request.body
	let queryValues = [...Object.values(request.body), request.params.id]
	//Runs Query based on what was chosen for updates
	database.run(updateOneCategory, queryValues, function (error) {
	    if (error) {
	 	    console.log(new Error("Could not update category"), error)
	     	response.send("Could not update categories")
	    } 
	    else {
	    	//Returns an updated category
			let selectOneCategory = "SELECT * , oid FROM categories WHERE oid = ?"
	      	database.get(selectOneCategory, [request.params.id], (error, results) => {
				if (error) {
					console.error(new Error(`Cannot get category_id: ${request.params.id} error: `, error))
					response.send(`Cannot get category_id: ${request.params.id}`)
				}
				else {
					response.send(results)
				}
			})
	    }
	})
})


//Delete category
app.delete("/api/categories/:id", (request, response) => {
	console.log(`Delete request for category_id: ${request.params.id}`)
	let deleteCategory = "DELETE FROM categories WHERE oid = ?"
	database.run(deleteCategory, [request.params.id], (error) => {
		if (error) {
			console.error(new Error(`Could not delete category_id: ${request.params.id} error: `, error))
			response.send("Could not delete category")
		}
		else{
			//Returns updated category table 
			let selectCategories = "SELECT * , oid FROM categories"
			database.all(selectCategories, (error, results) => {
				if (error) {
					console.error(new Error("Could not get all categories: ", error))
					response.send("Could not get all categories")
				}
				else {
					response.send(results)
				}
			}
		)}
	})
})



/////////////////////////////////////////////////
// Routes for Tags
/////////////////////////////////////////////////


//Get all tags
app.get("/api/tags", (request, response) => {
	console.log("Get request for all tags")
	let selectTags = "SELECT *, oid from tags"
	database.all(selectTags, (error, results) => {
		if (error) {
			console.error(new Error("Could not get all tags: ", error))
			response.send("Could not get all tags")
		}
		else {
			response.send(results)
		}
	})
})


//Get tags by category_id
app.get("/api/tags/:id", (request, response) => {
	console.log(`Get request for tags via category_id: ${request.params.id}`)
	let selectTagByCategory = "SELECT * , oid FROM tags WHERE category_id = ?"
	database.all(selectTagByCategory, [request.params.id], (error, results) => {
		if (error) {
			console.error(new Error(`Cannot get with category_id: ${request.params.id} error: `, error))
			response.send(`Cannot get with category_id: ${request.params.id}`)
		}
		else {
			response.send(results)
		}
	})
})


//Create new tag
app.post("/api/tags", (request, response) => {
	//Logs the request JSON body
	console.log("Create tag: ", request.body)
	let body = request.body
	let createTag = "INSERT INTO tags VALUES (?, ?)"
	database.run(createTag, [body.name, body.category_id], function(error) {
		if (error) {
			console.error(new Error("Could not create new tag", error))
			response.send("Could not create new tag")
		}
		else {
			//Returns an updated tags table 
			let selectTags = "SELECT * , oid FROM tags"
			database.all(selectTags, (error, results) => {
				if (error) {
					console.error(new Error("Could not get all tags: ", error))
					response.send("Could not get all tags")
				}
				else {
					response.send(results)
				}
			}
		)}
	})
})


//Update tag
app.put("/api/tags/:id", (request,response) => {
	console.log(`Put request for tag_id: ${request.params.id}`)
	//Uses the keys in request.body to create dynamic SET values
	let requestKeys = Object.keys(request.body).map(ele => `${ele} = ?`)
	//Uses dynamic SET values from requestKeys to build full UPDATE query
	let updateOneTag = `UPDATE tags SET ${requestKeys.join(", ")} WHERE tags.oid = ?`;
	//Add values from request.body
	let queryValues = [...Object.values(request.body), request.params.id]
	//Runs Query based on what was chosen for updates
	database.run(updateOneTag, queryValues, function (error) {
	    if (error) {
	 	    console.log(new Error("Could not update tag"), error)
	     	response.send("Could not update tags")
	    } 
	    else {
	    	//Returns an updated tag
			let selectOneTag = "SELECT * , oid FROM tags WHERE oid = ?"
	      	database.get(selectOneTag, [request.params.id], (error, results) => {
				if (error) {
					console.error(new Error(`Cannot get tag_id: ${request.params.id} error: `, error))
					response.send(`Cannot get tag_id: ${request.params.id}`)
				}
				else {
					response.send(results)
				}
			})
	    }
	})
})


//Delete tag
app.delete("/api/tags/:id", (request, response) => {
	console.log(`Delete request for tag_id: ${request.params.id}`)
	let deleteTag = "DELETE FROM tags WHERE oid = ?"
	database.run(deleteTag, [request.params.id], (error) => {
		if (error) {
			console.error(new Error(`Could not delete tag_id: ${request.params.id} error: `, error))
			response.send("Could not delete tag")
		}
		else{
			//Returns updated tags table 
			let selectTags = "SELECT * , oid FROM tags"
			database.all(selectTags, (error, results) => {
				if (error) {
					console.error(new Error("Could not get all tags: ", error))
					response.send("Could not get all tags")
				}
				else {
					response.send(results)
				}
			}
		)}
	})
})



/////////////////////////////////////////////////
// Routes for EntryTags
/////////////////////////////////////////////////

//Get all entrytags
app.get("/api/entrytags", (request, response) => {
	console.log("Get request for all entrytags")
	let selectEntryTags = "SELECT * , oid FROM entrytags"
	database.all(selectEntryTags, (error, results) => {
		if (error) {
			console.error(new Error("Could not get all entrytags: ", error))
			response.send("Could not get all entrytags")
		}
		else {
			response.send(results)
		}
	})
})


//Get all tags associated with an entry
app.get("/api/entrytags/entry/:id", (request, response) => {
	console.log(`Get request for tags for entry id: ${request.params.id}`)
	let selectOneEntryTag = "SELECT entrytags.oid, tags.name AS tag FROM entrytags JOIN tags ON tag_id = tags.oid JOIN entries ON entry_id = entries.oid WHERE entries.oid = ?"
	database.all(selectOneEntryTag, [request.params.id], (error, results) => {
		if (error) {
			console.error(new Error(`Cannot get entrytag_id: ${request.params.id} error: `, error))
			response.send(`Cannot get entrytag_id: ${request.params.id}`)
		}
		else {
			response.send(results)
		}
	})
})


//Create new entrytag
app.post("/api/entrytags", (request, response) => {
	//Logs the request JSON body
	console.log("Create entrytag: ", request.body)
	let body = request.body
	let createEntryTag = "INSERT INTO entrytags VALUES (?, ?)"
	database.run(createEntryTag, [body.entry_id, body.tag_id], function(error) {
		if (error) {
			console.error(new Error("Could not create new entrytag", error))
			response.send("Could not create new entrytag")
		}
		else {
			//Returns an updated entrytags table 
			let selectEntryTags = "SELECT * , oid FROM entrytags"
			database.all(selectEntryTags, (error, results) => {
				if (error) {
					console.error(new Error("Could not get all entrytags: ", error))
					response.send("Could not get all entrytags")
				}
				else {
					response.send(results)
				}
			}
		)}
	})
})


//Update entrytag
app.put("/api/entrytags/:id", (request,response) => {
	console.log(`Put request for entrytag_id: ${request.params.id}`)
	//Uses the keys in request.body to create dynamic SET values
	let requestKeys = Object.keys(request.body).map(ele => `${ele} = ?`)
	//Uses dynamic SET values from requestKeys to build full UPDATE query
	let updateOneEntryTag = `UPDATE entrytags SET ${requestKeys.join(", ")} WHERE entrytags.oid = ?`;
	//Add values from request.body
	let queryValues = [...Object.values(request.body), request.params.id]
	//Runs Query based on what was chosen for updates
	database.run(updateOneEntryTag, queryValues, function (error) {
	    if (error) {
	 	    console.log(new Error("Could not update entrytag"), error)
	     	response.send("Could not update entrytags")
	    } 
	    else {
	    	//Returns an updated entrytag
			let selectOneEntryTag = "SELECT * , oid FROM entrytags WHERE oid = ?"
	      	database.get(selectOneEntryTag, [request.params.id], (error, results) => {
				if (error) {
					console.error(new Error(`Cannot get entrytag_id: ${request.params.id} error: `, error))
					response.send(`Cannot get entrytag_id: ${request.params.id}`)
				}
				else {
					response.send(results)
				}
			})
	    }
	})
})


//Delete entrytag
app.delete("/api/entrytags/:id", (request, response) => {
	console.log(`Delete request for entrytag_id: ${request.params.id}`)
	let deleteEntryTag = "DELETE FROM entrytags WHERE oid = ?"
	database.run(deleteEntryTag, [request.params.id], (error) => {
		if (error) {
			console.error(new Error(`Could not delete entrytag_id: ${request.params.id} error: `, error))
			response.send("Could not delete entrytag")
		}
		else{
			//Returns updated entrytags table 
			let selectEntrytags = "SELECT * , oid FROM entrytags"
			database.all(selectEntrytags, (error, results) => {
				if (error) {
					console.error(new Error("Could not get all entrytags: ", error))
					response.send("Could not get all entrytags")
				}
				else {
					response.send(results)
				}
			}
		)}
	})
})


//Start Server
app.listen(port,() =>
	console.log(`App is open on port: ${port}`))