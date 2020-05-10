import React,{useContext} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'


const NavBar = ()=>{
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
  
     const renderList = ()=>{
       if(state){
           return [
            <li key="1"><Link to="/profile"style={{fontSize:"20px",fontWeight:"600"}}>Profile</Link></li>,
          
            <li key="22"><Link to="/createStory" style={{fontSize:"20px",fontWeight:"600"}}>CreateStory</Link></li>,
            <li key="3">
             <button className="btn "
             style={{fontSize:"20px",fontWeight:"600",color:"white",backgroundColor:"grey"}}
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/signin')
            }}
            >
                Logout
            </button>
            </li>
         
            
           ]
       }else{
         return [
          <li key="4"><Link to="/signin" style={{fontSize:"20px",fontWeight:"600"}}>Signin</Link></li>,
          <li key="5"><Link to="/signup" style={{fontSize:"20px",fontWeight:"600"}}>Signup</Link></li>
         ]
       }
     }
    return(
        <nav>
        <div className="nav-wrapper green">
         
    
          <Link to={state?"/":"/signin"} className="brand-logo left" style={{fontFamily:"Rokkitt",marginLeft:"20px"}}>StoryBook</Link>
          <ul id="nav-mobile" className="right">
             {renderList()}
  
          </ul>
        </div>
      </nav>
    )
}


export default NavBar