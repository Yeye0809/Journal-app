import { useDispatch, useSelector } from "react-redux"
import { AddOutlined } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { startNewNote } from "../../store/journal/thunks"

export const JournalPages = () => {

  const { isSaving, active } = useSelector( state => state.journal)
  const dispatch = useDispatch()

  const onStartNewNote = () => {

    dispatch( startNewNote() )

  }

  return (
    
    <JournalLayout>

      {
        
       ( !!active)  
        ?  <NoteView />
           :  <NothingSelectedView />        
        
      }





      <IconButton
        disabled={ isSaving }
        onClick={ onStartNewNote }
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ':hover' : {  backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30  }}/>
      </IconButton>

    </JournalLayout>

  )
}
