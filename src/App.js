import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img width="75" src={props.avatar_url} alt="Foto Perfil USuario"/>
    	<div style={{display:'inline-block', marginLeft:10}}>
    		<div style={{fontSize:'1.25em', fontWeight:'bold'}}>{props.name}</div>
      	<div>{props.company}</div>
    	</div>
    </div>
  );
};

const CardList = (props) => {
	return (
  	<div>
  	  {props.cards.map(card => <Card key ={card.id} {...card}/>)}
  	</div>
  );
}

class Form extends Component{
	state = {userName: ''}
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then(resp => {
      	this.props.onSubmit(resp.data);
        this.setState({userName: ''});
      });
  };
	render(){
  return(
  	<form className="container" onSubmit={this.handleSubmit}>
      <div className="input-group mb-2">
    	  <input className="form-control" type="text" value ={this.state.userName} onChange={(event) => this.setState({userName: event.target.value})} placeholder="Nombre Usuario GitHub" required />
        <div class="input-group-append">
          <button className="btn btn-primary" type="submit"> Añadir Usuario</button>
        </div>
      </div>
    </form>
  );
  }
}

class App extends React.Component{
	state = {
  	cards : []
  };
  
  addNewCard = (cardInfo) => {
  	this.setState(prevState => ({
    cards: prevState.cards.concat(cardInfo)
    }));
  };
  
	render(){
  	return(
    	<div>
      	<Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}

export default App;
