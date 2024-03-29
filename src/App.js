import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

class App extends Component {
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'asfa2', name: 'Manu', age: 29 },
      { id: 'asfa3', name: 'Stephanie', age: 26 },
    ],
    otherState: 'some other value',
    showPersons: false
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex( p => {     //Restituira vero o falso
      return p.id === id;                                        //se id della persona è uguale
                                                                // a quella passata. se è vero 
                                                                //restituisce l'indice a personIndex
    })

    const person = {...this.state.persons[personIndex]};        //appoggio a una variabile la persona corrispondente

    //const person = Object.assign({}, this.state.persons[personIndex])
    
    person.name = event.target.value;                           //quindi gli cambio il nome
    
    const persons = [...this.state.persons];                    //appoggio a una nuova variabile il vecchio stato
    persons[personIndex] = person;                              //ci modifico il nome alla persona corrispondente
    this.setState({persons: persons});                          //aggiorno lo stato {vecchioarray:nuovoarray}
    
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];              
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  tooglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow})

  }
  
  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {
            this.state.persons.map ((person, index) => {
              return <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}/>
              })
          }
        </div>
      );

      style.backgroundColor = 'red';
    }

    let classes = [];
    if (this.state.persons.length<=2) {
      classes.push('red'); //classes = ['red']
    }

    if (this.state.persons.length<=1) {
      classes.push('bold'); //classes = ['bold']
    }

    return (
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button
            style={style}
            onClick={this.tooglePersonsHandler}>Toogle Persons</button>
            { persons }
        </div>
    );
    // return React.createElement('div',{className: 'App'}, React.createElement('h1',null , 'Does this work now?'));
  }
}

export default App;
