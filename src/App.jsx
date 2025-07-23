import { BrowserRouter, Route, Routes } from "react-router-dom"; //install
import Body from "./components/Body";
import Profile from "./components/Profile";
import Login from "./components/Login";
import {Provider} from  "react-redux"
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

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
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
