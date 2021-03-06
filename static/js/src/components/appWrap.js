import React from 'react';
import NavBarContainer from '../containers/navBarContainer';
import { Icon } from 'antd';
const App = (props) => (
  <div>
    <div className='navTopStyle'>
  	<NavBarContainer/>
    </div>
    <div>
      {/*<h1>This is our app component</h1>*/}
      {props.children}
    </div>
    <div className='footer'>
      <Icon type="copyright" />Power By Richard Luo&nbsp;&nbsp;&nbsp;<Icon type="mail" />E-mail:lianfengluo28@gmail.com
    </div>
  </div>
)

export default App;
