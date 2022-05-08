import { Container } from "./style";
import income from '../../assets/entradas.svg';
import outcome from '../../assets/saidas.svg';
import totals from '../../assets/total.svg';
import { useTransactions } from "../../hooks/useTansactions";

export function Summary (){
    const {transactions} = useTransactions();
    const sumarry = transactions.reduce((acc,transaction)=>{
        if(transaction.type ==='deposit'){
            acc.deposits += transaction.amount;
            acc.total += transaction.amount
        }
        else{   
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount
        }
        return acc;
    },{
        deposits:0,
        withdraws:0,
        total:0
    });
    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={income} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-br',{
                    style:'currency',
                    currency:'BRL'
                    }).format(sumarry.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcome} alt="Saídas" />
                </header>
                <strong>-
                    {new Intl.NumberFormat('pt-br',{
                    style:'currency',
                    currency:'BRL'
                    }).format(sumarry.withdraws)}
                </strong>
            </div>
            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totals} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-br',{
                    style:'currency',
                    currency:'BRL'
                    }).format(sumarry.total)}
                </strong>
            </div>
        </Container>
    );

};