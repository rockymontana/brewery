module.exports = {
  up: (queryInterface, Sequelize) => {
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
