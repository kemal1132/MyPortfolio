import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';


import classes from './NavBar.css'

class NavBar extends Component{
	constructor(props) {
		super(props);
		this.state = {
			width: 0,
			height: 0,
			isGoingUp:true,
			scrollTimeout:false,
			previousY:0,
			isShowingMenu:false,
		 };
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.updateScrollDirection = this.updateScrollDirection.bind(this);
	  }
		
	  componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);

		
		window.addEventListener('scroll', this.updateScrollDirection);
	  }
	  
	  componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
		window.removeEventListener('scroll', this.updateScrollDirection);
		}
		
		updateScrollDirection=()=>{
				let goingUp= false;
				if(!this.state.scrollTimeout){
					if(this.state.previousY>window.pageYOffset){
							goingUp=true;
						
					}else{
						goingUp=false;
					
				
					}
					this.setState({previousY:window.pageYOffset, scrollTimeout:true, isGoingUp:goingUp});
					setTimeout(()=>{this.setState({scrollTimeout:false})}, 100);
			}
		}
	  updateWindowDimensions=()=> {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
		}
		
		onClick =()=>{
			this.setState({isShowingMenu : !this.state.isShowingMenu});
		}
	render(){
		let classNames =[];
		let links=[];


		if(!this.state.isGoingUp){
			classNames.push(classes.hide);
		}else{
			classNames.shift();
		}

		let buttonAnimationTop = null;
		let buttonAnimationMiddle = null;
		let buttonAnimationBottom = null;
		if(this.state.isShowingMenu){
			buttonAnimationTop = ' ' + classes.topDiv_X_state;
			buttonAnimationMiddle = ' '+classes.middleDiv_X_state;
			buttonAnimationBottom = ' '+classes.bottomDiv_X_state;
		}else{
			buttonAnimationTop = null;
			buttonAnimationMiddle = null;
			buttonAnimationBottom = null;
		}

		let placeHolderClass = null;
		if(this.state.height>this.state.width-100){
			placeHolderClass= classes.mobilePlaceHolder;
			classNames.push(classes.mobile);
			links=[<div key="divKey" className={classes.enclosingDiv} onClick={this.onClick.bind(this)}>
								<div className={[classes.topDiv, buttonAnimationTop].join(' ')}></div>
								<div className={[classes.middleDiv, buttonAnimationMiddle].join(' ')}></div>
								<div className={[classes.bottomDiv, buttonAnimationBottom].join(' ')}></div>
						 </div>];
			if(this.state.isShowingMenu){
				links.push(<NavLink key="link1" to="/" exact className={classes.mobileLink} activeClassName={classes.mobileLink_active}>My Portfolio</NavLink>);
				links.push(<NavLink key="link2" to="/contact" exact className={classes.mobileLink} activeClassName={classes.mobileLink_active}>Contact Me</NavLink>);
				classNames.push(classes.mobileMenuActive);
			}
		}
		else{
			placeHolderClass= classes.desktopPlaceHolder;
			classNames.push(classes.desktop)
			links = [	<NavLink key="link1" to="/" exact activeClassName={classes.active}>My Portfolio</NavLink>,
			<NavLink key="link2" to="/contact" exact activeClassName={classes.active}>Contact Me</NavLink>];
		}
		

			return[<header key="header" className={classNames.join(" ")}>
				<nav>
					<h1>Kemal Altan Demirel</h1>
					{links}
				</nav>
			</header>,
			<div key={placeHolderClass} className={placeHolderClass} ></div>];
	}

}

export default NavBar;