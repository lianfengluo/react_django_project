import React from 'react';

const NoMatchComponent = ({ location }) => (
  <div>
      <center>
        <p style={{fontSize:'50px',color:'red',marginTop:'100px'}}>
        No match for 
        <code>{location.pathname}</code>
        </p>
      </center>
  </div>
)
// const NoMatchComponent = (props) => (
//   <div>

//   		<center>
//   		<p style={{fontWeight:'bold',fontSize:'80px',color:'red',marginTop:'100px'}}>Invalid url</p>
//   		</center>
//   </div>
// )

export default NoMatchComponent;