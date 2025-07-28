//This is an abstract class for transaction model
export  class Transactions {
    //Properties of transaction
    private fromAccount: number;
    private toAccount: number;
    private amount: number;

    //constructor to intialize the properties of transaction
    constructor(fromAccount: number, toAccount: number, amount: number) {
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.amount = amount;
    }

    //get method to retrieve from account number of transaction model
    public getFromAccount(): number {
        return this.fromAccount;
    }

    //get method to retrieve to account number of transaction model
    public getToAccount(): number {
        return this.toAccount;
    }

    //get method to retrieve the amount of the transaction that has been done in the transaction model
    public getAmount(): number {
        return this.amount;
    }

    //set method to insert the details of the transaction
    public setTransactionDetails(fromAccount: number, toAccount: number, amount: number): void {
        this.fromAccount = fromAccount;
        this.toAccount = toAccount;
        this.amount = amount;
    }

    //get method to retrieve the transaction details such as from account number , to account number and amount 
    public getTransactionDetails(): { fromAccount: number; toAccount: number; amount: number } {
        return {
            fromAccount: this.fromAccount,
            toAccount: this.toAccount,
            amount: this.amount,
        };
    }

}