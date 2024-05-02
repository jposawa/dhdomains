export const onlyNumbers = (rawValue: string): string => (
  rawValue.replace(/\D/g, "")
);

export const mascaraCPF = (cpfInicial: string) => {
  const numerosCPF = onlyNumbers(cpfInicial);

  const numeroFormatado = numerosCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4").substring(0,14);

  return numeroFormatado;
}

export const decimalNumbers = (rawValue: string): string => {
  const numbers = onlyNumbers(rawValue);

  const decimal = numbers.replace(/([0-9]{2})$/g, ".$1");

  return Number(decimal).toLocaleString("pt-BR");
}