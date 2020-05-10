import React,{useEffect, useState} from 'react';
import {Link,useHistory,withRouter} from 'react-router-dom';
import Loading from "./Loading";
const Single = (props) => {
    const [data,setData] = useState([])
    const [val,setVal] = useState(false);
    const [loading,setLoading]=useState(true);
    const history = useHistory();
   
    
    const { match } = props;

    let {id} = match.params;
    
    useEffect(()=>{
        fetch(`http://localhost:5000/story/${id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
           
            setData(result.posts)
         
        })
     },[data])
     const makeComment = (text,postId)=>{
        fetch('http://localhost:5000/comment',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
              }
           })
          setData(newData)
       
          window.location.reload();
        }).catch(err=>{
            console.log(err)
        })
  }
  
  if (data.length > 0){
       setLoading(false)
   }
   if(loading && data.length < 1 ){
       return <Loading />
   }
  

    return (
        <div >
        
            <div  className="card mycard_single">
             {
                 data.postedBy ? 
                 <>
                 <img src={data.postedBy.pic} alt={data.title} className="image"/>
            
                 <span> {data.postedBy.name} </span>
                 </>
                 : ""   
             }  
          
         
       
                <p className="title">{data.title}</p>
                {
               data.photo ? 
               <img src={data.photo} style={{height:"400px"}} alt={data.title} className="image2"/>
               : " "
                }
                <p className="body">{data.body}</p>
            </div>
        

            <div className="form">
            <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,data._id)
                                }}>
                                  <input type="text" className="comment" placeholder="Write a comment here" />  
                                 
            </form>
            </div>
            <h5 style={{marginLeft:"45%"}}><b>Reviews : </b> {data.comments ? data.comments.length : 0} </h5>
            <br/>                        
            <div className="commentList">
                {data.comments && data.comments.reverse().map(item => (
                    <p key={item._id}> <b> {item.postedBy.name}</b> {item.text}</p>
                ))}
            </div> 
        </div>
    );
};

export default withRouter(Single);