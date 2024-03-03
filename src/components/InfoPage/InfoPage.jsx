import React from 'react';
// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is
import './InfoPage.css'; // Import CSS file for styling

function InfoPage() {
  return (
    <div className="info-container">
      <h1 className="info-title">Welcome to Nature Nook</h1>
      <div className="info-section">
        <h3 className="info-subtitle">Getting Started</h3>
        <p>As you embark on your journey with Nature Nook, your virtual sanctuary awaits! Upon creating an account, you'll be transported to your very own nature nook.</p>
        <p>To enrich your Nature Nook experience with vibrant greenery, simply navigate to the "Add New Plant" option in the navigation bar. Alternatively, a convenient card on your homepage will swiftly guide you to the plant addition page.</p>
        <p>Embark on a journey through the verdant landscapes of fellow plant enthusiasts by exploring the "Search Users" feature. Behold the splendor of others' Nature Nooks!</p>
        <p>Engage in lively discussions and forge connections within our blossoming community through the "Message Board". Whether seeking advice on plant care or offering surplus soil, this is the place to be!</p>
      </div>
    </div>
  );
}

export default InfoPage;