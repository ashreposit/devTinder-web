import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import Feed from "./Feed";
import { store } from '../utils/appStore'
import { Provider } from 'react-redux'
import Connections from "./connections";
import Request from "./request";

function App() {

  return (
    <>
    <Provider store={store}>
    <Router basename="/">
      <Routes>
        {/* parent component route for login */}
        <Route path="/" element={<Login/>} />
        {/* Parent component route for body */}
        <Route path="/app" element={<Body/>}> 
          {/* child components */}
          <Route path="feed" element={<Feed/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="connections" element={<Connections/>} />
          <Route path="requests" element={<Request/>} />
        </Route>
      </Routes>
    </Router>
    </Provider>
    </>
  )
}

export default App
