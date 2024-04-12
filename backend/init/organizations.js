const { main } = require("../db/db");
const Organisation = require("../models/organisation");

main()
    .then(() => {
        console.log("Connection Successful with Database 📊!");
    })
    .catch((err) => {
        console.log(err);
    });

const orgData = [
    new Organisation({
        orgname: "khalsaaid",
        name: "Khalsa Aid",
        password: "khalsapass123",
        description: "Khalsa Aid, founded in 1999, is a globally recognized humanitarian organization rooted in Sikh principles. It delivers rapid aid to those in need worldwide, embodying the Sikh ethos of selfless service and compassion for all.",
        category: "Food & Water",
        address: "Khalsa Aid International, Unit 8, Lake End Court, Taplow Road, Taplow, Maidenhead, Berkshire SL6 0JQ"
    })
]

// Organisation.insertMany(orgData)
//   .then((result) => {
//     console.log("Data inserted successfully:", result);
//   })
//   .catch((error) => {
//     console.error("Error inserting data:", error);
//   });
