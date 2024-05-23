import './App.css';
import Card from './components/basis/card/Card';
import ConfirmationFooter from './components/footers/confirmationFooter/ConfirmationFooter';
import Header from './components/headers/header';
import BodyMainCard from './components/main/bodyMainCard/BodyMainCard';
import { useState } from 'react';


function App() {
  const [updatedFile, setUpdatedFile] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  let file: File|null = null;

  const handleFileSelected = (incomingFile: File) => {
    file = incomingFile;
  };

  const handleButtonClick = () => {
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileContent = event.target?.result as string;
            const lines = fileContent.split('\n');
            const data = lines.map(line => line.split(','));
            console.log(data);
        };
        reader.readAsText(file);
        setUpdatedFile(true);
    }
  };  

  return (
    <Card
      header= {<Header filter={true} title="Input de CSV" onFilterChange={setFilterValue}/>}
      body={<BodyMainCard updatedFile={updatedFile} onFileSelected={handleFileSelected} />} 
      footer={<ConfirmationFooter onButtonClick={handleButtonClick}/>} 
      />
  );
}

export default App;