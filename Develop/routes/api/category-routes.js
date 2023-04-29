const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//http://localhost:3001/api/categories/
router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryRoutes = await Category.findAll({
     include: [{model: Product}] 
    });
    res.status(200).json(categoryRoutes);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products


});
//http://localhost:3001/api/categories/1

router.get('/:id', async (req, res) => {
  try {
    const categoryRoutes = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Product }]
    });

    if (!categoryRoutes) {
      res.status(404).json({ message: 'No location found with this id!' });
      return;
    }

    res.status(200).json(categoryRoutes);
  } catch (err) {
    res.status(500).json(err);
  }
});

//http://localhost:3001/api/categories/
router.post('/', async (req, res) => {
  try {
    const categoryRoutes = await Category.create(req.body);
    res.status(200).json(categoryRoutes);
  } catch (err) {
    res.status(400).json(err);
  }
});

//http://localhost:3001/api/categories/
router.put('/:id',  async (req, res) => {
  try {
    const categoryRoutes = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (!categoryRoutes[0]) {
      res.status(404).json({ message: 'No category with that id!' });
      return;
    }
    res.status(200).json(categoryRoutes);
  } catch (err) {
    res.status(500).json(err)
  }
});

//http://localhost:3001/api/categories/1
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
  const categoryRoutes = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!categoryRoutes[0]) {
      res.status(404).json({ message: 'No category with that id!' });
      return;
    }
    res.status(200).json(categoryRoutes);
  } catch (err) {
    res.status(500).json(err)
  }
  });

module.exports = router;


