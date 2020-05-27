import React from 'react';
import classes from './App.module.scss';
import List from './components/List/List'; 

export default class App extends React.Component {

	render() {

		return (
			<div className={classes.App}>
				<List/>
			</div>
		);
	}
}



