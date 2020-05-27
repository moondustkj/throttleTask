import React from 'react';
import classes from './Modal.module.scss';
import CalendarEvnt from '../CalendarEvnt/CalendarEvnt';
import calendarImg from '../../misc/images/calendar.png';

let updatedEvents=[];
let colors=[];
export default class Modal extends React.Component {
	state={
		events:[],
		showCal:false
	}
	componentDidMount(){
		this.setState({
			showCal: false 
		});
	}
	getDate(dates){
		if(updatedEvents.length > 0)
			updatedEvents= [];
		else{
			dates.map((actv,index) =>{
			let arrS= actv.start_time.split(' ');
			let arrE= actv.end_time.split(' ');
			let monthS= this.getMonth(arrS[0]);
			let monthE= this.getMonth(arrE[0]);
			let [timeHS,timeMS]= this.getTime(arrS[3]);
			let [timeHE,timeME]= this.getTime(arrE[3]);
			let dateS= new Date(arrS[2],monthS,arrS[1],timeHS,timeMS);
			let dateE= new Date(arrE[2],monthE,arrE[1],timeHE,timeME);
			const eventTitle = this.props.user.real_name +' '+'Events'; 
			const event= {
		          id: index,
		          start: dateS,
		          title:eventTitle,
		          end: dateE
		      }
		    updatedEvents.push(event);
		    let color= '#'+Math.random().toString(16).substr(2,6);
		    colors.push(color);
		    console.log(updatedEvents)
			});
		}

	}
	getTime(t){
		let time= t.split(':');
		let hour= time[0];
		let exp= /PM|AM/gi;
		let min= time[1].replace(exp,"");
		return [hour,min]
	}
	getMonth(m){
		let month=''
		switch(m){
			case 'Jan':
					month= 0;
					break;
				case 'Feb':
					month= 1;
					break;
				case 'Mar':
					month= 2;
					break;
				case 'Apr':
					month= 3;
					break;
				case 'May':
					month= 4;
					break;
				case 'Jun':
					month= 5;
					break;
				case 'Jul':
					month= 6;
					break;
				case 'Aug':
					month= 7;
					break;
				case 'Sept':
					month= 8;
					break;
				case 'Oct':
					month= 9;
					break;
				case 'Nov':
					month= 10;
					break;
				case 'Dec':
					month= 11;
					break;
				default:
					break;
		}
		return month;
	}
	toggleCalendar(){
		this.getDate(this.props.user.activity_periods);
		this.setState({
			showCal: !this.state.showCal 
		});
	}
	emptyUsers(){
		updatedEvents=[];
	}
	render() {
		let activites=[];
		let activity;
		activites= this.props.user.activity_periods;
		if(activites !== undefined){
			
			activity= ( activites.map((item,index) =>(
				<div key={index} className={classes.activities}>
					<li>{item.start_time} to {item.end_time}</li>
				</div>
				))
			); 
		}
		else
			return null;
		return (
			<div hidden={this.props.hide} className={`col-md-10 ${classes.Modal}`}>
				<div className={classes.Info}>
					<div onClick={()=> this.props.toggleModal()} className={classes.cross}>X</div>
					<div className={classes.header}>
						<h3>{this.props.user.real_name}</h3>
						<img src={calendarImg} alt="" 
						width="50" onClick={()=>this.toggleCalendar()}/>
					</div>

					{ !this.state.showCal ?
						<ul>
							{activity}
						</ul> :
						<div className="col-md-12">
							<CalendarEvnt events= {updatedEvents} colors={colors}/>
						</div>
					}
				</div>
				
			</div>
		);
	}
}
