import { Summary } from "../Summary/Index";
import { TransactionsTable } from "../TransactionsTable/Index";
import { Container } from "./style";

interface DashboardProps{
    onRemoveTransaction:()=>void
}

export function Dashboard({onRemoveTransaction}:DashboardProps){
    return(
    <Container>
        <Summary/>
        <TransactionsTable onRemoveTransaction={onRemoveTransaction}/>
    </Container>
    );
};