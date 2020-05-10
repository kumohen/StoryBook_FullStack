import React,{useEffect,createContext,useReducer,useContext} from 'react';
import NavBar from './components/Navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
//import Home from './components/screens/Home'
import Home from "./StoryComponent/Home";
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost';
import Single from "./StoryComponent/Single";
import {reducer,initialState} from './reducers/userReducer'
import CreateStory from "./StoryComponent/CreateStory";
import UserProfile from "./components/screens/UserProfile";
import Adddetail from "./StoryComponent/Adddetail";

export const UserContext = createContext()


const Routing = ()=>{
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      history.push('/signin')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/" >
      <Home />
      </Route>
      <Route path="/signin">
        <Signin />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route  path="/profile/:id">
        <UserProfile />
      </Route>
      <Route path="/create">
        <CreatePost/>
      </Route>
      <Route path="/story/:id">
        <Single/>
      </Route>
      <Route path="/createStory">
        <CreateStory/>
      </Route>
      <Route path="/addDetail">
        <Adddetail/>
      </Route>
    </Switch>
  )
}

function App() {

  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <NavBar  />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;