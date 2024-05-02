/* eslint-disable @typescript-eslint/no-explicit-any */
import { NAMESPACE } from "../constants/general";
import { SideNumber } from "../types";

/**
 * Cria um clone do objeto (Ou array) independente do original
 *
 * @param baseObj - Objeto a ser clonado
 *
 * @returns Novo Objeto (Ou Array)
 */
export const cloneObj = (baseObj: unknown) =>
	JSON.parse(JSON.stringify(baseObj));

/**
 * Verifica se 2 objetos (Ou Arrays) são iguais
 *
 * @param obj1 - Primeiro objeto a ser testado
 * @param obj2 - Segundo objeto a ser testado
 *
 * @returns {boolean}
 */
export const isEqual = (obj1: unknown, obj2: unknown) => {
	const strObj1 = JSON.stringify(obj1);
	const strObj2 = JSON.stringify(obj2);

	return strObj1 === strObj2;
};

/**
 * Salva dado no localStorage ou sessionStorage
 *
 * @param {string} key - Chave identificadora do dado salvo
 * @param {unknown} value - Valor a ser salvo
 * @param {object} options - Opções no momento de salvar
 * @param {boolean} options.needParse - (Opcional) Se precisa transformar em string antes de salvar (Para Arrays e Objetos)
 * @param {boolean} options.persistData - (Opcional) Se deve manter mesmo quando fechar aba (Padrão true)
 */
export const saveStorage = (
	key: string,
	value: unknown,
	options: { needParse?: boolean; persistData?: boolean } = {}
) => {
	const { needParse = false, persistData = true } = options;
	const finalKey = withNamespace(key);
	const usedFunc = persistData ? localStorage : sessionStorage;
	const finalValue = needParse ? JSON.stringify(value) : value as string;

	usedFunc.setItem(finalKey, finalValue);
};

/**
 * Carrega dado no localStorage ou sessionStorage
 *
 * @param {string} key - Chave identificadora do dado salvo
 * @param {boolean} needParse - (Opcional) Se precisa transformar em objeto antes de retornar o valor (Para Arrays e Objetos)
 * @param {boolean} persistData - (Opcional) Se deve buscar em local de memória que persistiu o dado, mesmo quando fechar aba (Padrão true)
 *
 * @returns {any | undefined} Valor que estava salvo com essa chave
 */
export const loadStorage = (
	key: string,
	options: {
		needParse?: boolean;
		dataPersisted?: boolean;
	} = {}
) => {
	const { needParse = false, dataPersisted = true } = options;
	const finalKey = withNamespace(key);
	const usedFunc = dataPersisted ? localStorage : sessionStorage;

	const rawValue = usedFunc.getItem(finalKey);

	if (!rawValue) {
		return undefined;
	}

	return needParse ? JSON.parse(rawValue) : rawValue;
};

// /**
//  * Transforma em número e, em caso de falha, retorna 0
//  *
//  * @param valorInicial
//  *
//  * @returns {number}
//  */
// const toNumber = (initialValue: string | number, valorPadrao = 0) => {
// 	if (!initialValue) {
// 		return valorPadrao;
// 	}

// 	return isNaN(Number(initialValue)) ? valorPadrao : Number(initialValue);
// };

/**
 * Pega 2 números e define se number1 deve vir antes ou depois que number2
 *
 * @param {number} number1
 * @param {number} number2
 * @param {boolean} shouldRevert - (Optional) If should rever the sorting order
 *
 * @returns {number} Valor que pode ser -1, 0 ou 1 informando posição de number1 em relação a number2
 */
export const sortOrder = (number1 = 0, number2 = 0, shouldRevert = false) => {
	const diff = 0 - (number1 < number2 ? 1 : -1);
	const multiplier = shouldRevert ? -1 : 1;

	return !diff ? 0 : (diff / Math.abs(diff)) * multiplier;
};

/**
 * Gera lista ordenada de objetos
 *
 * @param {Array<object>} list
 * @param {object} options
 * @param {string} options.sortKey - Chave usada como parâmetro para ordenar
 * @param {boolean} options.revertOrder - Se deve fazer ordenação reversa (Trocar de Crescente para Decrescente)
 *
 * @returns {Array<object>} Lista de objetos ordenados
 */
export const sortElements = (
	list: unknown[],
	options: { sortKey?: string; revertOrder?: boolean } = {}
) => {
	const { sortKey = "order", revertOrder = false } = options;

	return list.sort((itemA: any, itemB: any) => {
		return sortOrder(itemA[sortKey], itemB[sortKey], revertOrder);
	});
};

export const groupData = (
	list: unknown[],
	groupKey = "linha",
	returnArray = false
) => {
	const groupedList: any = {};

	list.forEach((item: any) => {
		if (!groupedList[item[groupKey]]) {
			groupedList[item[groupKey]] = [];
		}

		groupedList[item[groupKey]].push(item);
	});

	return returnArray ? Object.values(groupedList) : groupedList;
};

export const withNamespace = (rawValue: string): string =>
	`${NAMESPACE}@${rawValue}`;

/**
 * Calculates if provided number, in relation from 0 to {maxValue}, is before, after or in middle point
 * If -1 it's before half way, 1 is after half and 0 is exactly in the middle
 *
 * @param {number} currentValue tested number
 * @param {number} maxValue maximum (inclusive) value
 *
 * @returns {SideNumber} -1 | 0 | 1
 */
export const getSideNumber = (
	currentValue: number,
	maxValue: number
): SideNumber => {
	const middlePoint = maxValue / 2;
	const rawResult = currentValue - middlePoint;
	const divider = rawResult === 0 ? 1 : Math.abs(rawResult);

	const convertedResult = rawResult / divider;

	return convertedResult as SideNumber;
};
