import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import './Helper.min.css';
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import MappingDashboard from './components/mapping/MappingDashboard';
import EndpointDashboard from './components/endpoints/EndpointDashboard';
import CalendarsDashboard from './components/calendars/CalendarsDashboard';
import CalendarInfo from './components/calendars/CalendarInfo';
import CalendarInfo2 from './components/calendars/CalendarInfo2';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<div>
					<Header />
					<div className='d-flex'>
						<Navbar />
						<div className='inner-container p-5'>
							<Switch>
								<Route exact path='/' component={Dashboard} />
								<Route exact path='/mapping' component={MappingDashboard} />
								<Route exact path='/endpoints' component={EndpointDashboard} />
								<Route exact path='/calendars' component={CalendarsDashboard} />
								<Route exact path='/calendars/:calendarId' component={CalendarInfo} />
								<Route exact path='/calendars/2/:calendarId' component={CalendarInfo2} />
							</Switch>
						</div>
					</div>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
