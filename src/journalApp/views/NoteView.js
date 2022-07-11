import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import SaveIcon from '@mui/icons-material/Save';
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import { DeleteOutline, UploadFileOutlined } from "@mui/icons-material";

import { useForm } from "../../hooks/useForm";
import { ImageGallery } from "../components";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeleteNote, startLoadingNotes, startSaveNote, startUpLoadingFiles } from "../../store/journal/thunks";


export const NoteView = () => {

    const dispatch = useDispatch();

    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );
    const {title, body, date, onInputChange, formState} = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toString();
    }, [ date ])

    const inputFileRef = useRef();


    useEffect(() => { 
        dispatch( setActiveNote( formState ) )
      }
    , [formState])


    useEffect(() => {
        if( messageSaved.length > 0) {
            Swal.fire('Guardado',  messageSaved , 'success')
        }
    }, [messageSaved])
    



    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onInputfileChange = ({ target }) => {
        if( target.files === 0) return

        console.log( 'Subiendo Archivos');
        
        dispatch( startUpLoadingFiles( target.files ))
    }

    const onDelete = () => {
        dispatch( startDeleteNote())
    }
    
    

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight="light" > { dateString }</Typography>
        </Grid>
        <Grid item>

            <input 
            type="file"
            multiple
            ref={ inputFileRef }
            onChange={ onInputfileChange }
            style= {{ display: "none"}}
            />

            <IconButton
                disabled={ isSaving }
                color="primary"
                onClick={ () => inputFileRef.current.click() }
            >
                <UploadFileOutlined  />
            </IconButton>

            <Button 
                disabled= { isSaving }
                onClick={ onSaveNote }
                color="primary" 
                sx={{ padding: 2}}

            >
                    <SaveIcon  sx={{ fontSize:30, mr: 1 }}/>
                    Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingresa un Titulo"
                label="titulo"
                sx={{ border: "none", mb: 1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />

            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="Que sucedio el dia de hoy?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
                       
            />
            
        </Grid>

        <Grid container  
            justifyContent="end"
        >
                <Button 
                    sx={{ mt: 2}}
                    onClick={ onDelete }
                    color="error">
                        <DeleteOutline />
                        Borrar
                </Button>
        </Grid>

        {/* image gallery */}

        <ImageGallery images = { note.imageUrls } />

    </Grid>
  )
}
