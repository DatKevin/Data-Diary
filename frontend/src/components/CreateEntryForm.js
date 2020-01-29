import React, { Component } from "react"
import { Button, Form } from "react-bootstrap"

class CreateEntryForm extends Component {
	state = {
		entry:{
			creator_id: "",
			date: "",
			content: ""
		},
	}

	handleChange = (event) => {
		let entryCopy = {...this.state.entry}
		entryCopy[event.target.name] = event.target.value
		this.setState({ entry: entryCopy })
	}

	onFormSubmit = (event) => {
		event.preventDefault()
		let entry = this.state.entry
		this.props.createEntry(entry)
		this.setState({
			entry:{
				creator_id: "",
				date: "",
				content: ""
			}
		})
	}

	render() {
		return(
			<div>
				<Form onSubmit = {this.onFormSubmit} className = "Form" style={{ width: "30rem"}}>
					<Form.Group>
						<Form.Label> Date </Form.Label>
						<Form.Control 
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
							onChange={this.handleChange}
							type="text"
							name="content"
							placeholder="Content Input"
							value={this.state.entry.content}
						/>
					</Form.Group>
					<Button type = "submit" className = "btn">
						Create Entry 
					</Button>
				</Form>
			</div>
		)
	}
}

export default CreateEntryForm