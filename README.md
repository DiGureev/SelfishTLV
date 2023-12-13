# SelfishTLV 

SelfishTLV is a website for Olims and anyone who wants to get to know our beautiful Tel-Aviv. I am in love with the city and want to share it with others. The main thing of the project is pre-built routes with interactive Google map and suggestions where to grab a coffee and where to eat along the way. 

## Stack
* React
* Node.js
* Python
* Elephant SQL
* Google map API + Google Map react module
* JWT module for the Authentication

I built a full stack JS APP with some help from Python. API built with Node.js, all front-end part - with React.

## App details

Database contains 5 tables: users, tours, favorites, likes and allevents.
After user login, I create accesstoken and refreshtoken and put the refreshtoken to the users table and store in localStorage encrypted (bcrypt).

*I am using localstorage instead of cookies. It's because I had a problem with using cookies on my localhost for some reason, but I had to test the JWS somehow.* 

For allevents I scrape two websites with events in Tel-Aviv using Python and beautiful soup 4. See the code [in this repo](https://github.com/DiGureev/Hackathon-Python). Then I put the clean data into the database and fetch it from the API.

## Features
* On the main page we have the tour of the day, which is randomly selected from the database.
* We can filter the events for today, tomorrow or this week.
* Self-tour page contains all the tours we have in the database. I implemented pages with four tours in each page to not send too many requests in the database at once.
* Tour page has interactive Google Map with markers, user can build destination from one marker to another.
* User can like or dislike the tour and put it into favorite.
* User has a profile page with all favorite tours.
* To see the profile page, like a tour and add it to favorite, you must be logged in and authorized.
* Once you log out app will clean cookies, headers, localStorage.




