import { useState } from "react";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

import { useDispatch } from "react-redux";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [skills, setSkills] = useState(user.skills);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    //console.log("clicked");
    setError("");

    const res = await axios.patch(
      BASE_URL + "/profile/update",
      { firstName, lastName, about, skills, photoUrl, about },
      {
        withCredentials: true,
      }
    );
    dispatch(addUser(res?.data?.data));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      <div className="flex justify-center ">
        <div className="flex justify-center  mx-10">
          <div className="card card-border bg-cyan-800 w-96">
            <div className="card-body">
              <p className="flex justify-center font-bold">Edit Profile</p>
              <fieldset className="fieldset">
                <legend className="fieldset-legend pb-2">FirstName</legend>
                <input
                  value={firstName}
                  type="text"
                  className="input"
                  placeholder="Type here "
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <legend className="fieldset-legend pb-2">lastName</legend>
                <input
                  value={lastName}
                  type="text"
                  className="input"
                  placeholder="Type here "
                  onChange={(e) => setLastName(e.target.value)}
                />

                <legend className="fieldset-legend pb-2">Skills</legend>
                <input
                  value={skills}
                  type="text"
                  className="input"
                  placeholder="Type here "
                  onChange={(e) => setSkills(e.target.value)}
                />

                <legend className="fieldset-legend pb-2">PhotoUrl</legend>
                <input
                  value={photoUrl}
                  type="text"
                  className="input"
                  placeholder="Type here "
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />

                <legend className="fieldset-legend pb-2">About</legend>
                <input
                  value={about}
                  type="text"
                  className="input"
                  placeholder="Type here "
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
              <div className="card-actions justify-center m-2">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard user={{ firstName, lastName, skills, photoUrl, about }} />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
