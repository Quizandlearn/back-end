const Category = require('../models/category');

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  if (categories) {
    res.status(200).send({ categories });
  } else {
    res.status(400).send({ message: 'Catégories non trouvées' });
  }
};
