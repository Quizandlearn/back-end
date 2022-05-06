const Category = require('../models/category');

exports.getCategories = async (req, res, next) => {
    const categories = await (await Category.find()).map((cat => cat.title))
    if (categories) {
        res.status(200).send({ categories: categories });
    } else {
        res.status(400).send({ message: 'Catégories non trouvées' });
      }
}
  