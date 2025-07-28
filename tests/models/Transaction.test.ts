import { Transactions } from "../../src/models/Transactions";

describe("Transactions Model", () => {
    let transaction: Transactions;

    beforeEach(() => {
        transaction = new Transactions(12345678, 87654321, 500);
    });

    it("should initialize with correct fromAccount, toAccount, and amount", () => {
        expect(transaction.getFromAccount()).toBe(12345678);
        expect(transaction.getToAccount()).toBe(87654321);
        expect(transaction.getAmount()).toBe(500);
    });

    it("should set transaction details correctly", () => {
        transaction.setTransactionDetails(11111111, 22222222, 1000);
        expect(transaction.getTransactionDetails()).toEqual({
            fromAccount: 11111111,
            toAccount: 22222222,
            amount: 1000,
        });
    });

    it("should return transaction details", () => {
        const details = transaction.getTransactionDetails();
        expect(details.fromAccount).toBe(12345678);
        expect(details.toAccount).toBe(87654321);
        expect(details.amount).toBe(500);
    });
}
);

    
