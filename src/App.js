import React from 'react';

import './App.css'; // importing css file

import {
  EmployeeList,
  EmptyList, 
} from './components/List'; // importing required components

const config = require('./config.json');

class App extends React.Component{

  constructor(props){
    super(props); // To execute constructor of Component Class
    // Some declarations in constructor

    this.state = {
      employee: [],
      isLoaded: false,
      isNetworkBroken: false,
      networkBrokenMessage: "",
    }

    // binding `this` keyword to the functions so that it could
    // be accessible to individual class instance of `App`
    this.fetchData = this.fetchData.bind(this); 
    this.refresh = this.refresh.bind(this);
  }

  refresh(){
    this.setState({
      isNetworkBroken: false,
      networkBrokenMessage: '',
    })
  }

  fetchData(){
    fetch(config.read) // sending req to api, returns response
    .then((response)=>response.json()) // returns json data of response
    .then((json)=>{
      this.setState({
        isLoaded: true,
        employee: json,
      }); // updating the state of component
    })
    .catch((err)=>{
      console.log(err);
      this.setState({
        isNetworkBroken: true,
        networkBrokenMessage: err,
      }); // on some network error updating component accordingly.
    });
  }

  componentDidMount(){ 
    // a callback function called when
    // component is loaded in html via reactdom

    this.fetchData(); // fetching employee list from api
  }

  componentDidUpdate(_, prevState){
    // a callback function called when
    // state or props are changed

    if(prevState.isNetworkBroken === true && 
    this.state.isNetworkBroken === false){
      this.fetchData();
    }
  }

  render(){
    return (
      <div className="App">
        {this.state.isLoaded?
          <EmployeeList emplist={this.state.employee} />:
          <EmptyList />  
        }
      </div>
    );
  }
}

export default App;
