import {Account} from '../models/Account';
import {Transactions} from '../models/Transactions';

//This service is used to set the account balance and and do the transactions for the company in a day
export class TransactionService{
    private account:Account[] = [];
    private successTrans:Transactions[] = [];
    private failedTrans:Transactions[] = [];

    //This method is to to load the balance of a company unique account number
    //and the balance of the account
    //it will push the account object to the account array

    public loadBalance(account:Account): void {
        //check if the account already exists in the account array
        const existingAccount = this.account.find(acc => acc.getAccountDetails().accountNumber === account.getAccountDetails().accountNumber);
        
        //if the account does not exist then push the account object to the account array
        if (!existingAccount) {
            this.account.push(account);
        } else {
            //if the account already exists then update the balance
            existingAccount.setAccountDetails(account.getAccountDetails().accountNumber, account.getBalance());
        }
    }

    //this method is to get the balance of the Account Number in a company
    public getAccountBalanceOfCompany():Account[] {
        return this.account;
    }

    //This method is to process Transactions for the company for a day
    public processTransOfCompany(transactions:Transactions[]): { succTransObj:Transactions[]; failedTransObj:Transactions[] } {
        this.successTrans = [];
        this.failedTrans = [];

        let tempAccount: Account[] = this.getAccountBalanceOfCompany();
        
        let fromAccNum: number = 0;
        let toAccNum: number = 0;

        transactions.forEach(trans => {

            //Finding the from and to account number from the Account Model by comparing with the trans object 
            //if from account number not found it will return 0 and similarly for to account number
            fromAccNum = tempAccount.find(acc=> acc.getAccountDetails().accountNumber === trans.getFromAccount())?.getAccountDetails().accountNumber ?? 0;
            toAccNum = tempAccount.find(acc=> acc.getAccountDetails().accountNumber === trans.getToAccount())?.getAccountDetails().accountNumber ?? 0;

            //if both from account number and to account number exist in the Account Object then procceed with the transaction
            //also both account number should not be equal
            if(fromAccNum && toAccNum && fromAccNum !== toAccNum){

                //getting the balance of both from and to account number by comparing account model account number with transaction account number 
                var fromAccBalance:any =  tempAccount.find(acc => acc.accountNumber === fromAccNum)?.getBalance();
                var toAccBalance:any = tempAccount.find(acc => acc.accountNumber === toAccNum)?.getBalance();

                //if the account balnce after transaction is greater than zero then push the transaction to success array
                if(fromAccBalance - trans.getAmount()>= 0){
                    //updating the account balance of both from and to account number after checking the balance after transaction
                    tempAccount.find(acc => acc.accountNumber === fromAccNum)?.setAccountDetails(fromAccNum, ( fromAccBalance - trans.getAmount()));
                    tempAccount.find(acc => acc.accountNumber === toAccNum)?.setAccountDetails(toAccNum, ( toAccBalance + trans.getAmount()));
                    //pushing the transaction to success array
                    this.successTrans.push(trans);
                }
                //else if the balance after transaction is less than zero then push the transaction to failed array 
                else{
                    //pushing the transaction to failed array
                    this.failedTrans.push(trans);
                }
            }
            else{
                //if from account number and to account number are not found in the Account Model then push the transaction to failed array
                this.failedTrans.push(trans)

            }
        });
        
        return {succTransObj: this.successTrans, failedTransObj: this.failedTrans};
    
    }

}