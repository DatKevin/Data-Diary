import React, { Component } from "react"
import { Button, Form } from "react-bootstrap"

class CreateTagForm extends Component {
	state = {
		tag:{
			name: "",
			category_id: this.props.rowid,
		}
	}

	handleChange = (event) => {
		let tagCopy = {...this.state.tag}
		tagCopy[event.target.name] = event.target.value
		this.setState({ tag: tagCopy })
	}

	onFormSubmit = (event) => {
		event.preventDefault()
		let tag = this.state.tag
		this.props.createTag(tag)
		this.setState({
			tag:{
				name: "",
				category_id: this.props.rowid,
			}
		})
	}

	render() {
		return(
			<div>
				<Form onSubmit = {this.onFormSubmit} className = "Form" style={{ width: "20rem"}}>
					<Form.Group>
						<Form.Label> New Tag</Form.Label>
						<Form.Control 
							onChange={this.handleChange}
							type="text"
							name="name"
							placeholder="Tag Name Input"
							value={this.state.tag.name}
						/>
					</Form.Group>
					<Button variant = "info" type = "submit" className = "btn">
						Create Tag 
					</Button>
					<p></p>
				</Form>
			</div>
		)
	}
}

export default CreateTagForm