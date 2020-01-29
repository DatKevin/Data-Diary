import React from "react"
import Category from "./Category"

const CategoryHolder = (props) => {
	let categories = props.categories.map((category) => {
		return(
			<Category
				key = {category.rowid}
				category = {category}
				deleteCategory = {props.deleteCategory}
				updateCategory = {props.updateCategory}
			/>
		)
	})

	return(
		<div>
			{categories}
		</div>
	)
}

export default CategoryHolder