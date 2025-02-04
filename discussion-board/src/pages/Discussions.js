import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../component/Navbar';
import React from 'react';

const Discussions = () => {
    // state to manage discussions page 
    const [discussions, setDiscussions] = useState([]);
    // state to manage like and dislike state
    const [likes, setLikes] = useState({});
    const [dislikes, setDislikes] = useState({});

    // Load discussions, likes, and dislikes from localStorage
    useEffect(() => {
        // to store the data in localstorage
        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];
        setDiscussions(storedDiscussions);

        //to store likes
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

    // this is the xml structure for discussion page
    return (
        <>
        <Navbar/>
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
        </>

    );
};

export default Discussions;export const NewDiscussion = () => {
    // to handle state in newdiscussion page
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];

        const newDiscussion = {
            id: Date.now(),
            title,
            content,
        };

        const updatedDiscussions = [...storedDiscussions, newDiscussion];
        localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));

        navigate('/discussions');
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h1 className="text-center mb-4">Post a New Discussion</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title:
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-control"
                            required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">
                            Content:
                        </label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="form-control"
                            rows="5"
                            required />
                    </div>
                    <button type="submit" className="btn btn-success w-100 text-uppercase fw-bold text-danger">
                        Post Discussion
                    </button>
                </form>
            </div>
        </div>
    );
};

