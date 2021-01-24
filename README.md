FDM Brand Game
=
In this document
* Running the Back-end
* Running the Front-end
* Admin Login Details

Running the Back-end
-
To begin running the server for the back-end open a terminal and cd into the server file
```
cd server
```
Next make sure the node modules package is up to date by running npm install
```
npm install
```
Finally using npm run the start script
```
npm run start
```
You should see in the console Server Started.
The server will run at localhost:3000 it connects to our external Mongodb Atlas database using this connection uri:
mongodb+srv://Team25:1vnSXJdmhQQDs5nb@cluster0.clvze.mongodb.net/Team25?retryWrites=true&w=majority

Running the Front-end
-
Once you have a terminal running the server open another to run the front-end
cd into the client folder
```
cd client
```
Next make sure the node modules package is up to date by running npm install
```
npm install
```
Finally, using npm run the start script
```
npm run start
```
You should see in the console it is running at localhost:8080 go to this url to use the application. Once
you also have the Back-end running.

Admin Account
-
Below are some admin login credentials that can be used to access the admin page using the regular login page
at the base route of localhost:8080 which is the first page you see when you open the application

Username: Admin

Password: Admin1