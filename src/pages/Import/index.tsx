import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Console } from 'console';
import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();
  const [submitedFile, setSubmitedFile] = useState<File>({} as File);
  // setRepositories([...repositories, response.data]);
  async function handleUpload(): Promise<void> {
    // TODO

    try {
      const data = new FormData();
      data.append('file', submitedFile);
      await api.post('/transactions/import', data);
      const uploadFileData: FileProps = {
        file: submitedFile,
        name: submitedFile.name,
        readableSize: submitedFile.size.toString(),
      };
      window.alert('Arquivo enviado com sucesso!');
      setUploadedFiles([...uploadedFiles, uploadFileData]);
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    setSubmitedFile(files[0]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <span>{submitedFile.name}</span>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
