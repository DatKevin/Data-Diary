const endPointEntries = "http://localhost:9000/api/entries"

class EntryModel {
	//Makes a get request to get all entries and returns it as a JSON
	static all = () => {
		return fetch(endPointEntries)
			.then(response => response.json())
			.catch(error => console.log("Get Entry Model failed"))
	}

	static create = (entry) => {
		console.log(entry)
		return fetch(endPointEntries, {
			method:"POST",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(entry)
		})
			.then(response => response.json())
			.catch(error => console.log("Create Entry Model failed"))
	}

	static delete = (entry) => {
		return fetch(`${endPointEntries}/${entry.rowid}`, {
			method:"DELETE"
		})
			.then(response => response.json())
			.catch(error => console.log("Delete Entry Model failed"))
	}

	static update = (entry) => {
		console.log(entry)
		return fetch(`${endPointEntries}/${entry.oid}`, {
			method:"PUT",
			headers: {
				"Content-Type":"application/json"
			},
			body: JSON.stringify(entry)
		})
			.then(response => response.json())
			.catch(error => console.log("Update Entry Model failed"))
	}
}

export default EntryModel