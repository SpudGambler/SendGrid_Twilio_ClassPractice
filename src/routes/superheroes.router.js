const express = require('express');
const SuperheroRouter = express.Router();
const SuperheroService = require('../services/superhero.service');
const SuperheroSchema = require('../models/superheroModel');
const service = new SuperheroService();

/* POST: http://localhost:5000/api/v1/superheroes/superhero */
SuperheroRouter.post('/superhero', async (req, res) => {
  const superhero = SuperheroSchema(req.body);
  await service
    .createSuperhero(superhero)
    .then((data) => res.status(201).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

/* GET:  http://localhost:5000/api/v1/superheroes*/
SuperheroRouter.get('/', async (req, res) => {
  await service
    .listSuperheroes()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

/* GET{:id}:  http://localhost:5000/api/v1/superheroes/superheroId */
SuperheroRouter.get('/:superheroId', async(req, res) => {
  const { superheroId } = req.params;
  await service
    .showSuperhero(superheroId)
    .then((data) => res.status(302).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

/* PUT{:id}: http://localhost:5000/api/v1/superheroes/superheroId */
SuperheroRouter.put('/:superheroId', async(req, res) => {
  const { superheroId } = req.params;
  const {
    superhero,
    real_name,
    feature = { universe, super_powers },
    superhero_sidekick = { sidekick, side_powers }
  } = req.body;
  await service
    .editSuperhero(superheroId, superhero, real_name, feature, superhero_sidekick)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(304).json({ message: err }));
});

/* DELETE{:id}: http://localhost:5000/api/v1/superheroes/superheroId */
SuperheroRouter.delete('/:superheroId', async(req, res) => {
  const { superheroId } = req.params;
  await service
    .removeSuperhero(superheroId)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(404).json({ message: err }));
});

module.exports = SuperheroRouter;
