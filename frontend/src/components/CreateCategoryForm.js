import React, { Component } from "react"
import { Button, Form } from "react-bootstrap"

class CreateCategoryForm extends Component {
	state = {
		category:{
			name: ""
		}
	}

	handleChange = (event) => {
		let categoryCopy = {...this.state.category}
		categoryCopy[event.target.name] = event.target.value
		this.setState({ category: categoryCopy })
	}

	onFormSubmit = (event) => {
		event.preventDefault()
		let category = this.state.category
		this.props.createCategory(category)
		this.setState({
			category:{
				name: ""
			}
		})
	}

	render() {
		return(
			<div>
				<Form onSubmit = {this.onFormSubmit} className = "Form" style={{ width: "20rem"}}>
					<Form.Group>
						<Form.Label> Category </Form.Label>
						<Form.Control 
							onChange={this.handleChange}
							type="text"
							name="name"
							placeholder="Name Input"
							value={this.state.category.name}
						/>
					</Form.Group>
					<Button variant = "info" type = "submit" className = "btn">
						Create Category 
					</Button>
				</Form>
			</div>
		)
	}
}

export default CreateCategoryForm