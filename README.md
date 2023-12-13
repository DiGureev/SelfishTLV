# SelfishTLV 

SelfishTLV is a website for new olims and everyone who wants to get to know our beautiful Tel-Aviv. I am inlove with the city and want to share it with others. The main thing of the project is pre-built routes with interactive Google Map and suggestions where to grab coffe along the way and where to eat. 

## Stack
* React
* Node.js
* Python
* Elephant SQL
* Google map API + Google Map react module
* JWT module for the Authentication

I made a Full-Stack JS APP with some help from Python. API has built with Node.js, all front-end part - with React.

## App details

Data Base containes 5 tables: users, tours, favorites, likes and allevents.
After user log in I create accesstoken and refreshtoken and put the refreshtoken to the users table and store in in the localStorage encrypted (bcrypt).

*I use localstorage instead of cookies. It's because I had a problem with use cookies on my localhost for some reason, but I had to test the JWS somehow.* 

For allevents I scrape two websites with events in Tel-Aviv using Python and beautiful soup 4. See the code [in this repo](https://github.com/DiGureev/Hackathon-Python). Then I put the clean data into database and fetch it from the API.

## Features
* On main page we have Tour of the day which fatching randomly from the data base.
* We can filter the events for today, tomorrow or this week.
* Self-tour page contains all the tours we have in the data base. I implemented pages, with four tour in each page for not to send too many requests in the data base at once.
* Tour page has interactive Google Map with markers, user can build destination from one marker to another.
* User can like of unlike the tour and put it into favorite.
* User has a profile page with all favorites tours.
* To see profile page, like tour and add it to favorite you have to be logged in and authorized.
* Once you logged out App clean cookies, headers, localStorage.




