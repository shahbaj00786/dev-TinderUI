import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    const res = await axios(BASE_URL + "/user/connections", {
      withCredentials: true,
    });

    dispatch(addConnection(res?.data?.data));
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No connections found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="justify-between m-4 p-4 bg-slate-950 rounded-lg  w-[600px] flex mx-auto"
          >
            <div className="flex">
              <div>
                <img
                  className="w-20 h-20 rounded-full"
                  src={photoUrl}
                  alt="phto"
                />
              </div>
              <div className="text-left ">
                <h2 className="font-bold">{firstName + " " + lastName}</h2>
                <p>{about}</p>
                {age && gender && <p>{age + " " + gender}</p>}
              </div>
            </div>
            <div className="my-auto">
              <Link to={"/chat/" + _id}>
                <button className="btn btn-active btn-warning">Chat</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
