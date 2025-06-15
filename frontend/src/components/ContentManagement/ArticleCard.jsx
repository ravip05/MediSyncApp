import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ArticleCard = ({ article }) => {
    const navigate = useNavigate();

    const handleDelete = () => {
        axios.delete(`/api/articles/${article.id}`)
            .then(() => {
                alert('Article deleted successfully.');
                window.location.reload(); // Refresh the page
            })
            .catch((error) => console.error('Error deleting article:', error));
    };

    return (
        <div className="border rounded-lg shadow-sm p-4 bg-gray-50 hover:shadow-md transition-shadow">
            <h2 className="text-lg font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-600 mb-2">{article.category}</p>
            <p className="text-gray-700 text-sm">{article.content.substring(0, 100)}...</p>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => navigate(`/articles/edit/${article.id}`)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ArticleCard;
