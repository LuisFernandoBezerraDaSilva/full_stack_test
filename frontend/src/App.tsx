import './App.css';
import Card from './components/basis/card/Card';
import ConfirmationFooter from './components/footers/confirmationFooter/ConfirmationFooter';
import Header from './components/headers/header';
import BodyMainCard from './components/main/bodyMainCard/BodyMainCard';
import { useState } from 'react';
import uploadService from './services/file';

function App() {
  const [updatedFile, setUpdatedFile] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  let file: File|null = null;

  const handleFileSelected = (incomingFile: File) => {
    file = incomingFile;
  };

  const handleFilterSubmit = (value: string) => {
    setFilterValue(value);
    
  };

  const handleButtonClick = async () => {
    if (file) {
      try {
        const response = await uploadService.uploadFile(file);
        console.log(response.data);
        setUpdatedFile(true);
      } catch (error) {
        console.error(`Error while uploading file: ${error}`);
      }
    }
  };

  return (
    <div className='card'>
      <Card
        header= {<Header filter={true && updatedFile} title="Input de CSV" onFilterSubmit={handleFilterSubmit}/>}
        body={<BodyMainCard updatedFile={updatedFile} onFileSelected={handleFileSelected} />} 
        footer={<ConfirmationFooter onButtonClick={handleButtonClick}/>} 
        />
    </div>
  );
}

export default App;