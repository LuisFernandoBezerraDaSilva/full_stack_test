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

  const handleFilterSubmit = (value: string) => {
    setFilterValue(value);
    
  };

  const handleButtonClick = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target?.result as string;
        const lines = fileContent.split('\n');
        const headers = lines[0].split(',');
        const data = lines.slice(1).map(line => {
          const values = line.split(',');
          let obj: Record<string, string> = {};
          headers.forEach((header, index) => {
            obj[header] = values[index];
          });
          return obj;
        });
        console.log(data);
      };
      reader.readAsText(file);
      setUpdatedFile(true);
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