import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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

    // Styles
    const styles = {
        container: {
            maxWidth: '800px',
            margin: '50px auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
        },
        header: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '20px',
        },
        link: {
            display: 'inline-block',
            marginBottom: '20px',
            padding: '10px 20px',
            textDecoration: 'none',
            color: '#fff',
            backgroundColor: '#007bff',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease',
        },
        linkHover: {
            backgroundColor: '#0056b3',
        },
        list: {
            listStyle: 'none',
            padding: '0',
        },
        listItem: {
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#fff',
        },
        title: {
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '10px',
        },
        content: {
            fontSize: '16px',
            color: '#555',
            marginBottom: '15px',
        },
        button: {
            marginRight: '10px',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        likeButton: {
            backgroundColor: '#28a745',
            color: '#fff',
        },
        dislikeButton: {
            backgroundColor: '#dc3545',
            color: '#fff',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Discussions</h1>
            <Link
                to="/new-discussion"
                style={styles.link}
                onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = styles.link.backgroundColor)}
            >
                Post a New Discussion
            </Link>
            <ul style={styles.list}>
                {discussions.map((discussion) => (
                    <li key={discussion.id} style={styles.listItem}>
                        <h2 style={styles.title}>{discussion.title}</h2>
                        <p style={styles.content}>{discussion.content}</p>
                        <button
                            style={{ ...styles.button, ...styles.likeButton }}
                            onClick={() => handleLike(discussion.id)}
                        >
                            Like ({likes[discussion.id] || 0})
                        </button>
                        <button
                            style={{ ...styles.button, ...styles.dislikeButton }}
                            onClick={() => handleDislike(discussion.id)}
                        >
                            Dislike ({dislikes[discussion.id] || 0})
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Discussions;
