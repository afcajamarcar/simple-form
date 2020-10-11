import './styles/App.scss';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { FormControl, FormGroup, InputLabel, Input, Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';

function App() {
  console.log('rendering...');
  let [studentInfo, setStudentInfo] = useState({
    name: '',
    code: '',
    help: '',
    assignment: '',
    course: '',
    image: { encoded: '', name: '' }
  });

  let [doesDragHaveFiles, setDoesDragHaveFiles] = useState(false);

  const handleChange = e => {
    setStudentInfo({
      ...studentInfo,
      [e.target.name]: e.target.value
    });
  };

  console.log(studentInfo)


  const onDrop = useCallback(image => {
    console.log('drop received');
    console.log(image);

    const myBlob = new Blob(image, { type: image[0].type });

    const reader = new FileReader();

    reader.readAsDataURL(myBlob);

    if (!doesDragHaveFiles) {
      console.log('drag mark as occupied');
      setDoesDragHaveFiles(true);
    };

    reader.addEventListener('load', () => {
      setStudentInfo({
        ...studentInfo,
        image: { encoded: reader.result, name: image[0].name }
      });
    }, false);
  }, [studentInfo, doesDragHaveFiles]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const clearDragndropZone = () => {
    setStudentInfo({
      ...studentInfo,
      image: { encoded: '', name: '' }
    });
    setDoesDragHaveFiles(false);
  };

  const isAbleToSave = studentInfo.name && studentInfo.code && 
    studentInfo.help && studentInfo.assignment &&
    studentInfo.course && studentInfo.image.encoded;

  return (
    <div className="App">
      <FormGroup className="form-container">
        <FormControl className="justify">
          <InputLabel htmlFor="student-name" >Nombre completo</InputLabel>
          <Input type="text" name="name" id="student-name" onChange={e => handleChange(e)} />
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-code" >Código</InputLabel>
          <Input type="text" name="code" id="student-code" onChange={e => handleChange(e)} />
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-help" >Ayuda de interés</InputLabel>
          <Input type="text" id="student-help" name="help" onChange={e => handleChange(e)} />
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-assignment" >Asignatura</InputLabel>
          <Input type="text" id="student-assignment" name="assignment" onChange={e => handleChange(e)} />
        </FormControl>
        <FormControl className="justify">
          <InputLabel htmlFor="student-course" >Grupo</InputLabel>
          <Input type="text" id="student-course" name="course" onChange={e => handleChange(e)} />
        </FormControl>
        <FormControl className="justify">
          {!doesDragHaveFiles ?
            <div {...getRootProps()} className="clean-drag-n-drop">
              <input {...getInputProps()} />
              <GetAppIcon />
              <p>Arrastra la imagen de tu carné o <span className="click-here">haz click</span> para elegir un archivo</p>
            </div> :
            <div className="drag-n-drop">
              <div className="image-name-container">
                <span className="image-name">
                  {studentInfo.image.name}
                </span>
              </div>
              <img src={studentInfo.image.encoded} alt={studentInfo.image.name} />
            </div>}
          {doesDragHaveFiles &&
            <div className="wipe-drag-n-drop" onClick={() => clearDragndropZone()}>
              <DeleteIcon className="trash-icon" />
              <div className="delete-text">Eliminar imagen</div>
            </div>
          }
        </FormControl>
        <Button disabled={!isAbleToSave} variant="contained" color="primary">Guardar</Button>
      </FormGroup>
    </div>
  );
}

export default App;
