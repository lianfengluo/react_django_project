import React from 'react';
const MyText = (props) =>{
	return <span>{props.Text}<br/></span>
}
const ErrorItem = (props) => {
	let strings = props.error.split("\n");
	return(
	<span>
		<p style={{color:'red'}} key={props.key}>
		{strings.map((info)=>{return (<MyText Text={info}/>)})}
		</p>
	</span>
	)
}
	// <span dangerouslySetInnerHTML={{__html: 
	// "<p style='color:red' key="+props.key+">"+props.error+"</p><br/>"}} />
// (
// 	<span dangerouslySetInnerHTML={{__html: 
// 	"<p style='color:red' key="+props.key+">"+props.error+"</p><br/>"}} />
// )
ErrorItem.propTypes = {
  error: React.PropTypes.string.isRequired,
}
export default ErrorItem;