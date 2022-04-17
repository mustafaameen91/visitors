const express = require("express");
var cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./app/routes/user.routes.js")(app);
require("./app/routes/role.routes.js")(app);
require("./app/routes/reportType.routes.js")(app);
require("./app/routes/dailyReport.routes.js")(app);
require("./app/routes/visitor.routes")(app);
require("./app/routes/visitorType.routes.js")(app);

app.listen(3101, () => {
   console.log("Server is running on port 3101.");
});
9;
