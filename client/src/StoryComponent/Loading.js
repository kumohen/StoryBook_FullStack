import React from 'react';
import ReactLoading from 'react-loading';
 
const Loading = ({ type, color }) => (
    <div style={{marginLeft:"45%",marginTop:"10%"}}>
        <ReactLoading type={"spin"} color={"red"} height={100}  width={100}  />
    </div>
    
);
 
export default Loading;