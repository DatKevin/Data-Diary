import React, { Component } from "react"
import TagsModel from "../models/TagsModel"
import TagsHolder from "./TagsHolder"
import CreateTagForm from "./CreateTagForm"
import UpdateCategoryForm from "./UpdateCategoryForm"
import { Button } from "react-bootstrap"

class Category extends Component {
	state = {
		tags:[],
		formStyle:{
			display:"none"
		}
	}

	toggleBodyForm = () => {
		this.state.formStyle.display === "block"
		? this.setState({ formStyle: {display:"none"} })
		: this.setState({ formStyle: {display:"block"} })
	}

	//Acts as a container for the associated tag for the category post
	fetchTags = (category) => {
		console.log(category)
		TagsModel.all(category).then((response) => {
			this.setState({
				tags:response
			})
			console.log(this.state.tags)
		})
	}

	componentDidMount() {
		this.fetchTags(this.props.category.rowid)
	}

	deleteCategory = () => {
		this.props.deleteCategory(this.props.category)
	}


	createTag = (tag) => {
		TagsModel.create(tag).then((response) => {
			this.setState({
				tags: response
			})
		})
	}

	deleteTag = (tag) => {
		TagsModel.delete(tag).then((response) => {
			this.setState({
				tags: response
			})
		})
	}

	updateTag = (tag) => {
		TagsModel.update(tag).then((response) => {
			this.fetchTags(this.props.category.rowid)
		})
	}

	render(){
		return(	
			<div className = "category">
				<h3 className = "title">{this.props.category.name}</h3>
				<p className = "tags"> 
					{ this.state.tags
						? <TagsHolder tags = {this.state.tags}
							deleteTag = {this.deleteTag}
							updateTag = {this.updateTag} 
							/>
						: "Loading"} 
				</p>
				<CreateTagForm createTag = {this.createTag} rowid = {this.props.category.rowid}/>
				<Button variant = "info" onClick = {this.toggleBodyForm}> Edit Category </Button>
				<Button variant = "danger"onClick = {this.deleteCategory}> Remove Category </Button> 
				<UpdateCategoryForm 
					category = {this.props.category}
					style = {this.state.formStyle}
					buttonName = "Update Category"
					updateCategory = {this.props.updateCategory}
					toggleBodyForm = {this.toggleBodyForm} 
				/>
			</div>
		)
	}
}

export default Category
