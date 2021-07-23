import { SummaryData } from "./types";

export const monthsObj = {
  1: 'Jan',
  2: 'Fev',
  3: 'Março',
  4: 'Abril',
  5: 'Maio',
  6: 'Junho',
  7: 'Julho',
  8: 'Agosto',
  9: 'Setembro',
  10: 'Outubro',
  11: 'Novembro',
  12: 'Dezembro',
}

export const mapToArray = (localReports, type: string) => localReports.reduce((reports, report) => {
  const month = monthsObj[Number(report.periodo.inicio.split('/')[1])];
  const reducedType = report[type].reduce((resumos, resumo) => ({
    ...resumos,
    [resumo.label]: resumo.value
  }), {})
  return {
    ...reports,
    [month]: {
      ...reducedType,
      month
    }
  }}, {});

  //this could become a npm lib, merging nested json into one composed key
const parseFaixaBySex = (resumo) => {
  return Number(resumo.masculino) + Number(resumo.feminino) + Number(resumo.naoInformado);
  // return {
  //   [resumo.id + ' Masculino']: resumo.masculino,
  //   [resumo.id + ' Feminino']: resumo.feminino,
  //   [resumo.id + ' Não Informado']: resumo.naoInformado,
  // }
}

export const parseFaixaEtaria = (localReports, type: string) => localReports.reduce((reports, report) => {
  const month = monthsObj[Number(report.periodo.inicio.split('/')[1])];
  const reducedType = report[type].reduce((acc, resumo) => {
    return acc + parseFaixaBySex(resumo);
  }, 0)
  return {
    ...reports,
    [month]: {
      Total: reducedType,
      month
    }
  }}, {});

  export const summaryTemplate: SummaryData = {
    resumoProducao: {
      data: {},
      keys: ['Registros identificados', 'Registros não identificados'],
      legend: 'Resumo de Produção'
    },
    dadosGerais: {
      data: {},
      keys: ['Gestante', 'Paciente com necessidades especiais'],
      legend: 'Dados Gerais'
    },
    turno: {
      data: {},
      keys: ['Manhã', 'Tarde', 'Noite', 'Não informado'],
      legend: 'Turno'
    },
    faixaEtaria: {
      data: {},
      keys: ['Total'],
      legend: 'Faixa Etaria',
    },
    sexo: {
      data: {},
      keys: ["Masculino", "Feminino", "Não informado"],
      legend: 'Sexo',
    },
    tiposDeAtendimento: {
      data: {},
      keys: ["Consulta agendada", "Escuta inicial  Orientação", "Consulta no dia", "Atendimento de urgncia", "Não informado"],
      legend: 'Tipo de Atendimento',
    },
    tipoDeConsulta: {
      data: {},
      keys: ["Primeira consulta odontolgica programática",
        "Consulta de retorno em odontologia", "Consulta de manutenção em odontologia", "Não informado"],
      legend: 'Tipo de Consulta',
    },
    vigilanciaEmSaudeBucal: {
      data: {},
      keys: ["Abscesso dentoalveolar", "Alteração em tecidos moles",
        "Dor de dente",
        "Fendas ou fissuras labiopalatais", "Fluorose dentária moderada ou severa"
        , "Traumatismo dentoalveolar", "Não identificado", "Não informado"],
      legend: 'Vigilancia em Saude Bucal',
    },
    procedimentos: {
      data: {},
      keys: [],
      legend: 'Procedimentos',
    },
    fornecimento: {
      data: {},
      keys: ['Creme dental', 'Escova dental', 'Fio dental', 'Não informado'],
      legend: 'Fornecimento',
    },
    condutaDesfecho: {
      data: {},
      keys: ["Retorno para consulta agendada", "Agendamento para outros profissionais AB",
        "Agendamento para NASF", "Agendamento para grupos", "Alta do episdio", "Não informado", "Tratamento concluído"],
      legend: 'Conduta/Desfecho'
    },
    encaminhamento: {
      data: {},
      keys: [],
      legend: 'Encaminhamento'
    }
  }
