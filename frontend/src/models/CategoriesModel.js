const endPointCategories = "http://localhost:9000/api/categories"

class CategoriesModel {
	//Makes a get request to get all categories and returns it as a JSON
	static all = () => {
		return fetch(endPointCategories)
			.then(response => response.json())
			.catch(error => console.log("Get Categories Model failed"))
	}

	static create = (category) => {
		console.log(category)
		return fetch(endPointCategories, {
			method:"POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(category)
		})
			.then(response => response.json())
			.catch(error => console.log("Create Categories Model failed"))
	}

	static delete = (category) => {
		return fetch(`${endPointCategories}/${category.rowid}`, {
			method:"DELETE"
		})
			.then(response => response.json())
			.catch(error => console.log("Delete Categories Model failed"))
	}

	static update = (category) => {
		console.log(category)
		return fetch(`${endPointCategories}/${category.oid}`, {
			method:"PUT",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(category)
		})
			.then(response => response.json())
			.catch(error => console.log("Create Categories Model failed"))
	}
}

export default CategoriesModel