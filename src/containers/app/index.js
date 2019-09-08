import React from 'react'
import { Route } from 'react-router-dom'
import Dashboard from '../Dashboard'
import Pesanan from '../Pesanan'
import Inventory from '../Inventory'
import About from '../about'
import Sidebar from "../../component/Sidebar";
import BellNotif from "../../component/BellNotif";

const App = () => (
  <div>
    <Sidebar/>
    <BellNotif/>
    <main className="main">
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/pesanan/:pageId" component={Pesanan} />
      <Route exact path="/inventory/:pageId" component={Inventory} />
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)

export default App
