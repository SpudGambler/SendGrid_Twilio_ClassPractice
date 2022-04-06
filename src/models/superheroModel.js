const mongoose = require('mongoose');
const superheroSchema = mongoose.Schema({

  superhero: {
    type: String,
    require: true
  },
  real_name: {
    type: String,
    require: true
  },
  feature: {
    universe: {
      type: String,
      require: true
    },
    super_powers: {
      type: Array,
      require: true
    },
  },
  superhero_sidekick: {
    sidekick: {
      type: String,
      require: true
    },
    side_powers: {
      type: Array,
      require: true
    },
  },
});

module.exports = mongoose.model('SuperheroCollection', superheroSchema);
