# yelpcamp
Yelp Camp
A Node. js Web Application

Demo



Installation
Make sure you have these things installed

Node

MongoDB

MLab (Alternative to downloading MongoDB locally) see the docs


npm install
this will install all the necessary packages that you need to run the application.

I've used dot.env to store the environment variable, So you need to create a .evn file once you clone or download the repo.

paste below code into that file

# if you're using MLAB replace variable with your MLAB url
DATABASEURL = mongodb://localhost:27017/[your_database_name]
Application Feature
Authentication

Users can sign up or login using username and password.

User can not submit campgrounds if they are not logged in.

Authorization

User can only modify campgrounds created by them.
User Profile

Every registered user has profile where all his submitted campgrounds are shown.
Basic Functionality

Add Name, Image and Description to the campground.

Create, Update, Delete the Campground.

Add comments to campgrounds.

Flash Important messages to warn or gree the users.

Responsive Web design.

Built with
Front end
Bootstrap 4.0

ejs

Back End
Node. js

Express. js

MongoDB

mLAB

mongoose

passport

passport-local

express-session

method-override

connect-flash

dotenv

body-parser

connect-mongo

Text Editor
Visual Studio Code I'm in love with this :P

See how to use Emmet in VSCode. This CheatSheet might be helpful.

Change default shell in VSCode to git bash if you're using windows and know some Linux commands. Don't know how to do it? See here

I'll be adding features as I learn more.

A Big Thanks to Colt Steele for all the knowledge.

developer: Abhisek Dey
