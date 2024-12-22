import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Body from "./body";
import Login from "./Login";
import Profile from "./Profile";


function App() {

  return (
    <>
    <Router basename="/">
      <Routes>
        {/* parent component */}
        <Route path="/" element={<Body/>}> 
          {/* child components */}
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
