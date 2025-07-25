import { Outlet, useNavigate } from "react-router-dom"; //any children route of Body will render over here
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData= useSelector((store)=>store.user) 

  const fetchUser = async () => {
    if(userData) return //do not make api call again for profile if login...If user already exists, no need to fetch again
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      err.status === 401 ? navigate("/login") : console.log(err);
    }
  }

  useEffect(() => {
    //call only once when page reloads
    fetchUser();
  }, []);
 
return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
