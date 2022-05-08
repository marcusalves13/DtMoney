import { useTransactions } from "../../hooks/useTansactions";
import { Container } from "./style";
import {AiFillDelete} from 'react-icons/ai'
interface TransactionsProps{
    onRemoveTransaction:()=>void
}

interface Transactions{
    id:number,
    title:string,
    amount:number,
    type:string,
    category:string,
    createdAt:string
}

export function TransactionsTable({onRemoveTransaction}:TransactionsProps){
    const {transactions,removeTransaction} =  useTransactions();

    function handlleRemoveTransaction(id:Number){
        const newTransaction = transactions.filter( newArray => newArray.id != id );
        removeTransaction(newTransaction);
        onRemoveTransaction();
    }
    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                {transactions.map(transaction => {
                        return ( 
                        <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>{new Intl.NumberFormat('pt-br',{
                                style:'currency',
                                currency:'BRL'
                            }).format(transaction.amount)}</td>
                            <td>{transaction.category}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-br')
                                .format(new Date(transaction.createdAt))}
                            </td>

                            <td>
                                <button onClick={()=>handlleRemoveTransaction(transaction.id)}><AiFillDelete size={20}/></button>
                            </td>
                            
                            </tr>
                        )
                })}
                </tbody>
            </table>
        </Container>
    );
};