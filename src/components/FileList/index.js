import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import { Container, FileInfo, Preview } from './styles';

function FileList() {
    return (
        <Container>
            <li>
                <FileInfo>
                    <Preview src="https://avatars2.githubusercontent.com/u/16672623?v=4" />
                    <div>
                        <strong>profile.png</strong>
                        <span>64kb <button>Excluir</button></span>
                    </div>
                </FileInfo>

                <div>
                    <CircularProgressbar
                        styles={{
                            root: { width: 24 },
                            path: { stroke: '#7159c1' }
                        }}
                        strokeWidth={10}
                        value={6}
                    />
                </div>

                <a href="index.html" target="_blank" rel="noopener noreferrer">
                    <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                </a>

                <MdCheckCircle size={24} color="#78e5d5" />
                <MdError size={24} color="#e57878" />
            </li>
        </Container>
    );
}

export default FileList;