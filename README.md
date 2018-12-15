# company-cost-calculator

## Business Requirements:
### High level App description:
Simple app that calculates the cost of a company by the salaries of its employees. Single page application form for inputting employee data and another form to get company cost of a selected company.

### Implementation specifics:
* The page contains five text input fields on the left-hand side of the page, labeled as follows: First Name, Last Name, Address, Company and Salary.
* Required Fields: First Name, Last Name, Company and Salary.
    * Address is not required.

* Below the input fields there would be a ‘Submit’ button. When the user presses the button, the data in the five fields would be saved in a database.

* When the user clicks the button, whatever text that appears in the fields on the left should be read from the database and displayed on the right side of the screen.

* In a separate form, please include an interface that will calculate and display the costs of any of the companies persisted to the database based on the salary of its employees.

    * There can be a drop down or a search field to select the company and on selection it would show the cost of that company.

## Technical Specs:
Single-page, Node.js application using React.js front end.

MongoDB running on local machine. Document-based database using one document to store the five text boxes.
So, one collection of that document having entries of the input forms.

Another separate form would have a drop down or search field to select the company and show the calculated cost.

Implement effecient calculations.

### Tech Stack
* ReactJS 
* Node.js 
* Express
* MongoDB
* GraphQL

## Extra
* Writing front and back-end tests
* Pushing the GitHub repository to a cloud hosting provider