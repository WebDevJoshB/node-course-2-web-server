const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Welcome',
    welcomeMsg: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla est leo, posuere vel finibus eu, vehicula a massa. Donec imperdiet fringilla vulputate. Ut velit felis, sodales vitae gravida ac, vehicula tempus eros. Phasellus eget rhoncus ex, vel lacinia risus. Phasellus vestibulum sollicitudin elit, quis feugiat ligula faucibus eget. Proin porta porttitor aliquam. In eleifend diam sit amet libero feugiat, ut lacinia nibh pulvinar. Aliquam dignissim, purus viverra dictum pretium, quam felis imperdiet nunc, facilisis finibus tortor est quis neque. Proin suscipit, mauris et luctus tincidunt, mauris felis congue odio, in bibendum augue metus vitae erat. Nam congue congue auctor.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request.'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});