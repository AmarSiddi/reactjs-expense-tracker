import React, { Component } from 'react';

export default class Login extends Component {

    constructor(props){
        super(props);
        let loggedIn = false;

        this.state = {
            uesername ='',
            password = '',
            loggedIn
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const{useername, password} = this.state;
    }

    


    state = {  }
    render() {
        return (    
          <div>
            <h1>Hello</h1>
          </div>
    
        );
      }
}
 
export default Login;