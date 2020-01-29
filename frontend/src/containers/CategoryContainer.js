import React, { Component } from "react"
import CategoriesModel from "../models/CategoriesModel"
import CategoryHolder from "../components/CategoryHolder"
import CreateCategoryForm from "../components/CreateCategoryForm"

class CategoriesContainer extends Component {
	state = {
		categories:[],
	}

	//Uses the model to make a get all request
	fetchCategories = () => {
		CategoriesModel.all().then((response) => {
			this.setState({
				categories: response
			})
		})
	}

	//Fetches all categories when starting component
	componentDidMount() {
		this.fetchCategories(this.state.categories)
	}

	createCategory = (category) => {
		CategoriesModel.create(category).then((response) => {
			this.setState({
				categories: response
			})
		})
	}

	deleteCategory = (category) => {
		CategoriesModel.delete(category).then((response) => {
			this.setState({
				categories: response
			})
		})
	}

	updateCategory = (category) => {
		CategoriesModel.update(category).then((response) => {
			this.fetchCategories()
		})
	}

	render() {
		return(
			<div className = "categoriesContainer">
				{ this.state.categories 
					? <CategoryHolder categories = {this.state.categories} 
						deleteCategory = {this.deleteCategory}
						updateCategory = {this.updateCategory} />
					:"Loading Categories"
				}
				<CreateCategoryForm createCategory = {this.createCategory} />
			</div>
		)
	}
}

export default CategoriesContainer