import React, { Component } from "react"
import EntryModel from "../models/EntryModel"
import EntryTagsModel from "../models/EntryTagsModel"
import CreateEntryForm from "../components/CreateEntryForm"
import CategoryHolder from "../components/CategoryHolder"
import CategoriesModel from "../models/CategoriesModel"
import CreateCategoryForm from "../components/CreateCategoryForm"
import CategoryContext from "../contexts/CategoryContext"

class CreateEntryContainer extends Component {
	state = {
		entry:[],
		tags:[]
	}

	fetchCategories = () => {
		CategoriesModel.all().then((response) => {
			this.setState({
				categories: response
			})
		})
	}

	componentDidMount() {
		this.fetchCategories(this.state.categories)
	}

	createEntry = (entry) => {
		EntryModel.create(entry)
		.then((response) => {
			console.log("dog", response)
			let entryrowid = response[0].rowid
			console.log("entryrow: ", entryrowid)
			let tagsArray = this.state.tags
			let mappedTags = tagsArray.map((tag) => {
				let tagObject = {
					entry_id: entryrowid,
					tag_id: tag.rowid
				}
				EntryTagsModel.create(tagObject).then((response) => {
					console.log(response)
				})
			})
		})
	}

	toggleTag = (tag) => {
		let tagid = null
		for(let i = 0; i < this.state.tags.length; i++) {
			if (this.state.tags[i].rowid == tag.rowid) {
				tagid = tag.rowid
				break;
			}
		}		
		if (tagid !== null){
			this.setState({
				tags: this.state.tags.filter(tag => {
					return tag.rowid != tagid
				})
			})
			console.log("removed")
		}
		else {
			this.setState({
				tags: [ ...this.state.tags, tag ]
			})
			console.log("added")
		}
	}

	render(){
		return(
			<div className = "createEntryContainer">
				<h2>Create an Entry!</h2>
				<CreateEntryForm createEntry = {this.createEntry} />
				<CategoryContext.Provider value={{
					state: this.state,
					onTagToggle: this.toggleTag
				}}>
					<div className = "categoriesContainer">
						{ this.state.categories 
							? <CategoryHolder categories = {this.state.categories} 
								deleteCategory = {this.deleteCategory}
								updateCategory = {this.updateCategory} 
							/>
							:"Loading Categories"
						}
						<CreateCategoryForm createCategory = {this.createCategory} />
					</div>
				</CategoryContext.Provider>
			</div>
		)
	}
}

export default CreateEntryContainer