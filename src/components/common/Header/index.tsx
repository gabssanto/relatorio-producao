import React from 'react';
import { BackButton, SavePDFButton, Header } from './styles';
import ReactToPrint from 'react-to-print';
import { MdArrowBack, MdPrint } from 'react-icons/md';

interface Props {
  printRef: any;
}

const HeaderComponent: React.FC<Props> = ({ printRef }) => {
  return (
    <Header>
      <BackButton href="/"><MdArrowBack /> Voltar</BackButton>
      <ReactToPrint
        trigger={() => <SavePDFButton><MdPrint /> Salvar PDF</SavePDFButton>}
        content={() => printRef.current}
      />
    </Header>
  );
}

export default HeaderComponent;
