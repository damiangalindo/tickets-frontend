import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TicketsReport extends Component {

  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    console.log(event.target.name);
  }

  render(){
    return(
      <div>
        <h2>Tickets Report</h2>
        <p>
          <a onClick={ this.handleClick } name='export'>Export as PDF</a>
        </p>
        <ul className='list-group'>
          <li className='list-group-item'>
            tickets_id
            tickets_subject
            date
            <span className="label label-danger">closed</span>
          </li>
        </ul>
      </div>
    )
  }

}


export default TicketsReport;
