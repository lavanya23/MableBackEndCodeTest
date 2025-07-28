
import { Account } from "../../src/models/Account";

describe("Account Model", () => {
    let account: Account;

    beforeEach(() => {
        account = new Account(12345678, 1000);
    });

    it("should initialize with correct account number and balance", () => {
        expect(account.getAccountNumber()).toBe(12345678);
        expect(account.getBalance()).toBe(1000);
    });

    it("should set account details correctly", () => {
        account.setAccountDetails(87654321, 2000);
        expect(account.getAccountDetails()).toEqual({
            accountNumber: 87654321,
            balance: 2000,
        });
    });

    it("should return account details", () => {
        const details = account.getAccountDetails();
        expect(details.accountNumber).toBe(12345678);
        expect(details.balance).toBe(1000);
    });
});
