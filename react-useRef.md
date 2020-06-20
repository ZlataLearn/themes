<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [useRef](#useref)
  - [Определение](#%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5)
  - [Когда используется](#%D0%BA%D0%BE%D0%B3%D0%B4%D0%B0-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D1%83%D0%B5%D1%82%D1%81%D1%8F)
  - [API](#api)
    - [Принимает](#%D0%BF%D1%80%D0%B8%D0%BD%D0%B8%D0%BC%D0%B0%D0%B5%D1%82)
    - [Возвращает](#%D0%B2%D0%BE%D0%B7%D0%B2%D1%80%D0%B0%D1%89%D0%B0%D0%B5%D1%82)
    - [Использование](#%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
  - [Примеры](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80%D1%8B)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# useRef

## Определение

**useRef** – хук для получения ссылки на DOM-элемент.

## Когда используется

Когда помимо отрисовки нам нужно как-то взаимодействовать с элементами, которые вернул компонент, например:

* Фокусировка
* Скролл
* Получение положения на странице

## API

### Принимает

1. Исходное значение

### Возвращает

Объект, в котором есть поле `current`, где хранится значение. Объект всегда один, ссылка на него каждый раз одинаковая.

### Использование

Если передать полученный объект любому элементу в атрибут `ref`, в `current` после отрисовки сохранится ссылка на этот элемент в DOM.

## Примеры

```javascript
const Focusable = () => {
    const inputRef = useRef();
    const onClick = () => inputRef.current.focus();
    return (
		<div>
			<input ref={inputRef} />
			<button onClick={onClick}>focus</button>
		</div>
    );
}
```



