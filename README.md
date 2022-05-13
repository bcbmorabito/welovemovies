# Thinkful Backend Capstone: WeLoveMovies

This assessment required that I build and deploy the backend API for an app that allows users to look up movies, theaters showing specific movies, and reviews for movies with information about the critics who wrote them.

I deployed this assignment here: https://welovemovies-bcbm.herokuapp.com/

## Routes

This API provides the following routes:
- /theaters
    - GET /theaters (List all theaters)
- /reviews
    - GET /reviews/:reviewId (Read review matching reviewId parameter)
    - PUT /reviews/:reviewId (Update review matching reviewId parameter)
    - DELETE /reviews/:reviewId (Delete review matching reviewId parameter)
- /movies
    - GET /movies (List all movies)
    - GET /movies/:movieId (Read movie matching movieId parameter)
    - GET /movies/:movieId/reviews (List all reviews for movie matching movieId parameter)
    - GET /movies/:movieId/theaters (List all theaters for movie matching movieId parameter)
