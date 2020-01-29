//URL to get all tags associated with an entry ID
const endPointEntryTagsEntry = "http://localhost:9000/api/entrytags/entry/"
const endPointEntryTags = "http://localhost:9000/api/entrytags"

class EntryTagsModel {
	//Makes a get request to get all entries and returns it as a JSON
	static all = (entry) => {
		return fetch(`${endPointEntryTagsEntry}${entry}`)
			.then(response => response.json())
			.catch(error => console.log("EntryTag Model: Could not fetch all tags for the entry"))
	}

	static create = (entrytags) => {
		console.log(entrytags)
		return fetch(endPointEntryTags, {
			method:"POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(entrytags)
		})
			.then(response => response.json())
			.catch(error => console.log("Create Entry Model failed"))
	}

}

export default EntryTagsModel