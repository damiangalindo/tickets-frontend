import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BackToIndex extends Component {
  render() {
    return(
      <div>
        <Link to='/tickets'>Back to index</Link>
      </div>
    )
  }
}

export default BackToIndex;
