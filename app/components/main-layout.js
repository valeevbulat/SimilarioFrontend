import React from 'react';
import { Link } from 'react-router';


const MainLayout = React.createClass({
  render: function() {
    return (
       <div className="home">
          <nav className="navbar navbar-inverse">
              <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li><a href="#">Главная</a></li>
                </ul>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                  <ul className="nav navbar-nav navbar-right">
                     <li><Link to="/login" activeClassName="active ">Авторизация</Link></li>
                     <li><Link to="/songs" activeClassName="active">Аудиозаписи</Link></li>
                  </ul>
                </div>
              </div>
          </nav>
          <div className="container">
              <main>
                      {this.props.children}
              </main>

          </div>
        </div>
     );
  }
});

export default MainLayout;





