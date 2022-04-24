module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email : {
        type: Sequelize.STRING
      },
      full_name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.NUMBER
      },
      account_activated: {
        type: Sequelize.BOOLEAN
      }
    });
    return User;
  };