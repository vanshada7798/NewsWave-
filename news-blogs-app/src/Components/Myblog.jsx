import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./MyBlog.css";

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", author: "", image: null });
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);



  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/blogs");
      if (Array.isArray(response.data)) {
        setBlogs(response.data.map(blog => ({
          ...blog,
          comments: JSON.parse(localStorage.getItem(`comments_${blog.id}`)) || [],
          likes: JSON.parse(localStorage.getItem(`likes_${blog.id}`)) || 0
        })));
      }
    } catch (error) {
      setError("Failed to fetch blogs. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handlePostBlog = async () => {
    if (!newBlog.title.trim() || !newBlog.content.trim() || !newBlog.author.trim()) {
      setError("Title, content, and author are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    formData.append("author", newBlog.author);
    if (newBlog.image) {
      formData.append("image", newBlog.image);
    }

    try {
      await axios.post("http://localhost:8080/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchBlogs();
      setNewBlog({ title: "", content: "", author: "", image: null });
      setShowForm(false);
    } catch (error) {
      setError("Error posting blog. Please try again.");
    }
  };
  

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/blogs/${id}`);
      setBlogs(blogs.filter(blog => blog.id !== id));
      localStorage.removeItem(`comments_${id}`);
      localStorage.removeItem(`likes_${id}`);
    } catch (error) {
      setError("Error deleting blog. Please try again.");
    }
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setLikes(blog.likes || 0);
    setComments(JSON.parse(localStorage.getItem(`comments_${blog.id}`)) || []);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const updatedComments = [...comments, { comment: newComment }];
      setComments(updatedComments);
      localStorage.setItem(`comments_${selectedBlog.id}`, JSON.stringify(updatedComments));

      setBlogs(blogs.map(blog => 
        blog.id === selectedBlog.id ? { ...blog, comments: updatedComments } : blog
      ));

      setNewComment("");
    }
  };

  const handleLike = () => {
    const updatedLikes = likes + 1;
    setLikes(updatedLikes);
    localStorage.setItem(`likes_${selectedBlog.id}`, JSON.stringify(updatedLikes));

    setBlogs(blogs.map(blog => 
      blog.id === selectedBlog.id ? { ...blog, likes: updatedLikes } : blog
    ));
  };

  return (
    <div className="blog-container">
      {error && <p className="error-message">{error}</p>}

      <button className="toggle-form-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close" : "Create New Post"}
      </button>

      {showForm && (
        <div className="blog-form">
          <h2>Add a Blog</h2>
          <input type="text" placeholder="Title" value={newBlog.title} onChange={e => setNewBlog({ ...newBlog, title: e.target.value })} />
          <textarea placeholder="Content" value={newBlog.content} onChange={e => setNewBlog({ ...newBlog, content: e.target.value })}></textarea>
          <input type="text" placeholder="Author" value={newBlog.author} onChange={e => setNewBlog({ ...newBlog, author: e.target.value })} />
          <input type="file" accept="image/*" onChange={e => setNewBlog({ ...newBlog, image: e.target.files[0] })} />
          <button onClick={handlePostBlog}>Post</button>
        </div>
      )}

      <div className="blog-list">
        <h2>Recent Blogs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : blogs.length > 0 ? (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <div key={blog.id} className="blog-card" onClick={() => handleBlogClick(blog)}>
                {blog.image && <img src={`http://localhost:8080/api/blogs/uploads/${blog.image}`} alt="Blog" className="blog-image" />}
                <div className="blog-content">
                  <h3>{blog.title}</h3>

                  <p>{blog.content.slice(0, 80)}...</p>
                  <p className="author-name">By: {blog.author}</p>
                  <div className="comment-snippet">{blog.comments.length} comments | {blog.likes} Likes</div>
                  <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteBlog(blog.id); }}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No blogs available.</p>
        )}
      </div>

      {selectedBlog && (
        <div className="blog-modal">
          <div className="blog-modal-content">
            <img src={`http://localhost:8080/api/blogs/uploads/${selectedBlog.image}`} alt="Blog" className="modal-image" />
            <h3>{selectedBlog.title}</h3>
            <p>{selectedBlog.content}</p>

            <div className="blog-actions">
              <button className="like-btn" onClick={handleLike}>
                <FontAwesomeIcon icon={faThumbsUp} /> Like {likes}
              </button>
              <button className="share-btn">
                <FontAwesomeIcon icon={faShareAlt} /> Share
              </button>
            </div>

            <div className="comment-section">
              <textarea placeholder="Add a comment..." rows="2" value={newComment} onChange={(e) => setNewComment(e.target.value)}></textarea>
              <button onClick={handleAddComment} className="post-comment-btn">Post Comment</button>
              <div className="comments-list">
                {comments.length === 0 ? <p className="no-comments">No comments yet.</p> : comments.map((comment, index) => (
                  <div key={index} className="comment-item">
                    <p>{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <button className="close-btn" onClick={() => setSelectedBlog(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlog;
