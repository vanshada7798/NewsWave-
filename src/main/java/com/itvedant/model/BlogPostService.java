package com.itvedant.model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogPostService {

    @Autowired
    private BlogPostRepository blogPostRepository;

    // Fetch all blog posts
    public List<BlogPost> getAllPosts() {
        return blogPostRepository.findAll();
    }

    // Fetch a blog post by ID
    public BlogPost getPostById(Long id) {
        return blogPostRepository.findById(id).orElseThrow(() -> new RuntimeException("Blog post not found"));
    }

    // Create a new blog post
    public BlogPost createPost(String title, String content, String author, String imageName) {
        BlogPost newPost = new BlogPost();
        newPost.setTitle(title);
        newPost.setContent(content);
        newPost.setAuthor(author);
        newPost.setImage(imageName); // Store the image filename
        return blogPostRepository.save(newPost);
    }

    // Update an existing blog post
    public BlogPost updatePost(Long id, BlogPost updatedPost) {
        Optional<BlogPost> existingPostOptional = blogPostRepository.findById(id);

        if (existingPostOptional.isPresent()) {
            BlogPost existingPost = existingPostOptional.get();
            existingPost.setTitle(updatedPost.getTitle());
            existingPost.setContent(updatedPost.getContent());
            existingPost.setAuthor(updatedPost.getAuthor());
            
            // Only update the image if a new one is provided
            if (updatedPost.getImage() != null) {
                existingPost.setImage(updatedPost.getImage());
            }

            return blogPostRepository.save(existingPost);
        } else {
            throw new RuntimeException("Blog post not found");
        }
    }

    // Delete a single blog post by ID
    public void deletePost(Long id) {
        if (!blogPostRepository.existsById(id)) {
            throw new RuntimeException("Blog post not found");
        }
        blogPostRepository.deleteById(id);
    }

    // Delete all blog posts
    public void deleteAllPosts() {
        blogPostRepository.deleteAll();
    }
}
