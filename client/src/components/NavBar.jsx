import React from "react"
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <Link to="/">Donut Menu</Link>
            {" | "}
            <Link to="/toppings">Topping Menu</Link>
            {" | "}
            <Link to="/add/donut">Add Donut</Link>
            {" | "}
            <Link to="/add/topping">Add Topping</Link>
            {" | "}
            <Link to="/orders">Orders</Link>
        </nav>
    )
}

export default NavBar