import NavBar from "./NavBar"
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";


function App() {

  return (
    <>
    <Router basename="/">
      <Routes>
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/login" element={<div>login page</div>} />
        <Route path="/about" element={<div>About page</div>} />
        <Route path="/logout" element={<div>logOut page</div>} />
      </Routes>
    </Router>
    <NavBar />
     <h1 className="text-3xl font-bold underline">
      Hello world!
     </h1>
    </>
  )
}

export default App
