import React from 'react';
import './spinner.css'; // Make sure to create this CSS file
// import spinnerImage from '../images/dog_loding.gif'; // Adjust the path to your spinner image
import spinnerImage from '../images/dog_loader.gif'

const Spinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="spinner-container">
                <img src={spinnerImage} alt="Loading..." />
            </div>
        </div>
    );
};

export default Spinner;
