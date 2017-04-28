# ClubSecurity

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
