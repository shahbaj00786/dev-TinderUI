import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errMassage, setErrMassage] = useState("");
  const [firstName, SetFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    isLoginForm ? setIsLoginForm(false) : setIsLoginForm(true);
  };

  const handleSignUp = async () => {
    const res = await axios.post(
      BASE_URL + "/signup",
      { firstName, lastName, emailId, password },
      { withCredentials: true }
    );
    console.log(res);
    dispatch(addUser(res.data.data));
    navigate("/profile");
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      ); //for token
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrMassage(err.message);
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-cyan-800 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : " Sign UP"}
          </h2>
          <fieldset className="fieldset">
            {!isLoginForm && (
              <>
                <legend className="fieldset-legend pb-2">FirstName</legend>
                <input
                  value={firstName}
                  type="text"
                  className="input"
                  placeholder="Type here "
                  onChange={(e) => SetFirstName(e.target.value)}
                />
                <legend className="fieldset-legend pb-2">LastName</legend>
                <input
                  value={lastName}
                  type="text"
                  className="input"
                  placeholder="Type here "
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}
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
            <p className="text-red-700 font-bold">{errMassage}</p>
            <div className=" justify-center pt-2 mx-auto">
              <p
                className=" font-bold text-"
                onClick={handleClick}
              >
                {isLoginForm
                  ? "New to dev SignUp Now"
                  : "Already registered Sign In Now"}
              </p>
              <button
                className="btn bg-slate-800"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "SignUp"}
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Login;
