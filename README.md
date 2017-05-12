# Cover Your Apps

A teaching platform aimed at non-technically savvy people that teaches computer security best practices.


## Installation Instructions

I've set up this application with the open source seed application accessible at https://github.com/angular/angular-seed. The benefits of using this seed application is that it sets up our web server and all of our folders for us and comes with a built in testing framework.

### Step 1
Run ```npm install```. The way the angular seed app is configured this command will run both ```npm install``` and ```bower install```.

### Step 2
Check to make sure the ```node_modules/``` folder was created at the root of your directory.

### Step 3
Look for the ```bower_components/``` folder under ```app/```. If for some reason the ```bower_components/``` ends up in the root of your directory, move it to ```app/bower_components```.

### Step 4
The web server should be ready to go! Run ```npm start``` to start the server. The app will be accessible at ```localhost:8000/index.html```.

If you get stuck at any point, check out the angular seed repo README!

## Setting up the database locally (for Mac)

0. (If you already have PostgreSQL installed or want to install it some other way, go ahead, but this an easy way.)

1. Install [Postgres.app](http://postgresapp.com/) either by clicking on that link and installing as usual, or if you have [Homebrew](https://brew.sh) do `brew update && brew cask install postgres`. 🎉

2. Open Postgres.app to start your Postgres server.

3. Go to the project directory in your command line and run ```. database/db-setup.sh``` Hopefully that works and gives you a little table of our names.

4. `npm install` to make sure you have all the up to date db modules.

5. Run the webserver (`npm start` etc.).

6. Try out [https://localhost:8000/api/dbtest/](https://localhost:8000/api/dbtest/). You should get some JSON.
