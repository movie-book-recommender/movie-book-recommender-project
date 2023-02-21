# Instructions for running tests

### 1.  install cypress:
```npm install```
### 3. Open a new terminal and run the program
``` cd /src/frontend/```
``` npm start```
DO NOT CLOSE THE PROGRAM WHILE TESTS RUN!
### 4. running test online
```npm run cypress:open```
Cypress page will open. Choose "E2E Testing". Then you choose yout browser (Chrome is preferred). You can run the test by clicking the name of the test, (e.g. front.cy.js). The test will run and you have a visual version of how the test runs.
### 5. Running test from terminal
Navigate to frontend folder (2.) and run
```npm run test:e2e``
The test result will be shown on your terminal.
### 5. Coverage
This is not possible yet
## Writing cypress tests
Cypress tests for frontend can be made in /src/frontend/cypress/e2e
Files are named 'Yourtestname.cy.js'. Testing process starts with 'describe('sonething', function(){all tests})'. It is recommended to use
```
beforeEach(function(){
    cy.visit('http://localhost:3000')
  })
```
at the beginning to make sure the browser opens at every test. Tests can be written inside ``` it()``` functions. Basic types of testing functions include ```cy.contains()```, ```.click()``` and ```cy.get()```
### ```cy.contains()```
contains is used to find text from page. Text can be inside a button or just on its own.
### ```.click()```
click is used to click buttons. Usually it is used after contains: ```cy.contains('').click() to click button that contains certain type of text.
### ```cy.get()```
get is used to find fields. If you want to find certain field and write in it, you can use ```cy.get(#fieldname).type('')```.
