const { User } = require('../model/user');
const { Product } = require('../model/product');
const Order = require('../model/order');

const resolvers = {
    users: () => {
        return User.find()
            .then( users => {return users} )
            .catch( err => { throw err })
    },
    addUser: (data) => {
        const user = new User({
            name: data.name,
            email: data.email,
            password: data.password
        });

        return user.save()
            .then( result => {
                return result;
            })
            .catch( err => {
                console.error(err);
                throw err;
            })
    },
    deleteUser: (data) => {
        return User.deleteOne({_id: data.id})
            .then( () => {
                return true;
            })
            .catch( err => {
                console.error(err);
                throw err;
            })
    },
    updateUser: (data) => {
      return User.find({
          "_id": data.id
      })
      .then( users => {
          // check if exists user by id
          if ( users.length > 0 ) {
              users[0].name = data.name;
              users[0].email = data.email;
              users[0].password = data.password;

              return users[0].save().then( result => {
                  return result;
              });

          } else {
              // not user found
              return null;
          }
      })
      .catch( err => {
          console.log(err);
          throw err;
      })
    },

    products: () => {
        return Product.find()
            .then( products => {return products} )
            .catch( err => { throw err })
    },
    addProduct: (data) => {
        const product = new Product({
            name: data.name,
            stock: data.stock,
            price: data.price
        });

        return product.save()
            .then( result => {
                return result;
            })
            .catch( err => {
                console.error(err);
                throw err;
            })
    },
    deleteProduct: (data) => {
        return Product.deleteOne({_id: data.id})
            .then( () => {
                return true;
            })
            .catch( err => {
                console.error(err);
                throw err;
            })
    },
    updateProduct: (data) => {
        return Product.find({
            "_id": data.id
        })
            .then( products => {
                // check if exists product by id
                if ( products.length > 0 ) {
                    products[0].name = data.name;
                    products[0].stock = data.stock;
                    products[0].price = data.price;

                    return products[0].save().then( result => {
                        return result;
                    });

                } else {
                    // not product found
                    return null;
                }
            })
            .catch( err => {
                console.log(err);
                throw err;
            })
    },

    newOrder: (data) => {
        User.find({
            name: data.userName
        }).then( users => {
            if ( users.length > 0 ) { // user found
                Product.find().then( products => {
                    let i, j;
                    let lenProductsLine = data.productsLine.length;
                    let lenProducts = products.length;
                    let productsStock = true;

                    for (i = 0; i < lenProductsLine && productsStock; i++) {
                        for (j = 0; j < lenProducts && productsStock; j++) {
                            if (data.productsLine[i].product.name === products[j].name ) {
                                if ( data.productsLine[i].quantity > products[j].stock ) {
                                    productsStock = false;
                                } else {
                                    // update stock
                                    products[j].stock = products[j].stock - data.productsLine[i].quantity;
                                    products[j].save();
                                }
                            }
                        }
                    }

                    if ( productsStock ) {
                        // new order
                        const order = new Order({
                            user: users[0],
                            product: data.productsLine
                        });

                        return order.save()
                            .then( result => {
                                return result;
                            })
                            .catch( err => {
                                console.error(err);
                                throw err;
                            })
                    }
                })
            }
        })
    },
    ordersByCustomer: (data) => {
        return User.find({
            name: data.userName
        })
        .then( users => {
            if ( users.length > 0 ) {
                return Order.find({
                    user: users[0]
                })
                .then( orders => {return orders} )
                .catch( err => { throw err })
            }
        })
    },
    productsByOrder: (data) => {
        let productsList = [];
        return Order.find({
            _id: data.id
        })
        .then ( orders => {
            if ( orders.length > 0 ) {
                const products = orders[0].product;
                for ( let i = 0; i < products.length; i++ ) {
                    productsList.push(products[i].product.name);
                }
                return productsList;
            }
        })
    }
}

module.exports = resolvers;