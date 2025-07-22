import { BrowserRouter, Route, Routes } from "react-router-dom"; //install
import Body from "./Body";
import Profile from "./Profile";
import Login from "./Login";

function App() {
  return (
    <>
      {/* all routing will work base on "/" path */}
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
