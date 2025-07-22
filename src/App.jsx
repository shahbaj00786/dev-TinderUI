import { BrowserRouter, Route, Routes } from "react-router-dom"; //install
import Body from "./Body";
import Profile from "./Profile";
import Login from "./Login";
import {Provider} from  "react-redux"
import appStore from "./utils/appStore";
import Feed from "./Feed";

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
