import { useState } from "react";
import Modal from 'react-modal';
import { Dashboard } from "./components/Dashboard/Index";
import { Header } from "./components/Header/Index";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionsProvider } from "./hooks/useTansactions";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
Modal.setAppElement('#root');
export function App() {

  const [isNewTransactionModalOpen,setIsNewTransactionModalOpen] = useState(false);



  function handleOpenNewTransactionModal(){
      setIsNewTransactionModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
      setIsNewTransactionModalOpen(false)
  }

  const onCreatedTransaction = () => toast.success('Transação cadastrada com Sucesso', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme:"dark"
    
    });


    const onRemoveTransaction = () => toast.info('Transação removida com sucesso!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme:"dark"
      
      });
 
  return (
    <TransactionsProvider>
      <ToastContainer/>
      <Header onOpenNewTransactionModal = {handleOpenNewTransactionModal}/>
      <Dashboard onRemoveTransaction={onRemoveTransaction}/>
      <NewTransactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCloseNewTransactionModal} onCreatedTransaction={onCreatedTransaction}/>
      <GlobalStyle />
    </TransactionsProvider>
  );
}