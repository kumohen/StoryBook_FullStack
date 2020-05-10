import React,{useEffect,useState} from 'react';
import { useHistory} from 'react-router-dom'
import {Link} from "react-router-dom";
const Profile = () => {
    const history = useHistory();
    const [data,setData] = useState([])
    const [detail,setDetail]=useState([])

    useEffect(()=>{
       fetch('http://localhost:5000/myStory',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
            console.log(result)
           setData(result.mypost)
       })
       fetch('http://localhost:5000/myDetail',{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        
         setDetail(result.mypost)
    })
    },[])
    const deletePost = (postid)=>{
        fetch(`http://localhost:5000/deleteStory/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

    const userInfor =JSON.parse(localStorage.getItem("user"));
  
      
    const fetchItem = data &&  data.map(item => (
      
        <div  className="card mycard" key={item._id} style={{width:"32%",float:"left",margin:"2px ",height:"200px"}} >
         
               
    
            
            <p className="title">{item.title}
            <i className="material-icons" style={{float:"right",color:"red"}} onClick={()=>{deletePost(item._id)}}>delete</i> 
            </p>
          
            <p className="body">{item.body.substring(0,100)}</p>
            <hr/>
             <i className="material-icons">favorite</i> 
             <span className="like">{item.likes.length } like </span>
 
            <Link to={`/story/${item._id}`} key={item._id}>
            <i className="material-icons">comment</i>  {item.comments.length } comment
            </Link>
            
        </div>
      
    ))
    const fetchDetail = detail &&  detail.map(item => (
      
        <div  key={item.school}>
           <p><b>School</b> <hr  style={{}} />
           {item.school}</p>

           <p>  <b>College</b> <hr/> {item.college} </p>  
           <p>  <b >Experience</b><hr/> {item.experience}</p>
           <p><b>hobbies</b> <hr/>{item.hobbies}</p>  
           <p><b>About</b> {item.about}</p>
        </div>
      
    ))
   
    return (
        <div  >
           
        
            <div className="card container" style={{width:"60%",margin:"auto",marginTop:"20px",marginBottom:"20px"}}>
             
                {    userInfor !== null ?
                <div className="row">
                    <div className="col s4">
                    <img src={userInfor.pic} style={{height:"300px",width:"100%",borderRadius:"50%",float:"left"}} />
                    </div>
                    <div className="col s4">{fetchDetail}</div>
                    <div className="col s4">
                        <p><b>Name : </b>{userInfor.name}</p>
                        <p><b>Branch : </b>{userInfor.branch}</p>
                        <p><b>Mobile.No : </b>{userInfor.mobile}</p>
                        <p><b>City : </b>{userInfor.city}</p>
                        <p> <b> My Posts</b> :{data && data.length}  </p>
                    </div>
                </div> : "  "
               }
                 {
                   detail && detail.length === 0 ? 
                  <Link to="/addDetail" className="waves-effect waves-light btn" style={{margin:"10px"}}>Add Detail</Link>: "" 
               }
            </div>
            <div>
                {fetchItem}
            </div>   
        </div>
    );
};

export default Profile;