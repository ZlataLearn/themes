<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [Чистые функции](#%D1%87%D0%B8%D1%81%D1%82%D1%8B%D0%B5-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8)
  - [Определение](#%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5)
  - [Свойства чистых функций](#%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%B0-%D1%87%D0%B8%D1%81%D1%82%D1%8B%D1%85-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B9)
  - [Пример "не чистых" функций](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%BD%D0%B5-%D1%87%D0%B8%D1%81%D1%82%D1%8B%D1%85-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B9)
  - [Пример чистых функций](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D1%87%D0%B8%D1%81%D1%82%D1%8B%D1%85-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Чистые функции

## Определение

**Чистые функции** – функции, которые являются детерминированными и не имеют побочных эффектов. 

## Свойства чистых функций

* Детерминированность
* Отсутствие побочных эффектов
* Ссылочная прозрачность

> Функция является детерминированной, если для одного и того же набора входных значений она **всегда** возвращает одинаковый результат.

> Побочными эффектами называются любые действия, влияющие на данные вне функции и/или совершающие ввод/вывод данных и т.д.

> Ссылочная прозрачность означает, что вызов функции с какими-либо аргументами можно заменить на результат работы этой функции без каких-либо изменений остального кода.

## Пример "не чистых" функций

```javascript
function calcSum(a, b, c) {
  console.log(`a = ${a}, b = ${b}, c = ${c}`);
  return a + b + c;
}
```

```javascript
function getTime() {
  const d = new Date();
  return d.getTime();
}
```

```javascript
function other() {...}

function foo() {
  return other();
}
```

## Пример чистых функций

```javascript
function calcSum(a, b, c) {
  return a + b + c;
}
```

```javascript
function getTime(d) {
  return d.getTime();
}
```

```javascript
function foo(other) {
  return other();
}
```

