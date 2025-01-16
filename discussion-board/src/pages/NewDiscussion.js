import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewDiscussion = () => {
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

    // Define styles
    const styles = {
        container: {
            maxWidth: '600px',
            margin: '40px auto',
            padding: '25px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
            backgroundColor: '#f4f4f4',
        },
        heading: {
            textAlign: 'center',
            color: '#444',
            marginBottom: '25px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
        },
        label: {
            fontWeight: 'bold',
            color: '#666',
        },
        input: {
            width: '100%',
            padding: '12px',
            border: '1px solid #bbb',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: '#fff',
        },
        textarea: {
            width: '100%',
            padding: '12px',
            border: '1px solid #bbb',
            borderRadius: '5px',
            fontSize: '16px',
            backgroundColor: '#fff',
            resize: 'vertical',
            minHeight: '120px',
        },
        button: {
            padding: '12px 24px',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#0056b3',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#004080',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Post a New Discussion</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div>
                    <label htmlFor="title" style={styles.label}>Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div>
                    <label htmlFor="content" style={styles.label}>Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                </div>
                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Post Discussion
                </button>
            </form>
        </div>
    );
};

export default NewDiscussion;
