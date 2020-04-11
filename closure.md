<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Содержание**

- [Замыкания](#%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F)
  - [Определение](#%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5)
  - [Пример использования](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)
  - [Независимые копии областей видимости](#%D0%BD%D0%B5%D0%B7%D0%B0%D0%B2%D0%B8%D1%81%D0%B8%D0%BC%D1%8B%D0%B5-%D0%BA%D0%BE%D0%BF%D0%B8%D0%B8-%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D0%B5%D0%B9-%D0%B2%D0%B8%D0%B4%D0%B8%D0%BC%D0%BE%D1%81%D1%82%D0%B8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Замыкания

## Определение

**Замыкание на область видимости** – особенность работы [областей видимости](scope.md), заключающаяся в том, что области, в которых будет производиться поиск переменных для функции, строго привязан (замкнут) к тому месту, где функция была **создана**, и никак не зависит от того, где она **вызывается**.

## Пример использования

Рассмотрим пример:

```javascript
function outer() {
  let counter = 0;
  function inner() {
    counter++;
    alert(counter);
  }
  inner();
}

outer(); // выведет 1
```

Функция `outer` создает внутри себя функцию `inner`, которую там же и вызывает. Очевидно, что `inner` использует переменную `counter` из `outer`, поскольку эта область видимости доступна для неё.

Но ссылка на функцию `inner` может оказаться и "вне" функции `outer` после её создания:

```javascript
// вариант 1, редко используемый: сохранение в переменную области видимости выше
let inner2;
function outer() {
  let counter = 0;
  function inner() {
    counter++;
    alert(counter);
  }
  inner2 = inner;
}

outer(); // теперь в inner2 записана функция inner
```

```javascript
// вариант 2, более распространенный: возвращение из функции
function outer() {
  let counter = 0;
  function inner() {
    counter++;
    alert(counter);
  }
  return inner;
}

let inner2 = outer(); // теперь в inner2 записана функция inner
```

В обоих случаях мы можем вызвать функцию `inner`, используя переменную `inner2` и получить тот же результат, что и при вызове её внутри `outer`:

```javascript
inner2(); // выведет 1;
inner2(); // выведет 2;
inner2(); // выведет 3;
inner2(); // выведет 4;
```

Это работает по причине того, что хоть мы и вызываем функцию через идентификатор `inner2`, функция замкнута на область видимости, в которой создавалась, и ищет переменную `counter` там, где и раньше – в области видимости функции `outer`.

##  Независимые копии областей видимости

Если в прошлом примере `inner2` была замкнута на область видимости `outer`, то в этом примере `inner2` и `inner3` замкнуты **каждая на свою копию** области видимости функции `outer`, потому что при вызове `outer` область видимости создается заново: 

```javascript
function outer() {
  let counter = 0;
  function inner() {
    counter++;
    alert(counter);
  }
  return inner;
}

let inner2 = outer(); // теперь в inner2 записана функция inner
let inner3 = outer(); // теперь в inner3 записана функция inner
```

```javascript
inner2(); // выведет 1;
inner2(); // выведет 2;
inner2(); // выведет 3;
inner2(); // выведет 4;

inner3(); // выведет 1;
inner3(); // выведет 2;
inner3(); // выведет 3;
```

