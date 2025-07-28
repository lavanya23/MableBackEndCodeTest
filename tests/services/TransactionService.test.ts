//unit tests for transaction service
import { TransactionService } from "../../src/services/TransactionService";
import { Transactions } from "../../src/models/Transactions";
import { Account } from "../../src/models/Account";



describe("TransactionService", () => {
    let transactionService: TransactionService;

    beforeEach(() => {
        transactionService = new TransactionService();
    });

    it("should load account balance", () => {
        const account = new Account(12300000, 10000);
        
        transactionService.loadBalance(account);
        expect(transactionService.getAccountBalanceOfCompany()).toContainEqual(account);
    });

    it("should process transactions successfully", () => {
       const accounts: Account[] = [
            new Account(12300000, 100000),
            new Account(78900000, 10000),
            new Account(45600000, 5000)
        ];
       accounts.forEach(account => transactionService.loadBalance(account));

        const transactions: Transactions[] = [
            new Transactions(12300000, 45600000, 100),
            new Transactions(78900000, 12300000, 200)
        ];
        const result = transactionService.processTransOfCompany(transactions);
        console.log(result.succTransObj.length);
        expect(result.succTransObj.length).toBeGreaterThan(0);
        expect(result.failedTransObj.length).toBe(0);
    });

    it("should handle failed transactions", () => {
        const accounts: Account[] = [
            new Account(12300000, 100),
            new Account(78900000, 10000),
            new Account(45600000, 5000)
        ];
       accounts.forEach(account => transactionService.loadBalance(account));
        const transactions: Transactions[] = [
            new Transactions(12300000, 45600000, 50000) // Assuming this exceeds the balance
        ];
        const result = transactionService.processTransOfCompany(transactions);
        expect(result.succTransObj.length).toBe(0);
        expect(result.failedTransObj.length).toBeGreaterThan(0);
    });

    it("should return empty account balance if no accounts loaded", () => {
        const accounts = transactionService.getAccountBalanceOfCompany();
        expect(accounts.length).toBe(0);
    });

    it("should return account balance of company", () => {
        const accounts: Account[] = [
            new Account(12300000, 100000),
            new Account(78900000, 10000)
        ];
        accounts.forEach(account => transactionService.loadBalance(account));
        
        const accountBalances = transactionService.getAccountBalanceOfCompany();
        expect(accountBalances.length).toBe(2);
        expect(accountBalances).toContainEqual(accounts[0]);
        expect(accountBalances).toContainEqual(accounts[1]);
    });

    it("should not process transactions with same from and to account", () => {
        const accounts: Account[] = [
            new Account(12300000, 100000),
            new Account(45600000, 5000)
        ];
        accounts.forEach(account => transactionService.loadBalance(account));

        const transactions: Transactions[] = [
            new Transactions(12300000, 12300000, 100) // Same from and to account
        ];
        const result = transactionService.processTransOfCompany(transactions);
        expect(result.succTransObj.length).toBe(0);
        expect(result.failedTransObj.length).toBe(1);
    });

    it("should handle transactions with non-existent accounts", () => {
        const accounts: Account[] = [
            new Account(12300000, 100000)
        ];
        accounts.forEach(account => transactionService.loadBalance(account));

        const transactions: Transactions[] = [
            new Transactions(12300000, 99999999, 100) // Non-existent to account
        ];
        const result = transactionService.processTransOfCompany(transactions);
        expect(result.succTransObj.length).toBe(0);
        expect(result.failedTransObj.length).toBe(1);
    });

    it("should handle transactions with zero balance accounts", () => {
        const accounts: Account[] = [
            new Account(12300000, 0), // Zero balance
            new Account(45600000, 5000)
        ];
        accounts.forEach(account => transactionService.loadBalance(account));

        const transactions: Transactions[] = [
            new Transactions(12300000, 45600000, 100) // Should fail due to zero balance
        ];
        const result = transactionService.processTransOfCompany(transactions);
        expect(result.succTransObj.length).toBe(0);
        expect(result.failedTransObj.length).toBe(1);
    }); 

});