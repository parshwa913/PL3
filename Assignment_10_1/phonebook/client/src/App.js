import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ContactList from './components/ContactList';
import AddContact from './components/AddContact';
import EditContact from './components/EditContact';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/contacts" component={ContactList} />
                <Route path="/add-contact" component={AddContact} />
                <Route path="/edit-contact/:id" component={EditContact} />
                <Route path="/" exact component={Login} />
            </Switch>
        </Router>
    );
}

export default App;
