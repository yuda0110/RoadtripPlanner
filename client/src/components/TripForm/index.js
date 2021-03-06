import React, { Component } from 'react';
import {FormBtn, Input, Select} from '../Form';
import API from '../../utils/API';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import '../Form/style.css';
import './style.css';


class TripForm extends Component {
  state = {
    tripId: '',
    tripName: '',
    origin: '',
    destination: '',
    numOfStops: 0,
    placesOfStops: [],
    budget: 1
  }

  componentDidMount() {
    const tripData = this.props.selectedTripData;
    console.log('tripData: ');
    console.log(tripData);
    if (tripData) {
      this.setState({
        tripId: tripData._id,
        tripName: tripData.tripName,
        origin: tripData.origin,
        destination: tripData.destination,
        numOfStops: tripData.stops.numberOfStops,
        placesOfStops: tripData.stops.placesOfStops,
        budget: tripData.budget
      })
    }
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    // If the number of stops become less than the length of this.state.placesOfStops,
    // it'll delete elements from this.state.placesOfStops
    // until it contains only the same number of places as this.state.numOfStops
    if (this.state.numOfStops !== prevState.numOfStops) {
      const newPlacesOfStops = this.state.placesOfStops;
      while (this.state.numOfStops < newPlacesOfStops.length) {
        newPlacesOfStops.pop();
        console.log(newPlacesOfStops);
      }
      this.setState({
        placesOfStops: newPlacesOfStops
      })
    }
  }

  renderStopLocationInputs = numOfStops => (
    <>
      {numOfStops ?
        this.stopIndexArr(numOfStops).map(num =>
          // <Input
          //   key={`stop${num}`}
          //   id={`stop${num}`}
          //   value={this.state.placesOfStops[num - 1]}
          //   onChange={this.handleAddStopPlaces}
          //   name={`stop${num}`} // if the name gets changed, it'll affect handleAddStopPlaces logic!!
          //   label={`Stop${num} Location`}
          //   placeholder="Enter your stop location."
          // />
          <div className="form-group">
            <label htmlFor={`stop${num}`} className="form-label">
              <ion-icon name="pin"></ion-icon>
              Stop {num}
            </label>
            <GooglePlacesAutocomplete
              key={`stop${num}`}
              onSelect={({ description: placeOfStop }) => { this.handleAddStopPlaces(placeOfStop, num) }}
              // onChange={this.handleAddStopPlaces}
              id={`stop${num}`}
              name={`stop${num}`}
              initialValue={this.state.placesOfStops[num - 1]}
              placeholder="Enter your stop location."
            />
          </div>
        ) : null
      }
    </>
  );

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleAddStopPlaces = (placeOfStop, num) => {
    const newPlacesOfStops = this.state.placesOfStops;
    const index = parseInt(num) - 1;
    newPlacesOfStops[index] = placeOfStop;

    this.setState({
      placesOfStops: newPlacesOfStops
    })
    console.log('this.state.placesOfStops: ');
    console.log(this.state.placesOfStops);
  }

  // handleAddStopPlaces = event => {
  //   const { name, value } = event.target;
  //   const newPlacesOfStops = this.state.placesOfStops;
  //   const index = parseInt(name.split('stop')[1]) - 1;
  //   newPlacesOfStops[index] = value;

  //   this.setState({
  //     placesOfStops: newPlacesOfStops
  //   })

  //   console.log('this.state.placesOfStops: ');
  //   console.log(this.state.placesOfStops);
  // }

