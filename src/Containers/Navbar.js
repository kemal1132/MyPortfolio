import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';


import classes from './NavBar.css'

class NavBar extends Component{
	constructor(props) {
		super(props);
		this.state = { width: 0, height: 0 };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	  }
	  
	  componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	  }
	  
	  componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	  }
	  updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	  }
	render(){
		if(this.state.height>this.state.width)
			return <div className={classes.mobile} style={{height: this.state.height/10+"px"}}></div>;
		else
			return <div className={classes.desktop} style={{height: this.state.height/10+"px"}}></div>;
	}

}

export default NavBar;