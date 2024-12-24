import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import Feed from "./Feed";
import { store } from '../utils/appStore'
import { Provider } from 'react-redux'

function App() {

  return (
    <>
    <Provider store={store}>
    <Router basename="/">
      <Routes>
        {/* parent component */}
        <Route path="/" element={<Body/>}> 
          {/* child components */}
          <Route path="/" element={<Feed/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
      </Routes>
    </Router>
    </Provider>
    </>
  )
}

export default App
