import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Discussions = () => {
    const [discussions, setDiscussions] = useState([]);
    const [likes, setLikes] = useState({});
    const [dislikes, setDislikes] = useState({});

    // Load discussions, likes, and dislikes from localStorage
    useEffect(() => {
        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];
        setDiscussions(storedDiscussions);

        const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
        const storedDislikes = JSON.parse(localStorage.getItem('dislikes')) || {};
        setLikes(storedLikes);
        setDislikes(storedDislikes);
    }, []);

    // Handle like action
    const handleLike = (id) => {
        const updatedLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
        setLikes(updatedLikes);
        localStorage.setItem('likes', JSON.stringify(updatedLikes));
    };

    // Handle dislike action
    const handleDislike = (id) => {
        const updatedDislikes = { ...dislikes, [id]: (dislikes[id] || 0) + 1 };
        setDislikes(updatedDislikes);
        localStorage.setItem('dislikes', JSON.stringify(updatedDislikes));
    };

    return (
        <div className="container mt-5 p-4 border rounded shadow bg-light">
            <h1 className="text-center text-dark mb-4">Discussions</h1>
            <div className="text-center mb-4">
                <Link
                    to="/new-discussion"
                    className="btn btn-primary"
                >
                    Post a New Discussion
                </Link>
            </div>
            <ul className="list-unstyled">
                {discussions.map((discussion) => (
                    <li key={discussion.id} className="mb-4 p-3 border rounded bg-white">
                        <h2 className="h5 text-dark">{discussion.title}</h2>
                        <p className="text-muted">{discussion.content}</p>
                        <button
                            className="btn btn-success me-2"
                            onClick={() => handleLike(discussion.id)}
                        >
                            👍 ({likes[discussion.id] || 0})
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDislike(discussion.id)}
                        >
                            👎 ({dislikes[discussion.id] || 0})
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Discussions;
