# Requirement Specification Document

## Introduction

### Purpose

The purpose off this movie-book recommender is to assist users in finding movies and books that fit their tastes
and to create an easy-to-use application for users trying to find new movies to watch and books to read.
The purpose is to have a large database of movies and books, which will make the recommendations more likely to be useful.

## Overall Description

### Product perspective

The movie-book recommender system stores the following information:

##### User ratings

These include the users rating for movies and books. These are very important for providing the user with accurate recommendations.

##### User wishlist

These include the movies and books that the user has added to the wishlist. These are stored so that the user has a way to
remember the movies and books that they wish to see/read and rate in the future.

##### Movie/Book data

These include all the relevant data regarding the movies and books in the system. These are important both for the user experience
and the functionality of the recommender. It is important that the user has information about the items they are browsing. 
It is equally important that the system itself can compare the items to one another and make accurate recommendations.

### Characteristics

Users can use the application to browse and search for movies, rate them, and add the to a wishlist.
The user must also be able to see recommended movies and books based on the ratings they have given to other movies and books.
The user should also see movies and books similar to the ones they are browsing so that recommendations are not entirely 
dependent on the ratings. When inspecting en item they are familiar with have already seen the user should be able to immediately 
see others like it, without first rating said item.
When inspecting an item the user must also be provided with essential information related to that item such as genres and descriptions.


### Dependencies 

We are dependent on the movie and book data being acquired from an external source. Gathering all of this data is not possible within the constraints of this project. 

## Functional Requirements


- The product shall allow users to browse items with relative ease.
- The product shall allow users to search for items based on the items name.
- The product shall allow users to view more information about an item.
- The product shall allow users to rate items on a scale from 1-5.
- The product shall allow users to add items to a wishlist.
- The product shall allow users to see recommendations based on ratings.
- The product shall allow users to see similar items to the one they are inspecting.


## Non-functional Requirements


### Usability

- The system should be easy to use and should not require any kind of learning.
- A user who already knows what product he is interested in should be able to locate and view that page in seconds.

### Performance

- The system should be able to support simultaneous users.
- The mean time for generating recommendations should not exceed 10 seconds.

### Security

- A user should be able to choose whether or not cookies are used to save ratings and wishlist items.

### Supportability

- The shall shall work on the most common browsers used.
