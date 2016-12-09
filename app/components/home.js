import React from 'react';

const Home = React.createClass({
  render: function() {
    return (
      <div className="home-page">
      	<div className="row">
      		<div className="col-md-6 col-md-offset-1">
        		<h1 className="home-title">Similario</h1>
        		<h4 className="home-desc">Теперь найти похожих исполнителей к любимым артистам стало легче.</h4>
        					
        	</div>
        	<div className="col-md-3">
        		<img src="/images/icon_main.svg"/>

        	</div>
        </div>
      </div>
    );
  }
});

export default Home;
