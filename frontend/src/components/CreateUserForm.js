import React, { Component } from "react"
import { Button, Form } from "react-bootstrap"

class CreateUserForm extends Component {
	state = {
		user:{
			username: "",
			email: "",
			profilepicture:"",
			password:""
		}
	}

	handleChange = (event) => {
		let userCopy = {...this.state.user}
		userCopy[event.target.name] = event.target.value
		this.setState({ user: userCopy })
	}

	onFormSubmit = (event) => {
		event.preventDefault()
		let user = this.state.user
		this.props.createUser(user)
		this.setState({
			user:{
				username: "",
				email: "",
				profilepicture:"",
				password:""
			}
		})
		console.log("user created!")
	}

	render() {
		return(
			<div>
				<Form onSubmit = {this.onFormSubmit} className = "Form" style={{ width: "30rem"}}>
					<Form.Group>
						<Form.Label> Username </Form.Label>
						<Form.Control 
							onChange={this.handleChange}
							type="text"
							name="username"
							placeholder="Username Input"
							value={this.state.user.username}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label> Email </Form.Label>
						<Form.Control 
							onChange={this.handleChange}
							type="text"
							name="email"
							placeholder="Email Input"
							value={this.state.user.email}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label> Password </Form.Label>
						<Form.Control 
							onChange={this.handleChange}
							type="text"
							name="password"
							placeholder="Password Input"
							value={this.state.user.password}
						/>
					</Form.Group>
					<Button type = "submit" className = "btn">
						Create User 
					</Button>
				</Form>
			</div>
		)
	}
}

export default CreateUserForm