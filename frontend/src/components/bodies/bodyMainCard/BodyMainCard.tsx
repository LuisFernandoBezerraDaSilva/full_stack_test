import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import List from '../../basis/list/List';
import { toast, ToastContainer } from 'react-toastify';

interface CardProps {
    arquivoImportado: boolean;
    onFileSelected: (file: File) => void;
  }

class BodyMainCard extends Component<CardProps> {

    render() {
        let arquivoImportado = this.props.arquivoImportado;
        let onFileSelected = this.props.onFileSelected;

        const handleFileUpload = (event: any) => {
          console.log('chegou aqui')
          const file = event.target.files[0];
          if (!file.name.endsWith('.csv')) {
              console.log('chegou aqui2')

              toast.error('Por favor, selecione um arquivo CSV.');
              return;
          }
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result;
            // console.log(text);
          };
          onFileSelected(file);
          // reader.readAsText(file);
        };

          
        return (
            <div>
              <ToastContainer />
              {!arquivoImportado ? (
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