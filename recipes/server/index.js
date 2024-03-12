const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3002; // i accidentally screwed up port 3001 and decided to use 3002 (didn't restart 3001), but you can switch it back to 3001 when you want to test it
const path = require('path');

app.use(bodyParser.json());

// mock data for initial recipes
let recipes = [
  { id: 1, title: 'Halal Guys Chicken and Rice', description: 'A delicious street food dish from NYC.', imageSrc: 'img/food/chickenandrice.jpg', url: '/recipe1'},
  { id: 2, title: 'Guacamole', description: 'A traditional Mexican dip.', imageSrc: 'img/food/guac.jpg', url: '/recipe2' },
  { id: 3, title: 'Pasta with Pesto', description: 'A classic Italian dish.', imageSrc: 'img/food/pesto.jpg', url: '/recipe3'},
  { id: 4, title: 'Nigerian Meat Pies', description: 'Savory pastry snacks filled with seasoned minced meat.', imageSrc: 'img/food/nigerian_meatpie.jpg', url: '/recipe4' },
  { id: 5, title: 'Chocolate Chip Cookies', description: 'A classic chocolatey sweet indulgence.', imageSrc: 'img/food/choc_chip_cookies.jpg', url: '/recipe5' },
  { id: 6, title: 'Creole Jambalaya', description: 'A soulful and savory dish deeply rooted in Louisiana\'s culinary culture.', imageSrc: 'img/food/jambalaya.jpg', url: '/recipe6' },
  { id: 7, title: 'Soup Dumplings', description: 'A revered Chinese delicacy.', imageSrc: 'img/food/soup_dumplings.jpg', url: '/recipe7'},
  { id: 8, title: 'Pho', description: 'A beloved Vietnamese dish.', imageSrc: 'img/food/pho.jpg', url: '/recipe8'},
];

// endpoint to get all recipes
app.get('/api/recipes', (req, res) => {
  res.json(recipes);
});

// endpoint to add a new recipe
app.post('/api/recipes', (req, res) => {
  const newRecipe = req.body;

  // validate that the received data is a valid recipe
  if (!newRecipe || !newRecipe.title || !newRecipe.description) {
    return res.status(400).json({ error: 'Invalid recipe data' });
  }

  // add the new recipe to the list
  newRecipe.id = recipes.length + 1;
  recipes.push(newRecipe);

  res.status(201).json(newRecipe);
});

// endpoint to delete a recipe by ID
app.delete('/api/recipes/:id', (req, res) => {
  const recipeId = parseInt(req.params.id);

  // find the index of the recipe with the specified ID
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === recipeId);

  // check if the recipe exists
  if (recipeIndex === -1) {
    return res.status(404).json({ error: 'Recipe not found' });
  }

  // remove the recipe from the array
  recipes.splice(recipeIndex, 1);

  res.json({ message: 'Recipe deleted successfully' });
});

// serve static files (React app) from the build directory
app.use(express.static(path.join(__dirname,'..','build')));

// serve static image files from the public directory
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = server