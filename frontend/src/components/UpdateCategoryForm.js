import React, { Component } from "react"
import { Button, Form } from "react-bootstrap"

class UpdateCategoryForm extends Component {
	state = {
		category:{
			oid: this.props.category.rowid,
			name:""
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
		this.props.updateCategory(category)
		this.setState({
			category:{
				oid: this.props.category.rowid,
				name:""
			}
		})
	}

	render() {
		return(
			<div style={this.props.style} className = "updateCategoryForm">
				<Form onSubmit = { this.onFormSubmit } style={{ width: "20rem"}}>
					<Form.Group>
						<Form.Label> Category Name </Form.Label>
						<Form.Control 
						autoFocus = {this.props.autoFocus}
						onChange={this.handleChange}
						type="text"
						name="name"
						placeholder="Category Name Input"
						value={this.state.category.name}
						/>
					</Form.Group>
					<Button variant = "secondary" type="submit" className = "btn">Save</Button>
				</Form>
			</div>
		)
	}
}

export default UpdateCategoryForm