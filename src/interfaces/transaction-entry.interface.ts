// Chinezelum Okadigbo

export interface ITransactionEntry{
  id?: number;
  txnDay?: number;
  txnMonth?: number;
  txnYear?: number;
  surname?: string;
  firstName?: string;
  otherName?: string;
  gender?: string;
  nationality?: string;
  typeOfIdentification?: string;
  nationalIdentificationNumber?: number;
}

export interface IState{
    transactionEntries: ITransactionEntry[],
    onAddEntry: boolean
}