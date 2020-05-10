import React from 'react';
import {Link} from "react-router-dom";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{backgroundColor:"grey",width:"55%",margin:"auto",height:"40px",paddingBottom:"58px"}}>
      <ul >
        {pageNumbers.map(number => (
          <li key={number} >
            <Link onClick={() => paginate(number)} to="/" >
              <span style={{border:"1px solid white",fontSize:"20px",textAlign:"center",outline:"none"}}>{number}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;