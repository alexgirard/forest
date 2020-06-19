import React from 'react';


const Login = ({ changePage }) => <p>Login</p>;
const Signup = ({ changePage }) => <p>Signup</p>;
const Edit = ({ changePage }) => <p>Edit</p>;


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 'login' };
  };

 changePage = newPage => this.setState({ page: newPage });

 render() {
   const { page } = this.state;

    switch(page) {
      case 'login':
        return <Login changePage={this.changePage}/>
      case 'signup':
        return <Signup changePage={this.changePage}/>
      case 'edit':
        return <Edit changePage={this.changePage}/>
      default:
        return <p>defualt</p>
    }
  }
}

export default Home;