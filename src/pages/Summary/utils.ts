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
  return {
    [resumo.id + ' Masculino']: resumo.masculino,
    [resumo.id + ' Feminino']: resumo.feminino,
    [resumo.id + ' Não Informado']: resumo.naoInformado,
  }
}

export const parseFaixaEtaria = (localReports, type: string) => localReports.reduce((reports, report) => {
  const month = monthsObj[Number(report.periodo.inicio.split('/')[1])];
  const reducedType = report[type].map((resumo) => {
    return parseFaixaBySex(resumo);
  })
  return {
    ...reports,
    [month]: {
      data: reducedType,
      month
    }
  }}, {});
