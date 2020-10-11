import './styles/App.scss';
import React, { useState } from 'react';
import { FormControl, FormGroup, InputLabel, Input, Button } from '@material-ui/core';

function App() {
  console.log('rendering...');
  let [studentInfo, setStudentInfo] = useState({
    name: '',
    code: '',
    help: '',
    assignment: '',
    course: '',
    image: ''
  });

  const handleChange = e => {
    setStudentInfo({
      ...studentInfo,
      [e.target.name]: e.target.value
    });
  }; 

  return (
    <div className="App">
      <FormGroup>
        <FormControl className="justify">
          <InputLabel htmlFor="student-name" >Nombre completo</InputLabel>
          <Input type="text" name="name" id="student-name" onChange={e => handleChange(e)}/>
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-code" >Código</InputLabel>
          <Input type="text" name="code" id="student-code" onChange={e => handleChange(e)}/>
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-help" >Ayuda de interés</InputLabel>
          <Input type="text" id="student-help" name="help" onChange={e => handleChange(e)}/>
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-assignment" >Asignatura</InputLabel>
          <Input type="text" id="student-assignment" name="assignment" onChange={e => handleChange(e)}/>
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-course" >Grupo</InputLabel>
          <Input type="text" id="student-course" name="course" onChange={e => handleChange(e)}/>
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
