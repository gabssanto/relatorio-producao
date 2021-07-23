export type SummaryValues = {
  data: object;
  keys: string[];
  legend: string;
}

export type SummaryData = {
  resumoProducao: SummaryValues;
  dadosGerais: SummaryValues;
  turno: SummaryValues;
  faixaEtaria: SummaryValues;
  sexo: SummaryValues;
  tiposDeAtendimento: SummaryValues;
  tipoDeConsulta: SummaryValues;
  vigilanciaEmSaudeBucal: SummaryValues;
  procedimentos: SummaryValues;
  fornecimento: SummaryValues;
  condutaDesfecho: SummaryValues;
  encaminhamento: SummaryValues;
};
