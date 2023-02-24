// Исходные данные для функции checkStringLength()
const STRING = 'проверяемая строка';
const LENGTH = 10;

// Исходные данные для функции checkPalindrome()
const WORD = 'Лёша на полке клопа нашёл ';

// Исходные данные для функции extractDigits()
const STRING_WITH_DIGITS = '2023 год';

// Исходные данные для функции addingSymbols()
const INITIAL_STRING = 'q';
const MIN_LENGTH = 4;
const ADDITIONAL_SYMBOLS = 'we';

// Функция для проверки длины строки.
const checkStringLength = (string, length) => (string.length <= length ? 'строка проходит по длине' : 'строка не проходит');

// Функция для проверки, является ли строка палиндромом
const checkPalindrome = (word) => {
  const checkedWord = word.toLowerCase().replaceAll(' ', '');
  let reversedWord = '';
  for (let i = 1; i <= checkedWord.length; i++) {
    reversedWord += checkedWord.at(-i);
  }
  return (checkedWord === reversedWord ? 'строка является палиндромом' : 'это не палиндром');
};

// Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
const extractDigits = (string) => {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(string.at(i)) && isFinite(string.at(i))) {
      result += string.at(i);
    }
  }
  return Number(result);
};

// Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины
const addingSymbols = (initialString, minlength, addSymbols) => {
  let addingString = '';
  const addingLength = minlength - initialString.length;
  if (initialString.length < minlength) {
    while (addingString.length < addingLength) {
      if ((addSymbols.length + addingString.length) > addingLength) {
        addingString = addSymbols.slice(0, addingLength - addingString.length).concat(addingString);
        break;
      }
      addingString += addSymbols;
    }
  }
  return addingString.concat(initialString);
};

console.log(checkStringLength(STRING, LENGTH));
console.log(checkPalindrome(WORD));
console.log(extractDigits(STRING_WITH_DIGITS));
console.log(addingSymbols(INITIAL_STRING, MIN_LENGTH, ADDITIONAL_SYMBOLS));
