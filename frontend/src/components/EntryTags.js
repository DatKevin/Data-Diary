import React, { Component } from "react"
import { ListGroup } from "react-bootstrap"

class EntryTags extends Component {
	render(){
		return(	
			<ListGroup.Item>{this.props.tag.tag}</ListGroup.Item>
		)
	}
}

export default EntryTags