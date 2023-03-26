# company-structure

### TO RUN THE BACKEND

Go into the company-structure folder

Run 'npm I'

Run 'npm run build'

Run 'npm run start'

Now the backend is up and running and support 3 endpoints.

## http://localhost:3000/add-node

Post method used to add a new node by add the following json (example) to the body

{
"name": "my test name 123",
"parentId": "1",
"nameOfDepartment": "my new depart",
"programmingLanguage": "My new language"
}

## http://localhost:3000/get-children/:id

Get method used get all children of a specific node and can be called like this

http://localhost:3000/get-children/1

## http://localhost:3000/update-parent

Put method used to change the parent of a node by add the following json (example) to the body

{
"departmentId": "4",
"newParentId": "3"
}

### TO RUN THE FRONTEND

Go into the frontend folder

Run 'npm I'

Run 'npm run start'

Now the frontend is up and running and should open in the browser automtically.
