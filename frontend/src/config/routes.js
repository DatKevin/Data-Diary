import React from "react"
import { Switch, Route } from "react-router-dom"
import HomeContainer from "../containers/HomeContainer"
import CreateEntryContainer from "../containers/CreateEntryContainer"
import EntriesContainer from "../containers/EntriesContainer"
import CategoryContainer from "../containers/CategoryContainer"
import CreateUserContainer from "../containers/CreateUserContainer"

export default(
	<Switch>
		<Route exact path = "/" component = { HomeContainer } />
		<Route exact path = "/createentry" component = { CreateEntryContainer } />
		<Route exact path = "/entries" component = { EntriesContainer } />
		<Route exact path = "/tags" component = { CategoryContainer } />
		<Route exact path = "/createuser" component = { CreateUserContainer } />
	</Switch>
	)