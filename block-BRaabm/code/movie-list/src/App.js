/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import React from 'react';
import data from './data.json';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAside: true,
    };
  }

  handleHide = () => {
    this.setState({
      showAside: !this.state.showAside,
    });
  };

  handleHover = (event) => {
    console.log('hovered in', event.target);
  };

  render() {
    return (
      <section className='flex main-sec '>
        {this.state.showAside ? (
          <div className='flex-20 '>
            {/* aside sec */}
            <section className='aside-sec'>
              <div className='aside-div '>
                <ul className='nav-div'>
                  <li>
                    {' '}
                    <a href='#' className='btn btn-pri'>
                      Home
                    </a>
                  </li>
                  <li>
                    <a href='#' className='btn btn-pri'>
                      About
                    </a>
                  </li>
                  <li>
                    <a href='#' className='btn btn-pri'>
                      Contact
                    </a>
                  </li>
                </ul>
                <div>
                  <a
                    href='#'
                    onClick={() => {
                      this.handleHide();
                    }}
                    className='btn btn-sec'
                  >
                    Hide
                  </a>
                </div>
              </div>
            </section>
          </div>
        ) : (
          ''
        )}
        {/* main sec */}
        <div className={this.state.showAside ? 'flex-80' : 'flex-100'}>
          <section className='main-sec'>
            {this.state.showAside ? (
              ''
            ) : (
              <a
                onClick={() => {
                  this.handleHide();
                }}
                className=' aside-btn'
              >
                <i class='fas fa-chevron-right'></i>
              </a>
            )}

            <div className='container'>
              <ul className='card-div'>
                {console.log(data)}
                {data.map((ele, i) => {
                  return (
                    <li
                      className='card'
                      key={ele.imdbID}
                      onClick={(event) => this.handleHover(event)}
                    >
                      <div className='card-img-div'>
                        <img src={ele.Images[0]} />
                      </div>
                      <h3>{ele.Title}</h3>
                      <span>{ele.Released}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>
      </section>
    );
  }
}

export default App;
