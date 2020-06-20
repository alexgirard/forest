import React from 'react';
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const LargeLogo = require('../../assets/images/large_logo.png');

const StyledButton = styled.button`
  unset: all;
  padding: 0.5rem 1rem;
  background-color: rgba(14, 103, 23, 0.2);
  border: none;
  color: rgba(14, 103, 23, 0.5);
  border-radius: 40px;

  :focus {
    outline: none;
  }
`;

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
      <div className="d-flex justify-content-center align-content-center h-100 flex-column m-auto">
        <div className="m-auto">
          <img className="w-auto pb-3" src={LargeLogo} />
          <Form onSubmit={this.handleSubmit} c>
            <Form.Group>
              <Form.Control type="text" value={this.state.badge} onChange={this.handleBadgeChange} placeholder='Badge Number' />
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" value={this.state.room} onChange={this.handleRoomChange} placeholder='Room Id' />
            </Form.Group>
            <StyledButton className="py-2 my-0 mx-auto d-block" type="submit">Submit</StyledButton>
          </Form>
        </div>
      </div>
    );
  }
}

export default Entry;