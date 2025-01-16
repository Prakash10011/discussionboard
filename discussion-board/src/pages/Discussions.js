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
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 6px 12px rgba(119, 15, 224, 0.1)',
            backgroundColor: 'red',
        },
        header: {
            textAlign: 'center',
            color: '#444',
            marginBottom: '25px',
        },
        link: {
            display: 'inline-block',
            marginBottom: '25px',
            padding: '12px 24px',
            textDecoration: 'none',
            color: '#fff',
            backgroundColor: '#0066cc',
            borderRadius: '5px',
            transition: 'background-color 0.3s ease',
        },
        linkHover: {
            backgroundColor: '#004c99',
        },
        list: {
            listStyle: 'none',
            padding: '0',
        },
        listItem: {
            marginBottom: '25px',
            padding: '20px',
            border: '1px solid #bbb',
            borderRadius: '5px',
            backgroundColor: '#fff',
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#222',
            marginBottom: '15px',
        },
        content: {
            fontSize: '16px',
            color: '#666',
            marginBottom: '20px',
        },
        button: {
            marginRight: '10px',
            padding: '10px 22px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        likeButton: {
            backgroundColor: '#5cb85c',
            color: '#fff',
        },
        dislikeButton: {
            backgroundColor: '#d9534f',
            color: '#fff',
        },
        buttonHover: {
            backgroundColor: '#003d66',
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
                            👍 ({likes[discussion.id] || 0})
                        </button>
                        <button
                            style={{ ...styles.button, ...styles.dislikeButton }}
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
