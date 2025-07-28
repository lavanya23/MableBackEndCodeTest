# MableBackEndCodeTest

# Simple Banking System

A simple Banking  System implemented in TypeScript using OOPS principles. 

## Features

- **Account Balance**: Load Account Balance for a Company .
- **Transactions**: Perform Transactions for that company.

## Assumptions
 - **1**. The account number is unique for each company
 - **2**. The transaction amount should not be greater than the account balance
 - **3**. The from account number and to account number should not be the same
 - **4**. The transaction should be processed only if both from and to account numbers exist in the account array
 - **5**. The transaction should be processed only if the from account balance after transaction is greater than
   or equal to zero
 - **6**. The transaction should be processed only if the to account number exists in the account array
 - **7**. The balance of the from account number should be updated after the transaction

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
 
