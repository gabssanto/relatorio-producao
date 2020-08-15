import React from 'react';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import { Container, FileInfo, Preview } from './styles';

function FileList({ files }) {
  return (
    <Container>
      {files.map(uploadedFile => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src="https://avatars2.githubusercontent.com/u/16672623?v=4" />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>{uploadedFile.readableSize}{" "} {uploadedFile.url && <button>Excluir</button>}</span>
            </div>
          </FileInfo>

          {uploadedFile.url && (
            <a href={`report/${encodeURIComponent(uploadedFile.url)}`} rel="noopener noreferrer">
              <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
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
