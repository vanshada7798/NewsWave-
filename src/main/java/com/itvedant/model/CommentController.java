package com.itvedant.model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:5174")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/{blogPostId}")
    public ResponseEntity<Comment> addComment(@PathVariable Long blogPostId, @RequestBody Comment comment) {
        return ResponseEntity.ok(commentService.addComment(blogPostId, comment));
    }

    @GetMapping("/{blogPostId}")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Long blogPostId) {
        return ResponseEntity.ok(commentService.getCommentsByBlogPost(blogPostId));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
