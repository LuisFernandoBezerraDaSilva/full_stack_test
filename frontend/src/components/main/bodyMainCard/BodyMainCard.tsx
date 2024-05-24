import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import List from '../../basis/list/List';
import { toast, ToastContainer } from 'react-toastify';

interface Props {
    updatedFile: boolean;
    onFileSelected: (file: File) => void;
  }

class BodyMainCard extends Component<Props> {

    render() {
        let updatedFile = this.props.updatedFile;
        let onFileSelected = this.props.onFileSelected;

        const handleFileUpload = (event: any) => {
          const file = event.target.files[0];
          if (!file.name.endsWith('.csv')) {
              console.log('chegou aqui2')

              toast.error('Por favor, selecione um arquivo CSV.');
              return;
          }
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result;
          };
          onFileSelected(file);
        };

          
        return (
            <div>
              <ToastContainer />
              {!updatedFile ? (
                <div>
                    <span>Por favor, importe seu arquivo</span>
                    <input type='file' accept='.csv' onChange={handleFileUpload} />
                </div>
              ) : (
                <div>
                    <span> Lista de seu arquivo Importado </span>
                    <List />
                </div>
              )}
            </div>
          );
    }
}

export default BodyMainCard;