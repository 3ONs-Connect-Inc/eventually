import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home";
import Register from "./pages/auth/Register";
import SignIn from "./pages/auth/SignIn";
import CreateAccount from "./pages/auth/CreateAccount";
import Notification from "./components/Notification";
import Authenthecation from "./pages/auth/Authenthecation";


function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
  <Route path="/*" element={<HomePage/>} />
  <Route path="/account" element={<CreateAccount/>} />
  <Route path="/register" element={<Register/>} />
  <Route path="/sign-in" element={<SignIn/>} />
  <Route path="/2fa-user-authentication" element={<Authenthecation/>} />


  </Routes>
    </BrowserRouter>
      <Notification />
  </>
  )
}

export default App;
