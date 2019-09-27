import React from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import '../styles/Home.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            total: 0,
            location: '',
            distance: '',
            result: '',
            offset: 0,
            page: 1
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
              offset: this.state.offset
         }});

        //console.log(resp);

        this.setState({ 
            result: resp, 
            loading: false, 
            total: resp.data.total
        });
         
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
        this.setState({ loading: true });
        this.getRestaurants();
    }

    render() {
        let results;

        if(this.state.loading){
            results = <Loading />;
        } else {
            results = <Restaurants rest={this.state.result} />;
        }

        return (
            <div id="home-container">
                <div id="header">
                    <h1>Foodies</h1>
                    <div id="user-input">
                        <input type="text" placeholder="Your Current Location" value={this.state.location} onChange={this.handleLocation} />
                        <input type="text" placeholder="Search Radius in Miles" value={this.state.distance} onChange={this.handleDistance} />
                        <button onClick={this.handleClick}>Find</button>
                    </div>
                    
                </div>
                <div id="display-rest">
                    {results}
                </div>
            </div>
        );
    }
}

const Restaurants = (props) => {
    if(props.rest !== ''){
        const restaurants = props.rest.data.businesses;
        const displayItems = restaurants.map((rest) =>
            <a href={rest.url}>
                <div key={rest.id} className="rest-card">
                    <h3>{rest['name']}</h3>
                    <img className="card-img" src={rest['image_url']} alt="Restaurant Image" />
                </div>
            </a>
        );
        return displayItems;
    } else {
        return (
            <div className="rest-card">
                <h2>Search For Restaurants</h2>
            </div>
        );
    }
    
}

const Loading = () => {
    return (
        <ReactLoading type="spinningBubbles" color="blue" />
    );
}

export default HomePage;