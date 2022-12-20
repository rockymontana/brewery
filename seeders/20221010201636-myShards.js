module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('shards', [{
      id: 1,
      userName: 'jerlandsson',
      userId: '506568581559877633',
      ancients: 0,
      voids: 0,
      sacreds: 0,
      createdAt: "2022-10-10 22:22",
      updatedAt: "2022-10-10 22:22"
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};