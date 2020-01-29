import React, { Component } from "react"
import { Button, Form } from "react-bootstrap"

class UpdateEntryForm extends Component {
	state = {
		entry:{
			oid: this.props.entry.rowid,
			creator_id: this.props.entry.creator_id,
			date: "",
			content: ""
		}
	}

	handleChange = (event) => {
		let entryCopy = {...this.state.entry}
		entryCopy[event.target.name] = event.target.value
		this.setState({ entry: entryCopy })
	}

	onFormSubmit = (event) => {
		event.preventDefault()
		let entry = this.state.entry
		this.props.updateEntry(entry)
		this.setState({
			entry:{
				oid: this.props.rowid,
				creator_id: this.props.creator_id,
				date: "",
				content: ""
			}
		})
	}

	render() {
		return(
			<div style={this.props.style} className = "updateEntryForm">
				<Form onSubmit = { this.onFormSubmit } style={{ width: "30rem"}}>
					<Form.Group>
						<Form.Label> Date </Form.Label>
						<Form.Control 
						autoFocus = {this.props.autoFocus}
						onChange={this.handleChange}
						type="date"
						name="date"
						placeholder="Date Input"
						value={this.state.entry.date}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Label> Content </Form.Label>
						<Form.Control 
						as="textarea"
						rows="3"
						autoFocus = {this.props.autoFocus}
						onChange={this.handleChange}
						type="text"
						name="content"
						placeholder="Content Input"
						value={this.state.entry.content}
						/>
					</Form.Group>
					<Button variant = "secondary" type="submit" className = "btn">Save</Button>
				</Form>
			</div>
		)
	}
}

export default UpdateEntryForm