import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import jsPdf from 'jspdf';
import moment from 'moment';
import { BASE_URL } from '../actions';
import BackToIndex from './back_to_index';

class TicketsReport extends Component {

  constructor(props){
    super(props);

    this.state = {
      tickets: [],
      auth_token: localStorage.getItem('auth_token')
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    axios.get(
      `${ BASE_URL }/tickets/closed`,
      {
        headers: {
          'Authorization': this.state.auth_token
        }
      }
    ).then((response) => {
      console.log(response.data)
      this.setState({ tickets: response.data.tickets })
    })
  }

  handleClick(event) {
    event.preventDefault();
    var doc = new jsPdf();

    const { tickets } = this.state;

    doc.text('Subject', 10, 10);
    doc.text('Created', 70, 10);
    doc.text('Closed', 130, 10);

    var y = 20;
    var page = 1;
    var number_of_items = 1;
    doc.setPage(page);

    _.forEach(tickets, ticket => {
      const created_at = moment(ticket.created_at).format('L HH:mm')
      const updated_at = moment(ticket.updated_at).format('L HH:mm')

      doc.text(ticket.subject, 10, y);
      doc.text(created_at, 70, y);
      doc.text(updated_at, 130, y);

      y+=10;

      if(number_of_items === 10){
        page+=1;
        doc.addPage();
        doc.setPage(page);
        doc.text('Subject', 10, 10);
        doc.text('Created', 70, 10);
        doc.text('Closed', 130, 10);

        number_of_items = 0;
        y = 20;
      }

      number_of_items+=1
    })

    doc.save('report.pdf')
  }

  renderTickets() {
    const { tickets } = this.state;

    return _.map(tickets, ticket =>{
      return(
        <tr key={ ticket.id }>
          <td><Link to={ `/tickets/respond/${ ticket.id }` }>{ ticket.subject }</Link></td>
          <td>{ moment(ticket.created_at).format('L HH:mm') }</td>
          <td>{ moment(ticket.updated_at).format('L HH:mm') }</td>
          <td><span className="label label-danger">{ ticket.state }</span></td>
        </tr>
      )
    })

  }

  render(){
    return(
      <div>
        <h2>Tickets Report</h2>
        <ul className='list-inline'>
          <li><a onClick={ this.handleClick } name='export'>Export as PDF</a></li>
          <li><BackToIndex /></li>
        </ul>
        <table className='table'>
          <thead>
            <th>Subject</th>
            <th>Created</th>
            <th>Closed</th>
            <th></th>
          </thead>
          <tbody>
            { this.renderTickets() }
          </tbody>
        </table>
      </div>
    )
  }

}


export default TicketsReport;
