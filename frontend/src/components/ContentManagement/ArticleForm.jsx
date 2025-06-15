import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleForm = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            // Fetch the existing article data for editing
            axios.get(`/api/articles/${id}`)
                .then((response) => {
                    setTitle(response.data.title);
                    setCategory(response.data.category);
                    setContent(response.data.content);
                })
                .catch((error) => console.error('Error fetching article:', error));
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const articleData = { title, category, content };

        if (id) {
            // Update an existing article
            axios.put(`/api/articles/${id}`, articleData)
                .then(() => navigate('/articles'))
                .catch((error) => console.error('Error updating article:', error));
        } else {
            // Create a new article
            axios.post('/api/articles', articleData)
                .then(() => navigate('/articles'))
                .catch((error) => console.error('Error creating article:', error));
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg"
            >
                <h1 className="text-2xl font-bold mb-4">
                    {id ? 'Edit Article' : 'Create Article'}
                </h1>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Save Article
                </button>
            </form>
        </div>
    );
};

export default ArticleForm;
