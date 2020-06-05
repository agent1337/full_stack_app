import React from 'react'
import {Router, Route} from 'react-router-dom'
import history from './history'
import {AppWrapper} from './AppStyled'

import Home from './components/Home/Home'
import Login from './components/Login/Login'
import SignUp from './components/SignUp/SignUp'
import ResetPass from './components/ResetPass/ResetPass'
import ItemsList from './components/ItemsList/ItemsList'
import AddItem from './components/AddItem/AddItem'
import UpdateItem from './components/UpdateItem/UpdateItem'

function App() {
    return (
        <Router history={history}>
            <AppWrapper className="App">
                <Route exact path='/' component={Home}/>
                <Route exact path='/users/logIn' component={Login}/>
                <Route exact path='/users/SignUp' component={SignUp}/>
                <Route exact path='/users/user/reset/:userId' component={ResetPass}/>
                <Route exact path='/users/user/data/:userId' component={ItemsList}/>
                <Route exact path='/users/addItem/:userId' component={AddItem}/>
                <Route exact path='/items/updateItem/:itemId/:itemName' component={UpdateItem}/>
            </AppWrapper>
        </Router>
    )
}

export default App
