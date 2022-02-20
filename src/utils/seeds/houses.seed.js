const mongoose = require("mongoose");

const mongoDb = "mongodb+srv://root:root@cluster0.3rjnk.mongodb.net/GOT-SERVER?retryWrites=true&w=majority";
const HousesSchema = require("../../api/house/house.model");

const Houses = [
  {
    name: "Stark",
    motto: `Winter is coming`,
    members: ["61e16fc93e64f9f16b47479d", "61e170653e64f9f16b4747a0", "61e170ee3e64f9f16b4747a3"],
  },
 
];

const HousesDocuments = Houses.map((house) => new HousesSchema(house));

mongoose
  .connect(mongoDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const allHouses = await HousesSchema.find();
    if (allHouses.length) {
      await HousesSchema.collection.drop();
    }
  })
  .catch((err) => console.log(`Error deleting Houses: ${err}`))
  .then(async () => {
    await HousesSchema.insertMany(HousesDocuments);
    console.log("Houses successfully created");
  })
  .catch((err) => console.log(`Error creating Houses: ${err}`))
  .finally(() => mongoose.disconnect());
