const { main } = require("../db/db");
const Institution = require("../models/institution");

main()
  .then(() => {
    console.log("Connection Successful with Database 📊!");
  })
  .catch((err) => {
    console.log(err);
  });

const institution1 = new Institution({
  name: "LPU",
  password: "123456789@a",
  description: "Best Education",
  address: "Phagwara",
  contact: {
    phone: 1824-517000,
    email: "info@lpu.co.in",
  },
});
institution1.save();
