import React from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

export default class CalendarEvnt extends React.Component {

  render() {
    return (
        <div style={{ height: '500pt'}}>
          <Calendar
            events={this.props.events}
            startAccessor="start"
            endAccessor="end"
            hexColor= {this.props.colors}
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
        </div>
    );
  }
}
