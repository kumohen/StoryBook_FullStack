import React,{useState,useContext} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../App'

const AddDetail = ()=>{
 
    const [school,setSchool] = useState("")
    const [college,setCollege] = useState("")
    const [experience,setExperience] = useState("")
    const[hobbies,setHobbies] = useState("")
    const [about,setAbout] = useState("")
    const history = useHistory()
  
    const PostData = ()=>{
       
        fetch("http://localhost:5000/createDetail",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
              school,college,experience,hobbies,about
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
           
               M.toast({html:" Added Your Profile Detail",classes:"#43a047 green darken-1"})
               history.push('/profile')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
 

   return(
       <div className="card input-filed"
       style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}
       >
           <input 
           type="text"
            placeholder="School Name"
            value={school}
            onChange={(e)=>setSchool(e.target.value)}
            />
           <input
            type="text"
             placeholder="College"
             value={college}
            onChange={(e)=>setCollege(e.target.value)}
             />
           
           <input 
           type="text"
            placeholder="Hobby"
            value={hobbies}
            onChange={(e)=>setHobbies(e.target.value)}
            />
           <input
            type="text"
             placeholder="Experience"
             value={experience}
            onChange={(e)=>setExperience(e.target.value)}
             />
               <input 
           type="text"
            placeholder="about"
            value={about}
            onChange={(e)=>setAbout(e.target.value)}
            />
         
         <button className="btn  "
            style={{marginLeft:"10px",height:"40px",width:"80px",backgroundColor:'grey'}}
            onClick={()=>PostData()}
            >
                Submit
            </button>
       </div>
   )
}


export default AddDetail;