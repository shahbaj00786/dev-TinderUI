import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {removeFeed } from "../utils/feedSlice"

const UserCard = ({ user }) => {
  const {_id, firstName, lastName, about, photoUrl, skills, gender } = user;
  const dispatch=useDispatch()

  const handleSendRequest = async (status, userId) => {
    const res = await axios.post(
      BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );
    dispatch(removeFeed(userId))
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm ">
      <figure>
        <img src={photoUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>{skills}</p>
        <p> {about} </p>
        {gender && <p>{gender}</p>}
        <div className="card-actions  justify-center">
          <button className="btn btn-primary"
          onClick={()=> handleSendRequest("ignored", _id)}
          >Ignore</button>
          <button className="btn btn-secondary"
          onClick={()=> handleSendRequest("intrested", _id)}
          >Intrested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
