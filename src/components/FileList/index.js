import React from 'react';
import { MdCheckCircle, MdError, MdArrowForward } from 'react-icons/md';
import { Container, FileInfo } from './styles';

function FileList({ files }) {
  return (
    <Container>
      {files.map(uploadedFile => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>{uploadedFile.readableSize}{" "} {uploadedFile.url && <button>Excluir</button>}</span>
            </div>
          </FileInfo>

          {uploadedFile.url && (
            <a href={`report/${encodeURIComponent(uploadedFile.url)}`} rel="noopener noreferrer">
              <MdArrowForward style={{ marginRight: 8 }} size={24} color="#4192D4" />
            </a>
          )}

          {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}
          {uploadedFile.error && <MdError size={24} color="#e57878" />}
        </li>
      ))}
    </Container>
  );
}

export default FileList;
