const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/inote')
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Try to find all users
    try {
      const users = await User.find();
      console.log('Users in database:', users);
      
      // Try to create a test user if no users exist
      if (users.length === 0) {
        console.log('No users found, creating a test user...');
        const testUser = new User({
          name: 'Test User',
          email: 'test@example.com',
          password: 'test123'
        });
        await testUser.save();
        console.log('Test user created');
      }
    } catch (err) {
      console.error('Error querying users:', err);
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Connection error:', err);
    process.exit(1);
  });
