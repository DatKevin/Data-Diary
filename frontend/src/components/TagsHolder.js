import React from "react"
import Tag from "./Tag"

//Component that holds all of the tags
const TagHolder = (props) => {
	//Takes the JSON data and converts each one into a singular Tag
	let tags = props.tags.map((tag) => {
		return(
			<Tag 
				key = {tag.rowid}
				tag = {tag}
				deleteTag = {props.deleteTag}
				updateTag = {props.updateTag}
			/>
		)
	})


	return(
		<div>
			{tags}
		</div>
	)
} 

export default TagHolder