const SuperheroModel = require('../models/superheroModel');

class SuperheroService {
  /* Promesas y funciones asincronicas
  Una funcion asincronica devuelve una promesa
  JS es un lenguaje subproceso (que solo ejecuta un hilo) -> solo hace una cosa a la vez */

  async createSuperhero(superhero) {
    superhero.save();
    return superhero;
  }

  async listSuperheroes() {
    return SuperheroModel.find();
  }

  async showSuperhero(superheroId) {
    return SuperheroModel.findById({ _id: superheroId });
  }

  async editSuperhero(
    superheroId,
    superhero,
    real_name,
    feature,
    superhero_sidekick
  ) {
    return SuperheroModel.findByIdAndUpdate(
      { _id: superheroId },
      { superhero, real_name, feature, superhero_sidekick }
    ).then((superheroFind) => {
      if (!superheroFind) throw Error('No se encontró el superheroe');
    });
  }

  async removeSuperhero(superheroId) {
    const superhero_remove = SuperheroModel.findById({ _id: superheroId });
    return SuperheroModel.deleteOne(superhero_remove);
  }
}

module.exports = SuperheroService;
