import React from 'react';

// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="container">
      <h1>Nature Nook Info</h1>
      <h3>Getting Started</h3>
      <p>When you first create an account you'll be brought to your nature nook.</p>
      <p>To fill your Nature Nook with your beautiful plants you'll want to click on Add New Plant.</p>
    </div>
  );
}

export default InfoPage;
