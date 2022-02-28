const { MongoClient } = require("mongodb");

/* Mongo DataBase Connection */

module.exports = {
  db: null,

  async connect() {
    try {
      const connection = await MongoClient.connect(
        "mongodb+srv://root:root@cluster0.dslci.mongodb.net?retryWrites=true&w=majority"
      );

      this.db = connection.db("FinalDatabase");

      console.log("--connected---");
    } catch (err) {
      if (err) {
        console.log("error");
      }
    }
  },
};
