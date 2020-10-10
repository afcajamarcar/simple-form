import React from 'react';
import './styles/App.scss';
import { FormControl, FormGroup, InputLabel, Input, Button } from '@material-ui/core';

function App() {
  console.log('rendering...');
  return (
    <div className="App">
      <FormGroup>
        <FormControl className="justify">
          <InputLabel htmlFor="student-name" >Nombre completo</InputLabel>
          <Input type="text" id="student-name"/>
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-code" >Código</InputLabel>
          <Input type="text" id="student-code"/>
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-help" >Ayuda de interés</InputLabel>
          <Input type="text" id="student-help"/>
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-assignment" >Asignatura</InputLabel>
          <Input type="text" id="student-assignment"/>
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-course" >Grupo</InputLabel>
          <Input type="text" id="student-course"/>
        </FormControl>
        {/* TODO implement image loader */}
        <FormControl className="justify">
          <h3>imagen del carne</h3>
        </FormControl>
        <Button variant="contained" color="primary">Guardar</Button>
      </FormGroup>
    </div>
  );
}

export default App;