  sendTripNotification = () => {
    API.getAllTripsByDestination(this.state.destination).then(res => {
      console.log('Client findAllTripsByDestination: ');
      console.log(res.data);

      const usersArr = [];

      res.data.forEach(data => {
        if (!usersArr.includes(data.userId)) {
          usersArr.push(data.userId);
        }
      })

      this.props.socket.emit("incoming data", {
        tripData: {
          tripName: this.state.tripName,
          destination: this.state.destination,
          numOfPlans: res.data.length,
          numOfUsers: usersArr.length
        }
      })
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    // if(!this.state.origin || !this.state.destination){
    //   alert("Please enter valid origin or destination.")
    // }

    if (this.props.formType === 'new') {
      API.saveTrip({
        tripName: this.state.tripName,
        origin: this.state.origin,
        destination: this.state.destination,
        stops: {
          numberOfStops: this.state.numOfStops,
          placesOfStops: this.state.placesOfStops
        },
        budget: this.state.budget,
        userId: this.props.userId
      })
        .then(res => {
          console.log(`"${this.state.tripName}" Trip saved!`);

          this.sendTripNotification();

          const savedTripIds = res.data.trips;
          // Tells react router to change url
          this.props.history.push(`/trip-plans/${savedTripIds[savedTripIds.length - 1]}`);
        })
        .catch(err => console.log(err));

    } else if (this.props.formType === 'edit') {
      API.updateTrip(this.state.tripId, {
        tripName: this.state.tripName,
        origin: this.state.origin,
        destination: this.state.destination,
        stops: {
          numberOfStops: this.state.numOfStops,
          placesOfStops: this.state.placesOfStops
        },
        budget: this.state.budget
      })
        .then(res => {
          console.log('Trip updated!');

          this.sendTripNotification();

          // Tells react router to change url
          this.props.history.push(`/trip-plans/${this.state.tripId}`);
        })
        .catch(err => console.log(err));
    }
  }

  stopIndexArr = num => {
    const indexArr = [];
    for (let i = 1; i <= num; i++ ) {
      indexArr.push(i);
    }
    return indexArr;
  }

  render() {
    const numOfStopsArr = [
      { optionVal: 0, textVal: 0 },
      { optionVal: 1, textVal: 1 },
      { optionVal: 2, textVal: 2 },
      { optionVal: 3, textVal: 3 },
    ];

    const budgetArr = [
      { optionVal: 1, textVal: '$' },
      { optionVal: 2, textVal: '$$' },
      { optionVal: 3, textVal: '$$$' },
    ];

    return (
      <form>
        <Input
          id="tripName"
          value={this.state.tripName}
          onChange={this.handleInputChange}
          name="tripName"
          label="Your Trip Name"
          placeholder="Enter your trip name."
          iconName="compass-outline"
        />
        {/* <Input
          id="origin"
          value={this.state.origin}
          onChange={this.handleInputChange}
          name="origin"
          label="Where are you departing from?"
          placeholder="Enter your starting point."
        /> */}
        <div className="form-group">
          <label htmlFor="origin" className="form-label">
            <ion-icon name="location"></ion-icon>
            Where are you departing from?
          </label>
          <GooglePlacesAutocomplete
            onSelect={({ description: origin }) => { this.setState( { origin })}}
            id="origin"
            name="origin"
            initialValue={this.state.origin}
            placeholder="Enter your starting point."
          />
        </div>
        {/* <Input
          id="destination"
          value={this.state.destination}
          onChange={this.handleInputChange}
          name="destination"
          label="Where are you looking to go?"
          placeholder="Enter your destination."
        /> */}
        <div className="form-group">
          <label htmlFor="destination" className="form-label">
            <ion-icon name="location"></ion-icon>
            Where are you looking to go?
          </label>
          <GooglePlacesAutocomplete
            onSelect={({ description: destination }) => { this.setState( { destination })}}
            id="destination"
            name="destination"
            initialValue={this.state.destination}
            placeholder="Enter your destination."
          />
        </div>
        <Select
          id="numOfStops"
          value={this.state.numOfStops}
          inputChangeHandler={this.handleInputChange}
          name="numOfStops"
          label="How many stops would you like to make?"
          optionVals={numOfStopsArr}
          iconName="pin"
        />
        {this.renderStopLocationInputs(this.state.numOfStops)}
        <Select
          id="budget"
          value={this.state.budget}
          inputChangeHandler={this.handleInputChange}
          name="budget"
          label="Budget?"
          optionVals={budgetArr}
          iconName="cash"
        />
        <FormBtn
          disabled={!this.state.origin || !this.state.destination || !this.state.tripName}
          onClick={this.handleFormSubmit}
        >
          Submit
        </FormBtn>
      </form>
    );
  }
}

export default TripForm;
