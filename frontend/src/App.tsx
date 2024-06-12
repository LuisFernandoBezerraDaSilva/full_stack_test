import './App.css';
import Card from './components/basis/card/Card';
import ConfirmationFooter from './components/footers/confirmationFooter/ConfirmationFooter';
import Header from './components/headers/header';
import BodyMainCard from './components/main/bodyMainCard/BodyMainCard';
import { useState,  useEffect } from 'react';
import fileService from './services/file';
import userService from './services/user';

function App() {
  const [updatedFile, setUpdatedFile] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [allFiles, setAllFiles] = useState([]); 
  let file: File|null = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getAllFiles(); 
        setAllFiles(response);
        if(response.length !== 0) {
          setUpdatedFile(true);
        }
      } catch (error) {
        console.error(`Error while fetching data: ${error}`);
      }
    };

    fetchData();
  }, []);

  const handleFileSelected = (incomingFile: File) => {
    file = incomingFile;
  };

  const handleFilterSubmit = async (value: string) => {
    const response = await userService.getFilteredFiles(value);
    if(response.length === 0) {
      setUpdatedFile(false);
    } else {
      setUpdatedFile(true);
    }

    setFilterValue(value);
  };

  const handleButtonClick = async () => {
    if (file) {
      try {
        const response = await fileService.uploadFile(file);
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
        allFiles={allFiles} // Pass the response as a prop to Card
        />
    </div>
  );
}

export default App;