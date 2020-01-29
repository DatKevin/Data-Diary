//URL to get all tags associated with an tag ID
const endPointTags = "http://localhost:9000/api/tags/"

class TagsModel {
	//Makes a get request to get all entries and returns it as a JSON
	static all = (category_id) => {
		return fetch(`${endPointTags}${category_id}`)
			.then(response => response.json())
			.catch(error => console.log("Get Tag Model: Could not fetch all tags for the categories"))
	}

	static create = (tag) => {
		console.log(tag)
		return fetch(endPointTags, {
			method:"POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(tag)
		})
			.then(response => response.json())
			.catch(error => console.log("Create Tag Model failed"))
	}

	static delete = (tag) => {
		return fetch(`${endPointTags}${tag.rowid}`, {
			method:"DELETE"
		})
			.then(response => response.json())
			.catch(error => console.log("Delete Tag Model failed"))
	}

	static update = (tag) => {
		console.log(tag)
		return fetch(`${endPointTags}${tag.oid}`, {
			method:"PUT",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(tag)
		})
			.then(response => response.json())
			.catch(error => console.log("Update Tag Model failed"))
	}

}

export default TagsModel