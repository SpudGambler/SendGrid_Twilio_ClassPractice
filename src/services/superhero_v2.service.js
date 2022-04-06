const SuperheroModel = require('../models/superhero_v2.model');
const Boom = require('@hapi/boom');

class SuperheroService {
  /* Promesas y funciones asincronicas
  Una funcion asincronica devuelve una promesa
  JS es un lenguaje subproceso (que solo ejecuta un hilo) -> solo hace una cosa a la vez */
  async createSuperhero(superheroV2) {
    superheroV2.save();
    return superheroV2;
    /* const superhero = SuperheroModel.findOne({ _superhero: superheroV2.superhero});
    if (superhero) throw Boom.notFound(superhero);
    superheroV2.save();
    return superheroV2; */
  }

  /* Funcion que nos devuelve una promesa */
  find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SuperheroModel.find());
      }, 3000);
    });
  }

  async listSuperheroes() {
    return SuperheroModel.find();
  }

  async showSuperhero(superheroId) {
    return SuperheroModel.findById({ _id: superheroId }).then(
      (superheroFind) => {
        if (!superheroFind) throw Boom.notFound('No se encontró el superheroe');
        return superheroFind;
      }
    );

    /* const superhero = SuperheroModel.findById({ _id: superheroId });
    if (!superhero) throw Boom.notFound('No se encontró el superheroe');
    return superhero; */
  }

  async editSuperhero(superheroId, superhero, realname, superpower) {
    return SuperheroModel.findByIdAndUpdate(
      { _id: superheroId },
      { superhero, realname, superpower }
    ).then((superheroFind) => {
      if (!superheroFind)
        throw Boom.notFound(
          'No se encontró el superheroe'
        ); /* new Error('No se encontró el superheroe'); */
    });
  }

  async removeSuperhero(superheroId) {
    return SuperheroModel.findById({ _id: superheroId }).then(
      (superheroFind) => {
        if (!superheroFind) throw Boom.notFound('No se encontró el superheroe');
        return SuperheroModel.deleteOne(superheroFind);
      }
    );

    /* const superhero_remove = SuperheroModel.findById({ _id: superheroId });
    if (!superhero_remove) throw Boom.notFound('No se encontró el superheroe');
    return SuperheroModel.deleteOne(superhero_remove); */
  }
}

module.exports = SuperheroService;
