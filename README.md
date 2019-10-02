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

## Demo (partioally deployed)

This demo will only work if you have the server side hosted on localhost:4000.
To do that:
* clone this repo.
* cd to server folder
* To install brew, or if you have brew already, update it, install mongodb, then start mongodb service run the following commands in your terminal:
   * /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   * brew update
   * brew install mongodb-community@4.2 (Source: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
   * brew services start mongodb-community
* node index.js

Sources: 
https://brew.sh/ 
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/index.html

Use the graphql playground http://localhost:4000/ with the query reference below.
Hosted on: https://habibmostafa.github.io/company-cost-calculator/ 

## Graphql Queries Reference
{
  costOfCompany(company:"ibm")
}

mutation {
  removeEmployee(employeeId: 0)
}

mutation {
  updateEmployee(
    employeeId: 1007,
    firstName:"mostafa", 
    lastName: "habib", 
    address:"somewhere",
    company: "ibm",
  	salary: 120000)
}

{
  employees {
    employeeId
    firstName
    lastName
    address
    company
    salary
  }
}

mutation {
  createEmployee(
    employeeId: 1007,
    firstName:"mostafa", 
    lastName: "habib", 
    address:"somewhere",
    company: "ibm",
  	salary: 120000) {
    employeeId
    firstName
    salary
  }
}

