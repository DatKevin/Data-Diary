const endPointUsers = "http://localhost:9000/api/users"

class UsersModel {

	static all = (user) => {
		return fetch(`${endPointUsers}${user}`)
			.then(response => response.json())
			.catch(error => console.log("Grab one User Could not fetch all tags for the entry"))
	}


	static create = (user) => {
		console.log(user)
		return fetch(endPointUsers, {
			method:"POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(user)
		})
			.then(response => response.json())
			.catch(error => console.log("Create Users Model failed"))
	}
}

export default UsersModel