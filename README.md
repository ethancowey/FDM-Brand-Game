FDM Brand Game
=

In this document
* Running the Back-end
* Running the Front-end
* Admin Login Details
* User Accounts
* Technologies Used

Running the Back-end
-
You will need node.js installed to use npm to run the application.

To begin running the server for the back-end open a terminal and cd into the server file
```
cd server
```
Next install the node modules dependencies using running npm install
```
npm install
```
Finally using npm run the start script
```
npm run start
```
You should see in the console Server Started.
The server will run at localhost:3000 it connects to our external Mongodb Atlas database using this connection uri.
The project can be calibrated to run on Heroku instead of localhost ready for deployment.

Running the Front-end
-

Once you have a terminal running the server open another to run the front-end by first
cd into the client folder
```
cd client
```
Next install the node modules dependencies by running npm install
```
npm install
```
Finally, using npm run the start script
```
npm run start
```
You should see in the console it is running at localhost:8080 go to this url to use the application. Once
you also have the Back-end running to use the system.

Admin Account
-

Below are some admin login credentials that can be used to access the admin page using the regular login page
at the base route of localhost:8080 which is the first page you see when you open the application

Username: Admin

Password: Admin1

Second set of credentials below

Username: admin2

Password: admin2

User Account
-
You can create your own user account on the registration page to use to login. 
Or you can continue to the user part of the system as a guest. 

Technologies Used
-

The Front-end was written using Vue.js (client folder)

The Back-end was written using node.js (server folder)

The external database is a mongoDB Atlas which is currently version 4.2 but is due to upgrade to 4.4
automatically we have made sure that our mongo drivers are up to date to account for this.

Running the tests
-

To begin running the serverTests for the back-end open a terminal and cd into the server file
```
cd serverTests
```
Next install the node modules dependencies using running npm install
```
npm install
```
Finally using npm run the start script
```
npm run test
```
To begin running the clientTests for the back-end open a terminal and cd into the server file
```
cd clientTests
```
Next install the node modules dependencies using running npm install
```
npm install
```
Finally using npm run the start script
```
npm run test:unit
```
