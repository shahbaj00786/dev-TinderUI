import { Outlet } from "react-router-dom" //any children route of Body will render over here
import NavBar from "./NavBar"
import Footer from "./Footer"


const Body = () => {
  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body