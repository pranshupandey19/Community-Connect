const { main } = require("../db/db");
const Category = require("../models/category");

main()
  .then(() => {
    console.log("Connection Successful with Database 📊!");
  })
  .catch((err) => {
    console.log(err);
  });

const categoryData = [
  new Category({
    name: "Food & Water",
    description:
      "Providing essential sustenance to those in need, ensuring access to nutritious food and clean water.",
  }),
  new Category({
    name: "Clothes",
    description:
      "Offering clothing items to individuals and communities facing poverty, displacement, or natural disasters.",
  }),
  new Category({
    name: "Trees",
    description:
      "Dedicated to environmental conservation and reforestation efforts, mitigating climate change and supporting biodiversity.",
  }),
  new Category({
    name: "Education",
    description:
      "Promoting access to quality education for all, empowering individuals through literacy programs and educational resources.",
  }),
];

Category.insertMany(categoryData)
  .then((result) => {
    console.log("Data inserted successfully:", result);
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  });
