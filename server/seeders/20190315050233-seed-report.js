

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('Reports', [{
      original: "Sentence in English",
      translation: "Our first translation",
      improved: "user-generated improvement",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }, {
      original: "Another English sentence!",
      translation: "That's what our API gave us!",
      improved: "Better version",
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Reports', null, {});

  }
};
