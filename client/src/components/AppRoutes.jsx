import React from "react"
import {Route, Routes } from "react-router-dom"

import DonutList from "../features/donuts/DonutList"
import DonutDetails from "../features/donuts/DonutDetails"
import DonutAddForm from "../features/donuts/DonutAddForm"
import DonutEditForm from "../features/donuts/DonutEditForm"
import ToppingList from "../features/toppings/ToppingList"
import ToppingDetails from "../features/toppings/ToppingDetails"
import ToppingAddForm from "../features/toppings/ToppingAddForm"
import ToppingEditForm from "../features/toppings/ToppingEditForm"
import OrderList from "../features/orders/OrderList"
import OrderDetails from "../features/orders/OrderDetails"

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<DonutList />} />
            <Route path="/toppings" element={ <ToppingList/>}/>
            <Route path="/orders" element={ <OrderList/>}/>
            <Route path="menu/:id" element={<DonutDetails />}/>
            <Route path="toppings/:id" element={<ToppingDetails />}/>
            <Route path="orders/:id" element={<OrderDetails />}/>
            <Route path="menu/:id/edit" element={<DonutEditForm />}/>
            <Route path="toppings/:id/edit" element={<ToppingEditForm />}/>
            <Route path="/add/donut" element={ <DonutAddForm />} />
            <Route path="/add/topping" element={ <ToppingAddForm/>}/>
        </Routes>
    )
}

export default AppRoutes