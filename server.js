const app = require('express')();

app.get('/', (req, res) => res.send('This Bot is belong to Putra Ravi'));

module.exports = () => {
  app.listen(3000);
}