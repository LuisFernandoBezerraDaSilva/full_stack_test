import './App.css';
import Card from './components/basis/card/Card';
import ConfirmationFooter from './components/footers/confirmationFooter/ConfirmationFooter';
import BodyMainCard from './components/bodies/bodyMainCard/BodyMainCard';
import { useState } from 'react';


function App() {
  const [arquivoImportado, setArquivoImportado] = useState(false);

  const handleFileSelected = (file: File) => {
    // Faça algo com o arquivo aqui
    setArquivoImportado(true);
  };

  return (
    <Card
      title="Input de CSV" 
      body={<BodyMainCard arquivoImportado={arquivoImportado} onFileSelected={handleFileSelected} />} 
      footer={<ConfirmationFooter />} 
      />
  );
}

export default App;
