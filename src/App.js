import './styles/App.scss';
import "firebase/firestore";
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone'
import {
  FormControl, FormGroup, InputLabel, Input,
  Button, FormHelperText, Dialog, DialogContent, 
  CircularProgress, Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import firebaseApp from './firebase';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const ref = firebaseApp.firestore().collection("students");

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

  let [openDialog, setOpenDialog] = useState(false);

  let [openAlert, setOpenAlert] = useState(false);

  let [openAlertError, setOpenAlertError] = useState(false);

  const handleChange = e => {
    setStudentInfo({
      ...studentInfo,
      [e.target.name]: e.target.value
    });
  };

  const onDrop = useCallback(image => {
    console.log('drop received');
    console.log(image);

    if (image[0].type !== 'image/png' && image[0].type !== 'image/jpg' &&
      image[0].type !== 'image/jpeg') {
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
    console.log('studentErrors', studentErrors);
    let errors = [nameError, codeError, helpError, assignmentError, courseError];
    return Object.keys(errors).some(error => errors[error].isError);
  }

  const handleSubmit = (e) => {
    console.log('handling sumbmit');
    e.preventDefault(); // Prevent submit behavior to keep a single source of truth
    if (validateAll()) {
      console.log('problem with validation');
      return;
    };
    console.log('send data to firebase');
    setOpenDialog(true);
    ref.add(studentInfo)
      .then(docRef => {
        console.log("Document written with ID: ", docRef.id)
        setOpenDialog(false);
        setOpenAlert(true);
        setStudentInfo({
          name: '',
          code: '',
          help: '',
          assignment: '',
          course: '',
          image: { encoded: '', name: '' }
        })
        setDoesDragHaveFiles(false);
      })
      .catch(error => {
        console.error("Error adding document: ", error)
        setOpenDialog(false);
        setOpenAlertError(true);
      });
  };

  const handleClose = () => {
    setOpenDialog(false);
  }

  const handleAlertClose = () => {
    setOpenAlert(false);
  }

  const handleAlertErrorClose = () => {
    setOpenAlertError(false);
  }

  return (
    <div className="App">
      <FormGroup className="form-container">
        <FormControl className="justify" error={studentErrors.nameError.isError}>
          <InputLabel htmlFor="student-name" >Nombre completo</InputLabel>
          <Input type="text" name="name" id="student-name" value={studentInfo.name} onChange={e => handleChange(e)} />
          <FormHelperText id="name-error-text">{studentErrors.nameError.message}</FormHelperText>
        </FormControl>
        <FormControl className="justify" error={studentErrors.codeError.isError}>
          <InputLabel htmlFor="student-code" >Código</InputLabel>
          <Input type="text" name="code" id="student-code" value={studentInfo.code} onChange={e => handleChange(e)} />
          <FormHelperText id="name-error-text">{studentErrors.codeError.message}</FormHelperText>
        </FormControl>
        <FormControl className="justify" error={studentErrors.helpError.isError}>
          <InputLabel htmlFor="student-help" >Ayuda de interés</InputLabel>
          <Input type="text" id="student-help" name="help" value={studentInfo.help} onChange={e => handleChange(e)} />
          <FormHelperText id="name-error-text">{studentErrors.helpError.message}</FormHelperText>
        </FormControl>
        <FormControl className="justify" error={studentErrors.assignmentError.isError}>
          <InputLabel htmlFor="student-assignment" >Asignatura</InputLabel>
          <Input type="text" id="student-assignment" name="assignment" value={studentInfo.assignment} onChange={e => handleChange(e)} />
          <FormHelperText id="name-error-text">{studentErrors.assignmentError.message}</FormHelperText>
        </FormControl>
        <FormControl className="justify" error={studentErrors.courseError.isError}>
          <InputLabel htmlFor="student-course" >Grupo</InputLabel>
          <Input type="text" id="student-course" name="course" value={studentInfo.course} onChange={e => handleChange(e)} />
          <FormHelperText id="name-error-text">{studentErrors.courseError.message}</FormHelperText>
        </FormControl>
        <FormControl className="justify" error={studentErrors.imageError.isError}>
          {!doesDragHaveFiles ?
            <div {...getRootProps()} className="clean-drag-n-drop">
              <input {...getInputProps()} accept=".png,.jpg,.jpeg" />
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
      <Dialog
        open={openDialog}
        onClose={handleClose}
        disableBackdropClick
        disableEscapeKeyDown

      >
        <DialogContent>
          <div className="loader-container">
            <CircularProgress />
          </div>
          <p>Guardando la información...</p>
        </DialogContent>
      </Dialog>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          ¡Se han guardado los datos exitosamente!
        </Alert>
      </Snackbar>
      <Snackbar open={openAlertError} autoHideDuration={6000} onClose={handleAlertErrorClose}>
        <Alert onClose={handleAlertErrorClose} severity="error">
          ¡Ha ocurrido un error al intentar guardar los datos!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
