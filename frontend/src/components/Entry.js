import React, { Component } from "react"
import EntryTagsModel from "../models/EntryTagsModel"
import EntryTagsHolder from "./EntryTagsHolder"
import UpdateEntryForm from "./UpdateEntryForm"
import { Button } from "react-bootstrap"

class Entry extends Component {
	state = {
		entrytags:[],
		formStyle:{
			display:"none"
		}
	}

	toggleBodyForm = () => {
		this.state.formStyle.display === "block"
		? this.setState({ formStyle: {display:"none"} })
		: this.setState({ formStyle: {display:"block"} })
	}

	//Acts as a container for the associated tag for the entry post
	fetchEntryTags = (entry) => {
		console.log(entry)
		EntryTagsModel.all(entry).then((response) => {
			this.setState({
				entrytags:response
			})
			console.log(this.state.entrytags)
		})
	}

	componentDidMount() {
		this.fetchEntryTags(this.props.entry.rowid)
	}

	deleteEntry = () => {
		this.props.deleteEntry(this.props.entry)
	}

	render(){
		return(	
			<div className = "entry">
				<h3 className = "date">{this.props.entry.date}</h3>
				<p className = "entrytags"> 
					{ this.state.entrytags
						? <EntryTagsHolder entrytags = {this.state.entrytags} />
						: "Loading"} 
				</p>
				<p className = "content">{this.props.entry.content}</p>
				<Button variant = "info" onClick = {this.toggleBodyForm}> Edit Entry </Button>
				<Button variant = "danger" onClick = {this.deleteEntry}> Remove Entry </Button> 
				<UpdateEntryForm 
					entry = {this.props.entry}
					style = {this.state.formStyle}
					buttonName = "Update Entry"
					updateEntry = {this.props.updateEntry}
					toggleBodyForm = {this.toggleBodyForm} 
				/>
			</div>
		)
	}
}

export default Entry
