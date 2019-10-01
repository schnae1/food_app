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
            page: 0
        };
        this.handleLocation = this.handleLocation.bind(this);
        this.handleDistance = this.handleDistance.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
    }

    async getRestaurants(nextPage) {

        let offset;
        let pageNum = this.state.page;
        let dist = 0;

        if(this.state.distance >= 25){
            dist = 40000;
        } else {
            dist = this.state.distance * 1609;
        }

        if(!nextPage) {
            offset = this.state.page - 2;
        } else {
            offset = this.state.page;
        }


        const resp = 
        await axios.get("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search", {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
         },
            params: {
              location: this.state.location,
              radius: dist,
              term: 'unique restaurants',
              categories: 'restaurants',
              offset: (offset * 20)
         }});

        this.setState({ 
            result: resp, 
            loading: false, 
            total: resp.data.total,
            page: nextPage ? (pageNum + 1) : (pageNum - 1),
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
        this.setState({ loading: true, page: 0 }, () => this.getRestaurants(true));
    }

    handlePagination(nextPage) {
        this.setState({ loading: true });
        if(nextPage) {
            this.getRestaurants(nextPage);
        } else {
            this.getRestaurants(false);
        }
    }

    render() {
        let results;
        let pagination;

        if( !this.state.loading  && this.state.page > 0) {
            pagination = <Pagination page={this.state.page} handleClick={this.handlePagination} total={this.state.total}/>;
        } else {
            pagination = null;
        }

        if(this.state.loading){
            results = <Loading />;
        } else {
            results = <Restaurants rest={this.state.result} />;
        }

        return (
            <div id="home-container">
                <div id="header">
                    <p id="title">Foodies</p>
                    <div id="user-input">
                        <input className="input-box" type="text" placeholder="Your Current Location" value={this.state.location} onChange={this.handleLocation} />
                        <input className="input-box" type="text" placeholder="Search Radius in Miles" value={this.state.distance} onChange={this.handleDistance} />
                        <button id="find-button" onClick={this.handleClick}>Find</button>
                    </div>   
                </div>

                <div id="display-rest">
                    {results}
                </div>
                {pagination}
            </div>
        );
    }
}

const Restaurants = (props) => {
    if(props.rest !== ''){
        const restaurants = props.rest.data.businesses;
        const displayItems = restaurants.map((rest) =>
            <a key={rest.id} href={rest.url}>
                <div className="rest-card">
                    <h3>{rest['name']}</h3>
                    <div id="img-box">
                        <img className="card-img" src={rest['image_url']} alt="Restaurant Image" />
                    </div>
                </div>
            </a>
        );
        return displayItems;
    } else {
        return (
            <h2 id="search-text">Search For Unique Restaurants</h2>
        );
    }
    
}

const Loading = () => {
    return (
        <ReactLoading id="loading" type="spinningBubbles" color="black" height={'10%'} width={'10%'}/>
    );
}

const Pagination = (props) => {
    let prevbtn;
    let nextbtn;

    if(props.page > 1){
        prevbtn = <button onClick={() => props.handleClick(false)} id="prevbtn">Previous</button>;
    } else {
        prevbtn = null;
    }

    if(props.total > props.page * 20) {
        nextbtn = <button onClick={() => props.handleClick(true)} id="nextbtn">Next</button>;
    } else {
        nextbtn = null;
    }

    return (
        <div id="pagebtngroup">
            {prevbtn}
            {nextbtn}
        </div>
        
    );
}

export default HomePage;