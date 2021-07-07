/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
class Aside extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleHide = () => {
    this.setState({
      showAside: false,
    });
  };
  render() {
    return (
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
      </section>
    );
  }
}

export default Aside;
