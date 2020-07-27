import React from 'react'
import JobApplication from './jobApplication'
import {BrowserRouter,Route} from 'react-router-dom'
import Dashboard from './Dashboard'

function App(props){
    return(
        <BrowserRouter>
        <div>
            <Route path="/" component={JobApplication} exact={true}/>
            <Route path="/dashboard" component={Dashboard}/>
        </div>
        </BrowserRouter>
    )
}
export default App