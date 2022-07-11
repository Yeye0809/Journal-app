
import { Routes, Route, Navigate } from 'react-router-dom'

import { AuthRouter } from '../auth/routes/AuthRouter'
import { JournalRoutes } from '../journalApp/routes/JournalRoutes'

import { CheckingAuth } from '../ui'
import { useCheckAuth } from '../hooks/useCheckAuth'

export const RouterApp = () => {

 

 const { status } = useCheckAuth()
  
  if( status === 'checking'){
    return <CheckingAuth />
  }


  return (
    <Routes>

      {
        (status === 'authenticade')
        ? <Route path="/*" element={ <JournalRoutes />} />
        : <Route path="/auth/*" element={ <AuthRouter />} />
      }

      <Route  path ="/*" element={ <Navigate to="/auth/login"/>} />

        {/* login y registro */}
        {/* <Route path="/auth/*" element={ <AuthRouter />} /> */}

        {/* journalApp */}
        {/* <Route path="/*" element={ <JournalRoutes />} /> */}
        
    </Routes>
  )
}
