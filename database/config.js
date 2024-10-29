const mongoose = require("mongoose");

//* USER
//* mean_user
//* PASSWORD
//* IdlOfOIoqQrrr4Ci

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DB_CNN
      /*
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
        */
    );
  } catch (error) {
    throw new Error("Error a la hora de iniciar la BD ver los logs");
  }
};

module.exports = {
  dbConnection,
};
