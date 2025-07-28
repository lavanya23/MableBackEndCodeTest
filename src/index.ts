import { TransactionController } from "./controllers/TransactionController";
const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // directory to store uploaded files

interface MulterRequest extends Request {
  file: any;
}

// Endpoint to load account balance from csv file and convert into array of Account objects
app.post(
  "/loadBalance",
  upload.single("csvFile"),
  TransactionController.loadBalance
);

// Endpoint to process transactions from csv file and convert into array of Transactions objects
app.post(
  "/processTransactions",
  upload.single("csvFile"),
  TransactionController.processTransactions
);

// Endpoint to get account balance of the company
app.get("/getAccountBalance", TransactionController.getAccountBalance);

// Start the server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

export default app; // Export the app for testing or further use
