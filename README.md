# JWT Authentication Template

This is my JWT template for use with React, Node.js/Express and MongoDB.
You can use it to get started, and modify it as you want. 

# Required packages

## For the startup script
- concurrently
- nodemon

## Frontend
- react
- react-router-dom

## Backend
- bcryptjs
- body-parser
- cookie-parser
- dotenv
- express
- helmet
- jsonwebtoken
- mongoose (requires MongoDB)
- validator

# Tips

1. Edit the .env file from the backend with your own passwords and details.

2. To create the first user go to http://localhost:3000/register/

3. You can use the <PrivateRoute> component to restrict user access and allow only registered users to other components. 

In the /frontend/src/App.js you would want to change <Route path=....> to <PrivateRoute> for the routes that you want.
For example, change it for the '/register' route to deny users from creating new ones without being logged in.

5. ALWAYS use https in production!

4. In production you will need to edit the package.json file from the frontend folder and remove the below line:

```
"proxy": "http://localhost:2000" 
```

and also edit the .env file and replace the URL_PREFIX value with a blank string:

```
URL_PREFIX=''
```

This is done because the package.json proxy setting won't run in production and I'm using the URL_PREFIX to make calls to /api/call in development and use a proxy_redirect in nginx for production:

```
	location /api/ {
		proxy_pass http://localhost:2000/;
		proxy_redirect http://localhost:2000/ /api;
	}

```
