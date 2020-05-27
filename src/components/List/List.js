import React from 'react';
import classes from './List.module.scss';
import * as data from '../../misc/data.json';
import user from '../../misc/images/athlete.png';
import Modal from '../Modal/Modal';

export default class List extends React.Component {
	state={
		users:[],
		showModal:false,
		userSelected:[]
	}
	componentDidMount(){
		console.log(data.members)
		this.setState({
			users: data.members 
		});
	}
	navigateHandler(item){
		console.log(item);
		this.setState({
			showModal: true,
			userSelected: item
		});
	}
	toggleHandler(){
		this.setState({
			showModal: false,
			userSelected:[]
		});
	}
	render() {
		const users= this.state.users.map( (item,index) => (
			<div key={item.id} className={classes.userdiv}
				onClick={()=>this.navigateHandler(item)}>
				<li className={classes.name}>{item.real_name}</li>
				<li>{item.tz}</li>
				<img src={user} alt="" className={classes.userimg}/>
			</div>
		));
		return (
			<div className="row">
				<ul className={`col-md-6 d-block ${classes.top}`}>
					{users}
				</ul>
				<Modal hide= {!this.state.showModal} user= {this.state.userSelected}
					toggleModal= {()=> this.toggleHandler()}/>
					<div className={`col-md-12 ${classes.Backdrop}`}
						hidden={!this.state.showModal}></div>
			</div>
		);
	}
}
