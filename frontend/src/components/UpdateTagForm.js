import React, { Component } from "react"
import { Button, Form } from "react-bootstrap"

class UpdateTagForm extends Component {
	state = {
		tag:{
			oid: this.props.tag.rowid,
			name:""
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
		this.props.updateTag(tag)
		this.setState({
			tag:{
				oid: this.props.rowid,
				name:""
			}
		})
	}

	render() {
		return(
			<div style={this.props.style} className = "updateTagForm">
				<Form onSubmit = { this.onFormSubmit } style={{ width: "20rem"}}>
					<Form.Group>
						<Form.Label> New Tag Name </Form.Label>
						<Form.Control 
						autoFocus = {this.props.autoFocus}
						onChange={this.handleChange}
						type="text"
						name="name"
						placeholder="Tag Name Input"
						value={this.state.tag.name}
						/>
					</Form.Group>
					<Button variant = "secondary" type="submit" className = "btn">Save</Button>
				</Form>
			</div>
		)
	}
}

export default UpdateTagForm