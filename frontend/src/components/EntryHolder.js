import React from "react"
import Entry from "./Entry"

//Component that holds all of the Entries
const EntryHolder = (props) => {
	//Takes the JSON data and converts each one into a singular entry
	let entries = props.entries.map((entry) => {
		console.log(entry)
		return(
			<Entry 
				key = {entry.rowid}
				entry = {entry}
				deleteEntry = {props.deleteEntry}
				updateEntry = {props.updateEntry}
			/>
		)
	})


	return(
		<div>
			{entries}
		</div>
	)
} 

export default EntryHolder