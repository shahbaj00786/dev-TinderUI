import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "./constants"

const Login = () => {
  const [emailId, setEmailId] = useState("srk@gmail.com");
  const [password, setPassword] = useState("Srknew@786");
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const handleLogin = async () => {
    
    const res = await axios.post(BASE_URL+"/login", {
      emailId,
      password,
    },{withCredentials: true}); //for token
    dispatch(addUser(res.data))
    navigate("/")
    console.log(res.data)
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-cyan-800 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend pb-2">Email Id</legend>
            <input
              value={emailId}
              type="text"
              className="input"
              placeholder="Type here "
              onChange={(e) => setEmailId(e.target.value)}
            />

            <legend className="fieldset-legend pb-2">Password</legend>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              className="input"
              placeholder="Type here "
            />

            <div className="flex justify-center pt-2">
              <button className="btn bg-slate-800"
              onClick={handleLogin}
              >Login</button>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
