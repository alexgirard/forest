import React, { useState } from 'react';
import styled from 'styled-components';

const Dot = styled.span`color: rgba(14, 103, 23, 0.5);`;
const Logo = () => <h1>forest<Dot>.</Dot></h1>


class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {badge: '', room: ''};

    this.handleBadgeChange = this.handleBadgeChange.bind(this);
    this.handleRoomChange = this.handleRoomChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleBadgeChange(event) {
    this.setState({badge: event.target.value});
  }

  handleRoomChange(event) {
    this.setState({room: event.target.value});
  }

  handleSubmit(event) {
    console.log('submitting');
    var token = document.getElementsByName('csrf-token')[0].content
    var body = JSON.stringify({
      entry: {
        badge: this.state.badge,
        room_id: this.state.room,
      }
    });
    fetch('http://localhost:3000/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': token
      },
      credentials: 'same-origin',
      body: body,
    });
  }

  render(){
    return (
      <div class='d-flex justify-content-center align-content-center w-50 h-100 flex-column' style={{margin: 'auto'}}>
        <Logo />
        <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.badge} onChange={this.handleBadgeChange} placeholder='badge number'/>
          <input type="text" value={this.state.room} onChange={this.handleRoomChange} placeholder='room id' />
          <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default Entry;