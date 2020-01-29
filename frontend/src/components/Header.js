import React from "react"
import { Link } from "react-router-dom"
import { Nav, Navbar, NavItem } from "react-bootstrap"

const Header = () => {
	return(
		<header>
			<h1>Data Diary</h1>
			<h3>Navigation</h3>
			<Navbar>
			<Nav> 
				<Link to = {"/"}> <NavItem>Home</NavItem> </Link>
				<Link to = {"/entries"}> Entries </Link>
				<Link to = {"/createentry"}> Create Entry </Link>
				<Link to = {"/tags"}> Tags </Link>
				<Link to = {"/createuser"}> Create User </Link>
			</Nav>
			</Navbar>
		</header>
	)
}

export default Header