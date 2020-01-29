import React from "react"
import EntryTags from "./EntryTags"
import { ListGroup } from "react-bootstrap"

//Component that holds all of the Entries
const EntryTagsHolder = (props) => {
	//Takes the JSON data and converts each one into a singular entry
	let entrytags = props.entrytags.map((tag) => {
		return(
			<EntryTags
				key = {tag.rowid}
				tag = {tag}
			/>
		)
	})


	return(
		<ListGroup style={{ width: "15rem"}} font-size = "1.2em">
			{entrytags}
		</ListGroup>
	)
} 

export default EntryTagsHolder