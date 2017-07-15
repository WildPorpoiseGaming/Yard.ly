import React from 'react'
import WorkerList from './workerList.jsx'

const HomePage = ( { workers } ) =>
  (<div>
    <div id="bg">
      <img src="http://hires.photospublic.com/PP13561214-Beautiful-green-Lawn-viewed-from-human-perspective.jpg" alt="" />
    </div>
    <div className="home-page-container">
      <h1>things</h1>
      <div className="col-lg-6">
        <div className="input-group landing-search">
          <input type="text" className="form-control" placeholder="Find workers in your area" />
          <span className="input-group-btn">
            <button className="btn btn-default" type="button">Go!</button>
          </span>
        </div>
      </div>
      <WorkerList workers={workers}/>
    </div>
  </div>)

export default HomePage
