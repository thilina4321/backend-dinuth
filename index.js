const express = require("express");
const mongoose = require("mongoose");
const app = express()


// routers
const applicantRouter = require('./router/applicant')
const instructorRouter = require('./router/instructor')

app.use(express.json());

const port = process.env.PORT || 3000

app.use('/applicant', applicantRouter)
app.use('/instructor', instructorRouter)

mongoose
  .connect('mongodb://127.0.0.1:27017/license', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connect to database");
  })
  .catch((err) => {
    console.log("database not connected");
  });



app.listen(port, () => {
  console.log("app runs on port ", port);
});
