import mongoose from 'mongoose';
import { User } from './models/user.model.js';
import { Product } from './models/product.model.js';

const uri = 'mongodb://localhost:27017';

mongoose.connect(uri, {
  user: 'root',
  pass: 'nodegmp',
  dbName: 'layered-arch-nosql',
});

User.create({})
  .then((createdUser) => {
    console.log('User created:', createdUser.id);
    return Product.create([
      {
        title: 'Product 1',
        description: 'Description 1',
        price: 10,
      },
      {
        title: 'Product 2',
        description: 'Description 2',
        price: 20,
      },
      {
        title: 'Product 3',
        description: 'Description 3',
        price: 30,
      },
    ]);
  })
  .then((createdProducts) => {
    console.log('Products created:', createdProducts);
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error('Error creating documents:', error);
    mongoose.disconnect();
  });
