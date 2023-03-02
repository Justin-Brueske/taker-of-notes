// link the routes 
const express = require("express");
const apiroutes = require("./routes/apiroutes");
const htmlroutes = require("./routes/htmlroutes");
const PORT = process.env.PORT || 3001;

// using express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//routes
app.use(express.static("public"));
app.use("/api", apiroutes);
app.use("/", htmlroutes);

app.listen(PORT, () =>
  console.log(`App is ready on port ${PORT} 🚀`)
);