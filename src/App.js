import './styles/App.scss';
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import { FormControl, FormGroup, InputLabel, Input, Button, FormHelperText } from '@material-ui/core';
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

  let [studentErrors, setStudentErrors] = useState({
    nameError: { isError: false, message: '' },
    codeError: { isError: false, message: '' },
    helpError: { isError: false, message: '' },
    assignmentError: { isError: false, message: '' },
    courseError: { isError: false, message: '' },
    imageError: { isError: false, message: '' }
  });

  let [doesDragHaveFiles, setDoesDragHaveFiles] = useState(false);

  const handleChange = e => {
    setStudentInfo({
      ...studentInfo,
      [e.target.name]: e.target.value
    });
  };

  const onDrop = useCallback(image => {
    console.log('drop received');
    console.log(image);

    if (!image[0].type.includes('png') || image[0].type.includes('jpg') ||
      image[0].type.includes('jpeg')) {
      setStudentErrors({
        ...studentErrors,
        imageError: { isError: true, message: "Solo se permiten archivos de tipo jpg, png o jpeg" }
      });
      return;
    }

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
      setStudentErrors({
        ...studentErrors,
        imageError: { isError: false, message: "" }
      });
    }, false);
  }, [studentInfo, doesDragHaveFiles, studentErrors]);

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

  const validateAll = () => {
    let nameError = { isError: false, message: '' };
    let codeError = nameError;
    let helpError = nameError;
    let assignmentError = nameError;
    let courseError = nameError;
    // Validations
    console.log(studentInfo);
    if (!studentInfo.name || studentInfo.name.length < 10) nameError = { isError: true, message: 'El nombre debe tener al menos 10 caracteres' }
    if (!studentInfo.code || studentInfo.code.length < 8) codeError = { isError: true, message: 'El código debe tener al menos 8 caracteres' }
    if (!studentInfo.help || studentInfo.help.length < 5) helpError = { isError: true, message: 'La ayuda debe tener al menos 5 caracteres' }
    if (!studentInfo.assignment || studentInfo.assignment.length < 5) assignmentError = { isError: true, message: 'La asignatura debe tener al menos 5 caracteres' }
    if (!studentInfo.course) courseError = { isError: true, message: 'El curso no puede estar vacío' }
    setStudentErrors({
      ...studentErrors,
      nameError: nameError,
      codeError: codeError,
      helpError: helpError,
      assignmentError: assignmentError,
      courseError: courseError
    })
  }

  const handleSubmit = (e) => {
    console.log('handling sumbmit');
    e.preventDefault(); // Prevent submit behavior to keep a single source of truth
    validateAll();
  };

  return (
    <div className="App">
      <FormGroup className="form-container">
        <FormControl className="justify" error={studentErrors.nameError.isError}>
          <InputLabel htmlFor="student-name" >Nombre completo</InputLabel>
          <Input type="text" name="name" id="student-name" onChange={e => handleChange(e)} />
          <FormHelperText id="name-error-text">{studentErrors.nameError.message}</FormHelperText>
        </FormControl>
        <FormControl className="justify" error={studentErrors.codeError.isError}>
          <InputLabel htmlFor="student-code" >Código</InputLabel>
          <Input type="text" name="code" id="student-code" onChange={e => handleChange(e)} />
          <FormHelperText id="name-error-text">{studentErrors.codeError.message}</FormHelperText>
        </FormControl>
        <FormControl className="justify" error={studentErrors.helpError.isError}>
          <InputLabel htmlFor="student-help" >Ayuda de interés</InputLabel>
          <Input type="text" id="student-help" name="help" onChange={e => handleChange(e)} />
          <FormHelperText id="name-error-text">{studentErrors.helpError.message}</FormHelperText>
        </FormControl>
        <FormControl className="justify" error={studentErrors.assignmentError.isError}>
          <InputLabel htmlFor="student-assignment" >Asignatura</InputLabel>
          <Input type="text" id="student-assignment" name="assignment" onChange={e => handleChange(e)} />
          <FormHelperText id="name-error-text">{studentErrors.assignmentError.message}</FormHelperText>
        </FormControl>
        <FormControl className="justify" error={studentErrors.courseError.isError}>
          <InputLabel htmlFor="student-course" >Grupo</InputLabel>
          <Input type="text" id="student-course" name="course" onChange={e => handleChange(e)} />
          <FormHelperText id="name-error-text">{studentErrors.courseError.message}</FormHelperText>
        </FormControl>
        <FormControl className="justify" error={studentErrors.imageError.isError}>
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
          <FormHelperText id="name-error-text">{studentErrors.imageError.message}</FormHelperText>
        </FormControl>
        <Button onClick={e => handleSubmit(e)} disabled={!isAbleToSave} variant="contained" color="primary">Guardar</Button>
      </FormGroup>
    </div>
  );
}

export default App;
