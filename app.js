const express = require("express");
const app = express();
const envConf = require("./config/env");
const port = envConf.port;
const path = require("path");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const auctionPlatform = require("./schema");
const products = require("./routes/products");
const authentication = require("./routes/authentication");
const sellerDashboard = require("./routes/seller_dashboard");
const user = require("./routes/user");
const logger = require("./controllers/logger");
const passport = require("passport");
require("./middlewares/passport");


// ==== Config ====
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use('/photos', express.static('photos'));
app.use(cookieParser());

// ==== Routes ====
app.get("/", async (req, res) => {
  res.status(200).json("All Okay!");
});

app.use("/seller/products", products);
app.use("/auth", authentication);
app.use(
  "/seller",
  passport.authenticate("jwt", { session: false }),
  sellerDashboard
);
app.use("/bidder", passport.authenticate("jwt", { session: false }), user);

app.use((err, req, res, next) => {
  const statuscode = err.statusCode;
  const message = err.message;
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

const server = app.listen(port, async () => {
  logger.info(
    `Auctions App listening on port ${port} http://localhost:${port}`
  );
  try {
    await auctionPlatform.createDB();
    await auctionPlatform.Users();
    await auctionPlatform.shippingAddress();
    await auctionPlatform.Auctions();
    await auctionPlatform.Categories();
    await auctionPlatform.Products();
    await auctionPlatform.Parameters();
    await auctionPlatform.productImages();
    await auctionPlatform.userQueries();
    await auctionPlatform.loginLogs();
    await auctionPlatform.Orders();
    await auctionPlatform.Bids();
    await auctionPlatform.orderItems();
    await auctionPlatform.paymentDetails();
  } catch (error) {
    logger.error(error);
  }
});

// global middleware for errorHandling

process.on("unhandledRejection", (err) => {
  logger.error(`Error : ${err.message}`);
  logger.error(`Shutting down the server due to unhandled Promise Rejection`);

  // server.close(() => {
  //   process.exit(1);
  // });
});
