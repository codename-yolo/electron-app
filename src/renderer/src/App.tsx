import React from 'react';

const App: React.FC = () => {
  const sendMessage = () => {
    console.log(window.electron.send('show-notification', 'Hello from React!'));
  };

  return (
    <div>
      <h1>Hello Electron with React and TypeScript!</h1>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default App;
