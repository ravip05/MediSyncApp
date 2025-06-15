import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticleCard from './ArticleCard';
import axios from 'axios';

const ArticleDashboard = () => {
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();

    // Fetch articles from the backend
    useEffect(() => {
        axios.get('/api/articles')
            .then((response) => setArticles(response.data))
            .catch((error) => console.error('Error fetching articles:', error));
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-4">
                <h1 className="text-2xl font-bold mb-4">Manage Articles</h1>
                <button
                    onClick={() => navigate('/articles/new')}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-6 hover:bg-blue-600"
                >
                    Add New Article
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ArticleDashboard;