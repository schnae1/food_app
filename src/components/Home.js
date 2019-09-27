import React from 'react';
import axios from 'axios';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            location: '',
            distance: '',
            result: '',
            business: '',
        };
        this.handleLocation = this.handleLocation.bind(this);
        this.handleDistance = this.handleDistance.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    async getRestaurants() {

        let dist = 0;
        if(this.state.distance >= 25){
            dist = 40000;
        } else {
            dist = this.state.distance * 1609;
        }


        const resp = 
        await axios.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search", {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
         },
            params: {
              location: this.state.location,
              radius: dist,
              categories: 'restaurants',
         }});

        this.setState({ result: resp, business: resp.data.businesses[0]['name'] });

        console.log(resp.data.total);
        for(let i = 0; i < resp.data.businesses.length; i++){
            console.log(resp.data.businesses[i]['name']);
        }

        this.setState({ total: 0, location: '', distance: '' });
         
    }

    handleLocation(event) {
        this.setState({
            location: event.target.value
        });
    }

    handleDistance(event) {
        this.setState({
            distance: event.target.value
        });
    }

    handleClick() {
        this.getRestaurants();
    }

    render() {
        return (
            <div id="h-container">
                <h1>Home</h1>
                <input type="text" placeholder="Your Current Location" value={this.state.location} onChange={this.handleLocation} />
                <input type="text" placeholder="Search Radius in Miles" value={this.state.distance} onChange={this.handleDistance} />
                <button onClick={this.handleClick}>Find</button>
                <p>{this.state.business}</p>
            </div>
        );
    }
}

export default HomePage;