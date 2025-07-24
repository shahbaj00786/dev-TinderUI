import { BrowserRouter, Route, Routes } from "react-router-dom"; //install
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import {Provider} from  "react-redux"
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
        {/* all routing will work base on "/" path */}
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user/connections" element={<Connections/>}/>
              <Route path="/user/request/pending" element={<Requests/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
