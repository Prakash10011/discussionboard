import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Discussions from './pages/Discussions';
import NewDiscussion from './pages/Discussions';
import Discussion from './pages/Discussions';

//this is the main component
const App = () => {
    return (
        // router for routes
        <Router>
            {/* routes */}
            <Routes>
            <Route path="/" element={<Discussions />} />
                <Route path="/discussions" element={<Discussions />} />
                <Route path="/new-discussion" element={<NewDiscussion />} />
                <Route path="/discussion/:id" element={<Discussion />} />
            </Routes>
        </Router>
    );
};

export default App;
