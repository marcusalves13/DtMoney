import {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { api } from '../services/api';

interface Transaction {
    id:number,
    title:string,
    amount:number,
    type:string,
    category:string,
    createdAt:string
}

type TransactionInput = Omit<Transaction,'id'|'createdAt'> 

interface TransactionContextData{
    transactions:Transaction[],
    createTransaction:(transaction:TransactionInput)=>Promise<void>
    removeTransaction:(newTransaction:Transaction[])=>void
}

interface TransactionsProviderProps{
    children:ReactNode
}

const TransactionContext= createContext<TransactionContextData>({} as TransactionContextData);


export function TransactionsProvider( {children}:TransactionsProviderProps){

    const[transactions,setTransactions] = useState<Transaction[]>([]);


        async function createTransaction(transactionInput:TransactionInput){

          const response =   await api.post('/transactions',{...transactionInput,createdAt:new Date()});
          const {transaction} =  response.data;  
          setTransactions(
              [...transactions,
                transaction
              ]);
        }

        useEffect(()=>{
           api.get('/transactions')
           .then(response=> setTransactions(response.data.transactions));
        },[]);

        function removeTransaction(newTransactions:Transaction[]){
            setTransactions(newTransactions)
            
        }

        return(
            <TransactionContext.Provider value={{transactions,createTransaction,removeTransaction}}>
                {children}
            </TransactionContext.Provider>
        );
    
}
export function useTransactions(){
    const context =  useContext(TransactionContext);
    return context;
}