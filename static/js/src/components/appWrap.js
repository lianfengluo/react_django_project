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
      <div className='footer'><Icon type="copyright" />Power By luolianfeng&nbsp;&nbsp;&nbsp;<Icon type="mail" />E-mail:1014646056@qq.com</div>
  </div>
)

export default App;