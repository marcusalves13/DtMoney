import Modal from 'react-modal';
import { Container, TransactionTypeContainer,RadioBox } from './style';
import incomeImg from '../../assets/entradas.svg';
import outcomeImg from '../../assets/saidas.svg';
import closeImg from '../../assets/close.svg';
import { FormEvent, useState} from 'react';
import { useTransactions } from '../../hooks/useTansactions';
interface NewTransactionModalProps{
    isOpen:boolean;
    onRequestClose:()=>void;
    onCreatedTransaction:()=>void
}
export function NewTransactionModal({isOpen,onRequestClose,onCreatedTransaction}:NewTransactionModalProps){
    
    const {createTransaction} = useTransactions();
    const [title,setTitle] = useState('');
    const [amount,setAmount] = useState(0);
    const [category,setCategory] = useState('')
    const [type,setType] = useState('deposit');

    async function handleCreateNewTransaction(event:FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type
        });
        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
        onCreatedTransaction();

        
    }

    return(
        
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
                <button 
                type='button' 
                onClick={onRequestClose} 
                className="react-modal-close">
                    <img src={closeImg} alt="" />
                </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar</h2>
                    <input 
                    type="text" 
                    placeholder='Titulo'
                    value={title}
                    onChange={event=>setTitle(event.target.value)}
                    />

                    <input 
                    type="number" 
                    placeholder='Valor'
                    onChange={event=>setAmount(Number(event.target.value))}
                    />

                    <TransactionTypeContainer>

                        <RadioBox 
                        type='button' 
                        onClick={()=>{setType('deposit')}}
                        isActive = {type ==='deposit'}
                        activeColor= 'green'
                        >
                            <img src={incomeImg} alt="Entrada" />
                            <span>Entrada</span>
                        </RadioBox>

                        <RadioBox 
                        type='button' 
                        onClick={()=>{setType('withdraw')}}
                        isActive = {type ==='withdraw'}
                        activeColor= 'red'
                        >
                            <img src={outcomeImg} alt="Saída"></img>
                            <span>Saída</span>
                        </RadioBox>

                    </TransactionTypeContainer>

                    <input 
                    type="text" 
                    placeholder='Categoria' 
                    value={category}
                    onChange={event=>setCategory(event.target.value)}
                    />

                    <button type="submit">
                        Cadastrar
                    </button>
            </Container>
        </Modal>
    );
}