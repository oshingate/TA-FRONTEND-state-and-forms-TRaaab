import React from 'react';
import { render } from 'react-dom';
import { products } from '../data.json';
import _ from 'lodash';
import Header from './Header';
import Aside from './Aside';

class Shopping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrOfItems: products,
      arrOfSize: _.uniq(
        _.flattenDeep(products.map((ele) => ele.availableSizes))
      ),
      productNo: products.length,
      sortBy: 'normal',
      cart: {
        items: [
          {
            availableSizes: ['S', 'XS'],
            currencyFormat: '$',
            currencyId: 'USD',
            description: '4 MSL',
            id: 12,
            installments: 9,
            isFreeShipping: true,
            price: 10.9,
            sku: 12064273040195392,
            style: 'Black with custom print',
            title: 'Cat Tee Black T-Shirt',
          },
        ],
        total: 10.9,
      },
      sizeToSort: 'all',
      toggleCart: false,
      activeSize: '',
    };
  }

  //handle sort by size
  handleSortBySize = (event, size) => {
    console.log('clicked', size);
    let newArr = products.filter((ele) => {
      if (ele.availableSizes.includes(size)) {
        return true;
      } else {
        return false;
      }
    });
    console.log('newArr', newArr);
    this.setState({
      arrOfItems: newArr,
      productNo: newArr.length,
      sizeToSort: size,
      activeSize: size,
    });
  };

  //handle sort by MRP

  handleSortByMRP = ({ target }) => {
    let newArrFor = [];
    switch (target.value) {
      case 'normal':
        let size = this.state.sizeToSort;
        let newArr = products.filter((ele) => {
          if (ele.availableSizes.includes(size)) {
            return true;
          } else {
            return false;
          }
        });
        this.setState({
          arrOfItems: newArr,
          productNo: newArr.length,
          sizeToSort: size,
        });

        break;

      case 'asc':
        newArrFor = [...this.state.arrOfItems];
        newArrFor.sort(function (a, b) {
          return a.price - b.price;
        });
        this.setState({ arrOfItems: newArrFor, productNo: newArrFor.length });
        break;

      case 'desc':
        newArrFor = [...this.state.arrOfItems];
        newArrFor.sort(function (a, b) {
          return b.price - a.price;
        });
        this.setState({ arrOfItems: newArrFor, productNo: newArrFor.length });
        break;

      default:
        break;
    }
  };

  //handle add to cart

  handleAddToCart = (event, product) => {
    if (this.state.cart.items.includes(product)) {
      alert('item already exist in cart');
    } else {
      let newArr = this.state.cart.items;
      newArr.push(product);
      let total = newArr.reduce((acc, cv) => {
        acc = acc + cv.price;
        return acc;
      }, 0);
      this.setState({
        cart: {
          items: newArr,
          total: total,
        },
      });
      alert(`item "${product.title} " added to cart successfully`);
    }
  };

  //hadnle cart close

  handleCartClose = (event) => {
    this.setState({ toggleCart: !this.state.toggleCart });
  };

  render() {
    return (
      <div>
        <Header data={this.state} />
        <main className=''>
          <Aside data={this.state} handleSortBySize={this.handleSortBySize} />
          <section className='main-sec '>
            <section className='hero-sec'>
              <div className='flex container jsb aic'>
                <h4>{this.state.productNo} Products found</h4>
                <div className='flex center'>
                  <h4>Order By </h4>
                  <select
                    onChange={(event) => {
                      this.handleSortByMRP(event);
                    }}
                  >
                    <option value='normal'>Normal</option>
                    <option value='desc'>Highest to Lowest</option>
                    <option value='asc'>Lowest to Highest</option>
                  </select>
                </div>
              </div>
            </section>

            <section className='card-sec sec-padding'>
              <div className='container card-div flex fw'>
                {this.state.arrOfItems.map((ele) => {
                  return (
                    <article key={ele.id} className='card flex-25'>
                      <div className='card__img-div'>
                        <img
                          className='flexi-img'
                          src={'/static/products/' + ele.sku + '_1.jpg'}
                          alt={'cardimg'}
                        />
                        <span>Free shipping</span>
                      </div>
                      <h3>{ele.title}</h3>
                      <div className='card__line'></div>
                      <h4>{ele.currencyFormat + ' ' + ele.price}</h4>
                      <div className='flex center'>
                        <a
                          href='#'
                          className='btn-pri'
                          onClick={(event) => {
                            this.handleAddToCart(event, ele);
                          }}
                        >
                          Add to cart
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
            <section
              className={
                this.state.toggleCart ? 'cart-sec' : 'cart-sec disable'
              }
            >
              <div className='cart-header flex jsb'>
                <div>
                  <a
                    href='#'
                    className='cart-logo'
                    onClick={this.handleCartClose}
                  >
                    <i className='fas fa-shopping-cart'></i>
                    {this.state.cart.items.length === 0 ? (
                      ''
                    ) : (
                      <span>{this.state.cart.items.length}</span>
                    )}
                  </a>
                </div>
                <a href='#' className='close' onClick={this.handleCartClose}>
                  X
                </a>
              </div>
            </section>
          </section>
        </main>
      </div>
    );
  }
}

export default Shopping;
