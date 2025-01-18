# DevTinder

- run the application using npm run dev.

- created a Vite + React project

- install tailwind css for vite

- set up the tailwind.config.js according to the documentation

- install daisyUi component library for tailwind css(similar to angualr material)

- create a new react component file NavBar.jsx

- create the ract functionlity using keyword ---> rafec React Arrow Function Export Component.

- import and define this component inside the app component.

# Routing

- enables navigation between different components (or "pages") in a single-page application (SPA). React Router provides tools like BrowserRouter, Routes, and Route for defining and managing routes.

- install react router dom npm i react-router-dom

-  we will use BrowserRouter to wrap your application and define routes using Routes and Route.

    import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


# Body :
1. Navbar

2. Profile ==> /profile
3. login ==> /login
4. feed ==> /feed
5. connections ==> /connections

# Axios:

- install the axios library

- await axios.post("http://localhost:4500/auth/login",{emailId,password},{withCredentials:true});

- withCredentials is important for setting the cookies in browser. without that the cookies will not be set in the browser application.

# Redux:

- install the redux toolkit using npm install @reduxjs/toolkit react-redux

- create a slice - A slice is a collection of Redux logic for a specific feature of your application, including the state and reducers.

- create a store - Combine slices into a single store using configureStore. export the slice reducers and import it to the store and use that reducer.

- provide the store to your app -> Wrap your application with the Provider component from react-redux and pass the store to it.

- Use useSelector to read state and useDispatch to send actions.

# Summary of Steps:

Install Redux Toolkit and React-Redux.
Create slices using createSlice.
Set up the store using configureStore.
Provide the store to the app using Provider.
Access state and dispatch actions using useSelector and useDispatch.
Add middleware if needed.
Use createAsyncThunk for handling asynchronous logic.