<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [Практика](#%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D0%BA%D0%B0)
  - [Объекты](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B)
    - [Неглубокое копирование](#%D0%BD%D0%B5%D0%B3%D0%BB%D1%83%D0%B1%D0%BE%D0%BA%D0%BE%D0%B5-%D0%BA%D0%BE%D0%BF%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
    - [Глубокое копирование](#%D0%B3%D0%BB%D1%83%D0%B1%D0%BE%D0%BA%D0%BE%D0%B5-%D0%BA%D0%BE%D0%BF%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
    - [Глубокая проверка эквивалентности](#%D0%B3%D0%BB%D1%83%D0%B1%D0%BE%D0%BA%D0%B0%D1%8F-%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B0-%D1%8D%D0%BA%D0%B2%D0%B8%D0%B2%D0%B0%D0%BB%D0%B5%D0%BD%D1%82%D0%BD%D0%BE%D1%81%D1%82%D0%B8)
    - [`defineProperty`](#defineproperty)
  - [Замыкания](#%D0%B7%D0%B0%D0%BC%D1%8B%D0%BA%D0%B0%D0%BD%D0%B8%D1%8F)
    - [Сумма двух чисел](#%D1%81%D1%83%D0%BC%D0%BC%D0%B0-%D0%B4%D0%B2%D1%83%D1%85-%D1%87%D0%B8%D1%81%D0%B5%D0%BB)
  - [Контекст](#%D0%BA%D0%BE%D0%BD%D1%82%D0%B5%D0%BA%D1%81%D1%82)
    - [Список ключей объекта](#%D1%81%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B9-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%B0)
  - [Функции высшего порядка](#%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%B8-%D0%B2%D1%8B%D1%81%D1%88%D0%B5%D0%B3%D0%BE-%D0%BF%D0%BE%D1%80%D1%8F%D0%B4%D0%BA%D0%B0)
    - [Логгер](#%D0%BB%D0%BE%D0%B3%D0%B3%D0%B5%D1%80)
  - [Конструкторы](#%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D0%BE%D1%80%D1%8B)
    - [Счетчик](#%D1%81%D1%87%D0%B5%D1%82%D1%87%D0%B8%D0%BA)
    - [Счетчик + chaining](#%D1%81%D1%87%D0%B5%D1%82%D1%87%D0%B8%D0%BA--chaining)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Практика

Практические задания по разным темам.

## Объекты

### Неглубокое копирование

Реализуйте функцию неглубокого копирования объектов. Она должна возвращать копию объекта, получая аргументом исходный объект. 

Пример использования:

```javascript
const object = {
  a: 'a',
  b: 'b',
  c: {
    ca: 'ca',
    cb: 'cb',
    cc: {
      key: 'value',
    }
  },
};
const newObject = copyObject(object);
console.log(newObject !== object); // true
console.log(newObject.c.cc !== object.c.cc); // false
console.log(newObject, object); // выведет одинаковые объекты
```

### Глубокое копирование

Реализуйте функцию глубокого копирования объектов. Она должна возвращать копию объекта, получая аргументом исходный объект. 

> Проверить, что значение является объектом, можно с помощью `instanceof`: 
>
> ```javascript
> if (someValue instanceof Object) {...}
> ```

Пример использования:

```javascript
const object = {
  a: 'a',
  b: 'b',
  c: {
    ca: 'ca',
    cb: 'cb',
    cc: {
      key: 'value',
    }
  },
};
const newObject = copyObject(object);
console.log(newObject !== object); // true
console.log(newObject, object); // выведет одинаковые объекты
```

### Глубокая проверка эквивалентности

Реализуйте функцию проверки эквивалентности объектов. Она должна возвращать `true`, если два объекта одинаковые и `false` , если нет.

Пример использования:

```javascript
const object = { a: 'a' };
const otherObject = { a: 'a' };
console.log(isEqual(object, otherObject)); // true
```

### `defineProperty`

Есть объект `{ name: '', lastName: '' }`.

Добавьте свойство `fullName` этому объекту. При чтении оно должно соединять `name` и `lastName` (через пробел). При записи в него должно разбивать то, что записано, по пробелам и записывать в `name` и `lastName`.

> - Геттер и сеттер могут использовать `this`.
> - Строку можно разбить на массив методом `.split(divider)`

## Замыкания

### Сумма двух чисел

Реализуйте функцию, которая будет позволять складывать два числа в таком виде:

```javascript
sum(10)(30); // 40
```

## Контекст

### Список ключей объекта

Реализуйте функцию, которая для любого объекта (через контекст) будет отдавать массив со всеми его ключами:

```javascript
function getKeys() {...}

const obj = {
  // какие-то свойства
  getKeys
};
                    
obj.getKeys(); // => []
```

## Функции высшего порядка

### Логгер

Реализуйте функцию, которая модифицирует любые другие функции, добавляя логгирование с помощью `console.log`.

```javascript
const sum = withLogger((a, b, c) => {
  return a + b + c;
});

const s = sum(1, 2, 3);
/* 
  В лог попадет:
  Входные аргументы 1 2 3
  Результат 6
*/
console.log(s === 6); // true

// или

const objectsAreEqual = withLogger(function objectsAreEqual(left, right) {
  for (key in left) {
    if (!(key in right)) {
      return false;
    }
  }

  for (key in right) {
    if (!(key in left)) {
      return false;
    }

    const leftOne = left[key];
    const rightOne = right[key];

    if (leftOne !== rightOne) {
      if ([leftOne, rightOne].every((value) => value instanceof Object)) {
        if (!objectsAreEqual(leftOne, rightOne)) {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  return true;
});

const equal = objectsAreEqual(
  { a: 'a', b: false }, 
  { a: 'a', b: false }
);
/* 
  В лог попадет:
  Входные аргументы { a: 'a', b: false } { a: 'a', b: false }
  Результат true
*/
console.log(equal); // true
```

## Конструкторы

### Счетчик

Реализуйте конструктор `Counter`, который будет создавать объект, который можно будет использовать следующим образом:

```javascript
const counter = new Counter(); // или new Counter(10) для начального значения
counter.increment(); 
counter.increment();
counter.decrement();
console.log(counter.getValue()); // 1
counter.increment(100);
counter.decrement(4);
console.log(counter.getValue()); // 97
counter.reset();
console.log(counter.getValue()); // 0 или, если было, начальное значение
```

### Счетчик + chaining

Добавьте к счетчику из прошлого задания возможность чейнинга:

```javascript
const counter = new Counter(2);
counter.increment(10).decrement(5).getValue(); // 7
```

> Чейнинг должны поддерживать только методы кроме `getValue` 