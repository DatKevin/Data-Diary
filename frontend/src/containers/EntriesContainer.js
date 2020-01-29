import React, { Component } from "react"
import EntryModel from "../models/EntryModel"
import EntryHolder from "../components/EntryHolder"

class EntriesContainer extends Component {
	state = {
		entries:[],
	}

	//Uses the model to make a get all request
	fetchEntries = () => {
		EntryModel.all().then((response) => {
			this.setState({
				entries: response
			})
		})
	}

	//Fetches all entries when starting component
	componentDidMount() {
		this.fetchEntries(this.state.entries)
	}

	createEntry = (entry) => {
		EntryModel.create(entry).then((response) => {
			this.setState({
				entries: response
			})
		})
	}

	deleteEntry = (entry) => {
		EntryModel.delete(entry).then((response) => {
			this.setState({
				entries: response
			})
		})
	}

	updateEntry = (entry) => {
		EntryModel.update(entry).then((response) => {
			this.fetchEntries();
		})
	}

	render() {
		return(
			<div className = "entriesContainer" text-align = "center">
				{ this.state.entries 
					? <EntryHolder entries = {this.state.entries} 
						deleteEntry = {this.deleteEntry}
						updateEntry = {this.updateEntry} />
					:"Loading Entries"
				}
			</div>
		)
	}
}

export default EntriesContainer