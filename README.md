# Roadtrip Planner

### Overview
This MERN application is a roadtrip planner where the user can enter their desired trips name, origin, destination, and stopover points 
which the google maps Directions API will use to calculate and display your road trip. 

We also used the google maps distance matrix API to calculate the distance and duration of the users trip.

Based off your journey's desired stopover points, we utilize the YELP API to show you the highest rated restaurants at the area of your stop that fit your budget.

Our App uses socket.io to notify you when another user has planned a trip to your destination so you can hitch a ride.

The Google Places API is used to give the user access to all address and cities in the google library.


### Links
- [Link to the page](https://yuko-roadtrip-planner.herokuapp.com/)
- [Link to the code](https://github.com/yuda0110/RoadtripPlanner)


### Tech/framework used

- JavaScript
- Node.js
- [Create React App](https://github.com/facebook/create-react-app)
- [React Router Dom](https://www.npmjs.com/package/react-router-dom)
- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [axios](https://www.npmjs.com/package/axios)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [socket.io-client](https://www.npmjs.com/package/socket.io-client)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [react-google-maps](https://www.npmjs.com/package/react-google-maps)
- [react-google-places-autocomplete](https://www.npmjs.com/package/react-google-places-autocomplete)
- [nodemon](https://www.npmjs.com/package/nodemon)


### API reference
- [Google Maps Directions API](https://developers.google.com/maps/documentation/javascript/directions)
- [Google Maps Distance Matrix API](https://developers.google.com/maps/documentation/javascript/distancematrix)
- [Google Places API](https://developers.google.com/places/web-service/overview)
- [Yelp Fusion API](https://www.yelp.com/developers/documentation/v3/get_started)


### Demo
##### Home Page
![Roadtrip Planner - Home Page](./assets/images/roadtrip1.gif)

##### Trip Plan Detail Page
![Roadtrip Planner - Trip Plan Detail Page](./assets/images/roadtrip2.gif)

##### Once your trip is submitted, it is saved in your "Saved Trips" tab where you can view, edit, or delete your previous trips.
![Roadtrip Planner - Trip Plan Detail Page](./assets/images/roadtrip3.gif)

# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.
