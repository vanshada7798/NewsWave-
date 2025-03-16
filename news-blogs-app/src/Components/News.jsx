import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import './News.css';

const News = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [language, setLanguage] = useState('en');
  const [country, setCountry] = useState('us');
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const API_KEY = '9db1ab829b3a8c8c1ad2a36e9eb852a4';

  const categories = ['general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology', 'world'];
  const languages = [
    { name: 'English', value: 'en' }, { name: 'Hindi', value: 'hi' }, { name: 'Marathi', value: 'mr' }, 
    { name: 'Spanish', value: 'es' }, { name: 'French', value: 'fr' }, { name: 'German', value: 'de' },
    { name: 'Chinese', value: 'zh' }, { name: 'Japanese', value: 'ja' }
  ];
  const countries = [
    { name: 'United States', value: 'us' }, { name: 'India', value: 'in' }, { name: 'United Kingdom', value: 'gb' },
    { name: 'France', value: 'fr' }, { name: 'Germany', value: 'de' }, { name: 'Spain', value: 'es' },
    { name: 'Italy', value: 'it' }, { name: 'Australia', value: 'au' }
  ];

  useEffect(() => {
    fetchNews();
    window.scrollTo(0, 0);
  }, [category, language, country]);

  const fetchNews = async () => {
    try {
      let url;

      if (searchQuery.trim()) {
        url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(searchQuery)}&lang=${language}&max=20&apikey=${API_KEY}`;
      } else {
        url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=${language}&country=${country}&max=20&apikey=${API_KEY}`;
      }

      const response = await axios.get(url);

      if (response.status === 200) {
        setNews(response.data.articles);
        setError(null);
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news. Please try again later or check API Key.');
    }
  };

  const handleSearch = () => {
    fetchNews();
  };

  return (
    <div className="news-container">
      <nav className="navbar">
        <div className="filter-container">
          <FormControl variant="outlined" className="filter-group">
            <InputLabel>Language</InputLabel>
            <Select value={language} onChange={(e) => setLanguage(e.target.value)} label="Language">
              {languages.map((lang) => (
                <MenuItem key={lang.value} value={lang.value}>{lang.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" className="filter-group">
            <InputLabel>Country</InputLabel>
            <Select value={country} onChange={(e) => setCountry(e.target.value)} label="Country">
              {countries.map((c) => (
                <MenuItem key={c.value} value={c.value}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search News..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="button" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>

        <div className="categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      <div className="news-grid">
        {error ? (
          <p className="error-message">⚠️ {error}</p>
        ) : news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="news-item">
              <img src={article.image || 'https://via.placeholder.com/150'} alt={article.title} className="news-image" />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                Read more →
              </a>
            </div>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </div>
    </div>
  );
};

export default News;
