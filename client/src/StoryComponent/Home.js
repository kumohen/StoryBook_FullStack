import React,{useState,useEffect,useContext} from 'react'
import * as moment from 'moment'
import {UserContext} from '../App'
import {Link} from 'react-router-dom'
import Pagination from "./Pagination";
import Loading from "./Loading";

const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const[loading,setLoading]=useState(true);
    const [currentPage, setCurrentPage] = useState(1);

   const [postsPerPage] = useState(3);

    useEffect(()=>{
       fetch('http://localhost:5000/allStory',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
            console.log(result)
           setData(result.posts)
       })
    },[])

    const likePost = (id)=>{
        fetch('http://localhost:5000/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
                 //   console.log(result)
          const newData = data.map(item=>{
              if(item._id==result._id){
                  console.log(result)
                  return result
              }else{
                  return item
              }
          })
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
  }

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

if(loading && data.length < 1){
    return <Loading  />
}

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

const paginate = pageNumber => setCurrentPage(pageNumber);
    
   const fetchItem = currentPosts.map(item => (
     
       <div  className="card mycard" key={item._id} >
        
                <img src={item.postedBy.pic} alt={""} className="image"/>
            
              <span style={{fontFamily:"Permanent Marker"}}> <Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }> @{item.postedBy.name} </Link> </span>
   
              in {moment(data.date).format('MMM Do YY')}
               <i className="material-icons" style={{float:"right"}} onClick={()=>{deletePost(item._id)}}>delete</i> 
           
           <p className="title" style={{fontFamily:"Noto Sans HK"}}>{item.title}</p>
           {
               item.photo ? 
               <img src={item.photo} style={{width:"100%",height:"350px",}} alt={item.title} className="image2"/>
               : " "
           }
           <p className="body">{item.body.length > 100 ? item.body.substring(0,70) + "see more......" : item.body }</p>
           <hr/>
           {
               item.likes.includes(state._id) ? 
               <i className="material-icons">favorite</i> 
              
               :
               <i className="material-icons"  onClick={()=>{likePost(item._id)}}>thumb_up</i> 
               
           }
            <span className="like">{item.likes.length } like </span>

           <Link to={`/story/${item._id}`} key={item._id}>
           <i className="material-icons">comment</i>  {item.comments.length } comment
           </Link>
       </div>
     
   ))
   
  
   return (
       <div className="home">
          {fetchItem}
          <br/>
         <Pagination
        postsPerPage={postsPerPage}
        totalPosts={data.length}
        paginate={paginate}
      />
       </div>
   )
}


export default Home