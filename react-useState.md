<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [useState](#usestate)
  - [Определение](#%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5)
  - [Когда используется](#%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D1%82%D1%81%D1%8F)
  - [API](#api)
    - [Принимает](#%D0%BF%D1%80%D0%B8%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D1%82)
    - [Возвращает](#%D0%B2%D0%BE%D0%B7%D0%B2%D1%80%D0%B0%D1%89%D0%B0%D0%B5%D1%82)
  - [Примеры](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D1%8B)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# useState

## Определение

**useState** – хук для управления состоянием компонента.

## Когда используется

Когда в компоненте есть данные, которые могут меняться, и от которых зависит его работа или результат. 

## API

### Принимает

1. Состояние по умолчанию или функцию, результатом которой должно быть состояние по умолчанию

### Возвращает

Массив, где:

1. Текущее значение состояния
2. Функция, которую нужно вызвать для обновления состояния. Принимает одно из двух:
   1. Новое значение
   2. Функцию, которая получит старое значение и вернет новое

## Примеры

```javascript
const Counter = () => {
    const [value, setValue] = useState(3); // Начинаем с 3
    const onButtonClick = () => setValue(value + 1); // При клике увеличиваем на 1
    return <button onClick={onButtonClick}>{value}</button>; // Всегда выводим текущее значение
}
```

```javascript
const Counter = () => {
    const [value, setValue] = useState(() => {
        return Math.round(Math.random() * 100)); // Начинаем со случайного числа
    });
    const onButtonClick = () => {
        setValue(oldValue => oldValue + 1); // При клике увеличиваем на 1
    };
    return <button onClick={onButtonClick}>{value}</button>; // Всегда выводим текущее значение
}
```

