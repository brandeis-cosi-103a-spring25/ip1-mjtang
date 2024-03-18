const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3002;

const recipeRoute = require('./routes/Recipes');
const reactAppRouter = require('./routes/ReactApp');
app.use('/api/recipes', recipeRoute);
app.use(reactAppRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server