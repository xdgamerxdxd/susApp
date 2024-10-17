const express = require('express');
const bcrypt = require('bcrypt');
const users = require('../models/users')
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const saltrounds = 10;
const rateLimiter = require('./limiter');

const router = express.Router();

router.post('/register', rateLimiter, async(req, res) => {
try {

    rateLimiter;

    const userData = req.body;
    const username = userData.username;
    const password = userData.password;

    const existingUser = await users.findOne({where: {username} });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }
  
    if (password.lenght < 8) {
        return res.status(400).json({message: 'Password must be atleast 8 characters long'})
    }

    bcrypt.hash(password, saltrounds, async (err, cryptPassword) => {
        if (err) {
            throw err; 
        }

        await users.create({
            username,
            password: cryptPassword
        });

        res.redirect('/login')
    });
} catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
}    
  
  });


router.post('/login', rateLimiter, async(req, res) => {
try{
    const userData = req.body;
    const username = userData.username;
    const password = userData.password;

    const user = await users.findOne({ where: { username } });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
            throw err;
        }

        if (result) {
            const getusername = jwt.sign({ username: user.username}, 'sussy');
            res.cookie('username', getusername, { httpOnly: true }, { secure: process.env.NODE_ENV === 'production'});
            res.redirect('/loggedin');
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    });
} catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
}

});

router.post('/reset', async (req, res) => {
try {
    const fetchResponse = await fetch('http://localhost:3000/username', {
        method: 'GET',
        headers: {
          'Cookie': req.headers.cookie 
        }
      });

      if (!fetchResponse.ok) {
        return res.status(fetchResponse.status).json({ error: 'Failed to authenticate user' });
      }

      const data = await fetchResponse.json();
      const username = data.username;
  
      const { oldpassword, newpassword } = req.body;
  
      if (!oldpassword || !newpassword) {
        return res.status(400).json({ error: 'Old password and new password are required' });
      }

      const user = await users.findOne({ where: { username: username }, attributes: ['password'] })
      if (!user) {
        console.log('User not found');
        return null;
      }

      bcrypt.compare(oldpassword, user.password, (err, result) => {
        if (err) {
            throw err;
        }

        if (result) {
            bcrypt.hash(newpassword, saltrounds, async (err, cryptPassword) => {
                if (err) {
                    throw err; 
                }
                await users.update(
                {
                    password: cryptPassword 
                },
                { where: {username: username} }
            );

            res.status(200).json({message: 'password changed successfuly'})
        });
    } else {
        res.status(401).json({ message: 'Incorrect password' });
    }
});

} catch (error) {
    console.error('Error in password reset process:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});


router.delete('/deleteSelf', async (req,res) => {
    try  {
        const username = req.cookies.username

        jwt.verify(username, 'sussy', (err, decoded) => {
            if (err) {
              return res.status(401).json({ error: 'Invalid token' });
            }
          });

        const user = jwt.decode(username).username;

        const existingUser = await users.findOne({ where: { username:user } });
        if (!existingUser) {
            return res.status(400).json({ message: 'Username does not exist' });
        }

        users.destroy({
            where: {username:user}
        })

        res.status(200).json({message: 'user deleted successfully'})


    } catch {
        console.error('Error in password reset process:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router;