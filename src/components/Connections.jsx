import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

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
        const {_id,firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div key={_id} className="m-4 p-4 bg-slate-950 rounded-lg  w-1/3 flex mx-auto">
            <div>
              <img
                className="w-20 h-20 rounded-full"
                src={photoUrl}
                alt="phto"
              />
            </div>
            <div className="text-left mx-20">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              <p>{about}</p>
              {age && gender && <p>{age + " " + gender}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
