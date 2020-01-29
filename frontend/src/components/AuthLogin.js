import React, { Component } from "react"
import axios from "axios"
import AuthLoginModel from "../models/AuthLoginModel"

class Login extends Component {
	state ={
		username: "",
		password: "",
		error: null
	}

	handleChange = (event) => {
		this.setState({
			[event.taget.name]:event.target.value
		})
	}

	handleSubmit = (event) => {
	const { username, password } = this.state;

    axios
    	.post( "LINK", {
        	user: {
        		username: username,
        		password: password
        	}},
        	{ withCredentials: true }
    	)
    		.then(response => {
    			if (response.data.logged_in) {
    				this.props.handleSuccessfulAuth(response.data);
    			}
    		})
    		.catch(error => {
    			console.log("login error", error)
    		})
    		event.preventDefault()
    }

	render() {
		return(
			<div> 
				<form onSubmit = {this.onFormSubmit} className = "form">
					<input
						onChange={this.handleChange}
						type="text"
						name="username"
						placeholder="Username Input"
						value={this.state.entry.username}
					/>
					<input
						onChange={this.handleChange}
						type="text"
						name="password"
						placeholder="Password Input"
						value={this.state.entry.password}
					/>
					<button type = "submit" className = "btn">
						Create Tag 
					</button>
				</form>
			</div>
		)
	}
}