//This code defines an class for an Account model in TypeScript
export  class Account {

    // Properties for account number and balance
     accountNumber: number;
     balance: number;

    //Constructor  to initialize account number and balance
    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Get Method to retrieve account number
    public getAccountNumber(): number {
        return this.accountNumber;
    }

    //Get Method to retrieve balance
    public getBalance(): number {
        return this.balance;
    }
    //Set accountdetails for account number and balance
    public setAccountDetails(accountNumber: number, balance: number): void {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Getting Both account number and balance
    public getAccountDetails(): { accountNumber: number; balance: number } {
        return {
            accountNumber: this.accountNumber,
            balance: this.balance,
        };
    }
}
