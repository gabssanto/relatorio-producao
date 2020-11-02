import React from 'react';
import Dropzone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';

const UploadButton = ({ onUpload }) => {
  const renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Arraste um arquivo aqui ...</UploadMessage>;
    }
    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado, utilize apenas arquivos em csv</UploadMessage>
    }
    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
  }

  return (<Dropzone accept="text/csv" onDropAccepted={onUpload} multiple={false}>
    {
      ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
        <DropContainer
          {...getRootProps()}
          isDragActive={isDragActive}
          isDragReject={isDragReject}
        >
          <input {...getInputProps()} />
          {renderDragMessage(isDragActive, isDragReject)}
        </DropContainer>
      )
    }
  </Dropzone>);
}

export default UploadButton;
