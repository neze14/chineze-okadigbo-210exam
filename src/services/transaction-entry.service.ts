// Chinezelum Okadigbo

import { Connection, createConnection, getRepository, Repository } from "typeorm";
import { TransactionEntry } from "../entities/transaction-entry.entity";
import { IState, ITransactionEntry } from "../interfaces/transaction-entry.interface";

export const getDbConnection = async (setConnection:React.Dispatch<React.SetStateAction<Connection | null>> , state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
      const connection = await createConnection({
        /* Use below if not using expo
      type: 'react-native',
      database: 'transaction_entries.db',
      location: 'default',
      */
        type: 'expo',
        database: 'transaction_entries.db',
        driver: require('expo-sqlite'),

        //logging: ['error', 'query', 'schema'],
        synchronize: true,
        entities: [TransactionEntry],
      });
      setConnection(connection);
      getTransactionEntries(state, setState);
    } catch (error) {
      console.log(error);
    }
}

export const getTransactionEntries = async (state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const transactionEntryRepository: Repository<TransactionEntry> = getRepository(TransactionEntry);
        let transactionEntries = await transactionEntryRepository.find();
        setState({ ...state, transactionEntries });
    } catch (error) {
        console.log(error);
    }
};

export const createTransactionEntry = async (transactionEntryData: ITransactionEntry, state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const transactionEntryRepository: Repository<TransactionEntry> = getRepository(TransactionEntry);
        const newTransactionEntry = transactionEntryRepository.create(transactionEntryData);
        const transactionEntry = await transactionEntryRepository.save(newTransactionEntry);
        //time to modify state after create
        const transactionEntries = state.transactionEntries;
        transactionEntries.push(transactionEntry);
        setState({ ...state, transactionEntries, onAddEntry: false });
    } catch (error) {
        console.log(error);
    }
};

export const deleteTransactionEntry = async (id: number, state: IState, setState: React.Dispatch<React.SetStateAction<IState>>) => {
    try {
        const transactionEntryRepository: Repository<TransactionEntry> = getRepository(TransactionEntry);
        await transactionEntryRepository.delete(id);
        //remove entry from state
        const currentEntries = state.transactionEntries;
        //find the index corresponding to the item with the passed id
        const index = currentEntries.findIndex((entry) => entry.id === id);
        currentEntries.splice(index, 1);//remove one element starting from the index position. This is removing the element itself
        //update state with the spliced currentItems
        setState({ ...state, transactionEntries: currentEntries });
    } catch (error) {
        console.log(error);
    }
};