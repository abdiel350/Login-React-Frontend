import React from 'react';
import { Fragment } from 'react';
import Dashboard from '../Dashboard/Dashboard';

function Home({setAuth}) {
  
  return (
    <Fragment>
    <Dashboard setAuth={setAuth}/>

    <div className='home'>
      <h1>Home</h1>     
    </div>
    </Fragment>
  );
}

export default Home;
