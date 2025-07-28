import { Request, Response } from "express";
import { Account } from "../models/Account";
import { Transactions } from "../models/Transactions";
import { TransactionService } from "../services/TransactionService";
import { parse } from "csv-parse";
const multer = require("multer");
const fs = require("fs");
const upload = multer({ dest: "uploads/" }); // directory to store uploaded files

interface MulterRequest extends Request {
  file: any;
}

interface CsvAccount {
  accountNumber: string;
  balance: string;
}

interface CsvTransaction {
  fromAccount: string;
  toAccount: string;
  amount: string;
}

// Initialize the transaction service
const transactionService = new TransactionService();

function parseCsvtoRecords(csvData: string, columns: string[]): Promise<any> {
  return new Promise((resolve, reject) => {
    parse(
      csvData,
      {
        columns: columns,
        skip_empty_lines: true,
      },
      (err, records) => {
        if (err) {
          return reject(err);
        }
        // Validate records against expected columns
        if (
          !records.every((record: any) => columns.every((col) => col in record))
        ) {
          return reject(new Error("CSV data does not match expected format"));
        }
        resolve(records as CsvAccount[] | CsvTransaction[]);
      }
    );
  });
}

export class TransactionController {
  // Endpoint to load account balance from csv file and convert into array of Account objects
  public static loadBalance(req: Request, res: Response): void {
    if (!(req as MulterRequest).file) {
      res.status(400).send("No file uploaded");
      return;
    }
    const filePath = (req as MulterRequest).file.path;
    const csvrec: string = fs.readFileSync(filePath, "utf8");

    parseCsvtoRecords(csvrec, ["accountNumber", "balance"])
      .then((records: CsvAccount[]) => {
        const accounts: Account[] = records.map((record) => {
          return new Account(
            Number(record.accountNumber),
            Number(record.balance)
          );
        });
       

        accounts.forEach((account) => {
          transactionService.loadBalance(account);
        });

        res.status(200).send("Account balances loaded successfully");
      })
      .catch((error) => {
        res.status(400).send(`Error parsing CSV data: ${error.message}`);
      });
  }

  // Endpoint to process transactions from csv file and convert into array of Transactions objects
  public static processTransactions(req: Request, res: Response): void {
    if (!(req as MulterRequest).file) {
      res.status(400).send("No file uploaded");
      return;
    }
    const filePath = (req as MulterRequest).file.path;
    const csvrec: string = fs.readFileSync(filePath, "utf8");
    
    parseCsvtoRecords(csvrec, ["fromAccount", "toAccount", "amount"])
      .then((records: CsvTransaction[]) => {
        const transactions: Transactions[] = records.map((record) => {
          return new Transactions(
            Number(record.fromAccount),
            Number(record.toAccount),
            Number(record.amount)
          );
        });
        
       
        // Process transactions using the transaction service
        const result = transactionService.processTransOfCompany(transactions);

        // Send the result back to the client
        if (result.succTransObj.length === 0 && result.failedTransObj.length === 0) {
          res.status(404).send("No transactions processed");
          return;
        }
        
        res.status(200).json({
          successTransactions: result.succTransObj,
          failedTransactions: result.failedTransObj,
        });
      })
      .catch((error) => {
        res.status(400).send(`Error parsing CSV data: ${error.message}`);
      });
  }

  public static getAccountBalance(req: Request, res: Response): void {
    const accounts = transactionService.getAccountBalanceOfCompany();
    if (accounts.length === 0) {
      res.status(404).send("No accounts found");
      return;
    }

    const accountDetails = accounts.map((account) =>
      account.getAccountDetails()
    );
    res.status(200).json(accountDetails);
  }
}
