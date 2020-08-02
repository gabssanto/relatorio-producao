import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
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

          {!uploadedFile.uploaded && !uploadedFile.error && (
            <div>
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#7159c1' }
                }}
                strokeWidth={10}
                value={uploadedFile.progress}
              />
            </div>
          )}

          {uploadedFile.url && (
            <a href="index.html" target="_blank" rel="noopener noreferrer">
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
