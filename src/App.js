import React from 'react';

import Calendar from './components/Calendar'


export default class App extends React.Component {

  state = {
    date: null
  };

  handleDateChange = date => this.setState({ date });

  render() {
    const { date } = this.state;

    return (
      <div>
        {date && <p>Ziua de nastere: {date.toLocaleDateString()}</p>}

        <Calendar onChange={this.handleDateChange} />
      </div>
    )
  }
}

