import React, { Component } from "react"
import UpdateTagForm from "./UpdateTagForm"
import { Card, Button } from "react-bootstrap"
import CategoryContext from "../contexts/CategoryContext"

class Tag extends Component {
	static contextType = CategoryContext

	state = {
		formStyle:{
			display:"none"
		}
	}

	toggleBodyForm = () => {
		this.state.formStyle.display === "block"
		? this.setState({ formStyle: {display:"none"} })
		: this.setState({ formStyle: {display:"block"} })
	}

	deleteTag = () => {
		this.props.deleteTag(this.props.tag)
	}

	render() {
		return(
			<Card bg = "light" style={{ width: "15rem"}}>
				<Card.Body>
					<Card.Title className = "Tag" onClick = {()=>this.context.onTagToggle(this.props.tag)}>{this.props.tag.name}</Card.Title>
					<Button size = "sm" variant = "info" onClick = {this.toggleBodyForm}> Edit Tag </Button>
					<Button size = "sm" variant = "danger" onClick = {this.deleteTag}> Remove Tag </Button> 
					<UpdateTagForm 
						tag = {this.props.tag}
						style = {this.state.formStyle}
						buttonName = "Update Tag"
						updateTag = {this.props.updateTag}
						toggleBodyForm = {this.toggleBodyForm} 
					/>
				</Card.Body>
			</Card>
		)
	}
}

export default Tag