import React,{useEffect,useState} from 'react';
import {Link, useHistory,withRouter} from 'react-router-dom'

const UserProfile = (props) => {
    
    const [data,setData] = useState([])
    const [user,setUser]=useState({});
    const [detail,setDetail]=useState([]);
    const history = useHistory();
    
    const { match } = props;

    let {id} = match.params;
 
    useEffect(()=>{
       fetch(`http://localhost:5000/user/${id}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
         
            setData(result.posts)
            setUser(result.user);
       })
       fetch(`http://localhost:5000/detail/${id}`,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
      setDetail(result.posts)
       
    })
    },[])

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

      
    const fetchItem = data &&  data.map(item => (
        
      
        <div  className="card mycard" key={item._id} style={{width:"32%",float:"left",margin:"2px",height:"200px"}} >
         
               
    
            
            <p className="title">
                
            {item.title}</p>
          
            <p className="body">{item.body.substring(0,120)}</p>
            <hr/>
             <i className="material-icons">favorite</i> 
             <span className="like">{item.likes.length } like </span>
 
            <Link to={`/story/${item._id}`} key={item._id}>
            <i className="material-icons">comment</i>  {item.comments.length } comment
            </Link>
        </div>
      
    ))

    return (
        <div  >
            <div className="card container" style={{width:"40%",margin:"auto"}}>
        
                {    user !== null ?
                <div className="row">
                    <div className="col s4">
                    <img src={user.pic} style={{height:"60%",width:"100%",borderRadius:"50%",float:"left"}} />
                    </div>
                    <div className="col s4">
                        {fetchDetail}
                    </div>
                    <div className="col s4">
                        <p><b>Name : </b>{user.name}</p>
                        <p><b>Branch : </b>{user.branch}</p>
                        <p><b>Mobile.No : </b>{user.mobile}</p>
                        <p><b>City : </b>{user.city}</p>
                    </div>
                </div> : "  "
               }
             
                  
            </div>
            <div>
                {fetchItem}
            </div>   
          
        </div>
    );
};

export default withRouter(UserProfile);