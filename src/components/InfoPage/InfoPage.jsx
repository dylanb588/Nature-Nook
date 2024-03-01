import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <h1>Nature Nook Getting Started</h1>
      <h3>Getting Started</h3>
      <p>When you first create an account you'll be brought to your nature nook.</p>
      <p>To fill your Nature Nook with your beautiful plants you'll want to click on Add New Plant in the nav bar. There will also be a starting card on your home page that brings you right to add plant page</p>
      <p>To foster a commuinty of plant lovers if you navigate to the Search Users youll be able to see other's beautiful Nature Nook's</p>
      <p>Under the Message Board users can connect with eachother. Try posting about plant care questions or need to get rid of extra soil post it there!</p>
    </div>
  );
}

export default InfoPage;
