import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import Posts from "./Posts";
import M from 'materialize-css'
const SignIn  = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
      <div className="mycard" style={{width:"60%",marginLeft:"10%",marginTop:"10%"}}>
          <p><b style={{marginLeft:"5%",fontSize:"24px"}}> Plz signin Your Account </b></p> 
          <div className="row">
          <div className="col-12">   
          < div className="clo-6" style={{float:"left"}}>
             <i className="large material-icons " style={{color:"Orange",marginLeft:"100px"}}>warning</i> 

           </div>
          <div className="col-6" style={{float:"right",width:"45%"}}>   
          <div className="card  input-field">
            <h4 style={{marginLeft:"30%",fontFamily:"Josefin Sans"}}>SignIn</h4>
         
            
            <div>
            <input
            type="text"
            placeholder="email"
            value={email}
            style={{border:"2px solid grey",width:"88%",marginLeft:"20px"}}
            onChange={(e)=>setEmail(e.target.value)}
            />
            </div>
            <div>
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            style={{border:"2px solid grey",width:"88%",marginLeft:"20px"}}
            />
            </div>
      
            <button className="btn  "
            style={{marginLeft:"38%",height:"40px",width:"80px",backgroundColor:'grey'}}
            onClick={()=>PostData()}
            >
                Login
            </button>
            <p style={{fontFamily:"Raleway",marginLeft:"80px",fontSize:"17px"}}>
                <Link to="/signup" style={{color:"grey",fontWeight:"600"}}>You Don't have an account ?</Link>
            </p>
    
        </div>
        </div>
      
      </div>
      </div>
      </div>
   )
}


export default SignIn