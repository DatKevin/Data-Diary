const endPointLogin = ""

class AuthLoginModel {
	static all = (user) => {
		return fetch(endPointLogin, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(user)
		})
			.then(response => response.json())
			.then(data => { 
				console.log("Got the data", data)
				this.props.setCurrentUser(data.signedJwt)
				//this.props.history.push("/profile")
			})
			.catch(error => console.log("Login Auth Model has failed"))
	}
}

export default AuthLoginModel