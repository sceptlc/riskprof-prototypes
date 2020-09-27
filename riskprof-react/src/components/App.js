import React from 'react';
import Ratings from './Ratings';
import CreateOrEditRating from './CreateOrEditRating';
import '../styles/App.scss';


class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <Ratings/>
                </div>
            </div>
        );
    }
}

export default App;
