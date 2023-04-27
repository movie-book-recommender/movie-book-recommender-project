# Testing Document

Frontend testing is done with Cypress. Read [instructions](https://github.com/movie-book-recommender/movie-book-recommender-project/blob/main/Documentation/instructions/reacttesting.md) to find out how to make them.

Every time a new feature is made, it is recommended to write tests for it instantly to make sure every feature is tested. The testing is based on using a virtual browser for the automated testing software (cypress) to see what is visible on which page and trying out click buttons etc. . The test code itself is very readable, so it is easy to see what is tested.

Some problems might occur where the tests time out, because the backend does not respond fast enough. Usually it is enough to run them again and to add wait time if it is really slow.

There is no unit testing involved in the frontend application, as end-to-end tests are viable enough to ensure the application's quality.

Coverage for cypress tests is still under development.