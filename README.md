# MableBackEndCodeTest

# Simple Banking System

A simple Banking  System implemented in TypeScript using OOPS principles. 

## Features

- **Account Balance**: Load Account Balance for a Company .
- **Transactions**: Perform Transactions for that company.

## Technologies Used

- TypeScript
- Node.js (optional for running the project)
- OOP Principles

## Classes

1. **Account**: Base class 
   - Properties: `accountNumber`, `balance`
   - Methods: `getAccountNumber()`, `getBalance()`, `setAccountDetails()` etc

2. **Transactions**: Base class 
   - Properties: `fromAccount`, `toAccount`,` amount`
   - Methods: `getFromAccount()`, `getToAccount()`, `getAmount()` ,`setTransactionDetails()`,`getTransactionDetails()`

3. **TransactionService.ts**: This service is used to set the account balance and and do the transactions for the company in a day.
   

4. **TransactionController.ts**: Endpoint to load account balance from csv file and convert into array of Account objects.
  

## Installation

1. Clone the repository:
   ```bash
   git clone  https://github.com/lavanya23/MableBackEndCodeTest
   cd MableBackEndCodetest
2. Install dependencies:
   ```bash
   npm install
3. Compile TypeScript to JavaScript
   ```bash
   npm run build
4. Run the application:
   ```bash
   npm run start
5. Run the test:
    ```bash
    npm run test
 
