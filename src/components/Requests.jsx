import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import axios from "axios";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/request/pending", {
      withCredentials: true,
    });
    dispatch(addRequest(res.data.data));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) return <h1> No Requests found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Request</h1>
      {requests.map((req) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          req.fromUserId;

        return (
          <div
            key={_id}
            className="m-4 p-4 bg-slate-950 rounded-lg  w-[600px] flex mx-auto "
          >
            <div>
              <img
                className="w-20 h-20 rounded-full"
                src={photoUrl}
                alt="phto"
              />
            </div>
            <div className="text-left m-auto">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              <p>{about}</p>
              {age && gender && <p>{age + " " + gender}</p>}
            </div>
            <div className="m-auto">
              <button className="btn btn-warning mx-4">Accept</button>
              <button className="btn btn-error">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
