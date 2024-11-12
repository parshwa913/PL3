import React, { useState } from 'react';
import Login from './components/Login';
import TaskManager from './components/TaskManager';

const App = () => {
    const [token, setToken] = useState(null);

    return (
        <div>
            {token ? (
                <TaskManager token={token} />
            ) : (
                <Login setToken={setToken} />
            )}
        </div>
    );
};

export default App;
