<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [Практика](#%D0%BF%D1%80%D0%B0%D0%BA%D1%82%D0%B8%D0%BA%D0%B0)
  - [Объекты](#%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B)
    - [Неглубокое копирование](#%D0%BD%D0%B5%D0%B3%D0%BB%D1%83%D0%B1%D0%BE%D0%BA%D0%BE%D0%B5-%D0%BA%D0%BE%D0%BF%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
    - [Глубокое копирование](#%D0%B3%D0%BB%D1%83%D0%B1%D0%BE%D0%BA%D0%BE%D0%B5-%D0%BA%D0%BE%D0%BF%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)
    - [Глубокая проверка эквивалентности](#%D0%B3%D0%BB%D1%83%D0%B1%D0%BE%D0%BA%D0%B0%D1%8F-%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%BA%D0%B0-%D1%8D%D0%BA%D0%B2%D0%B8%D0%B2%D0%B0%D0%BB%D0%B5%D0%BD%D1%82%D0%BD%D0%BE%D1%81%D1%82%D0%B8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Практика

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

> Проверить, что значение является объектом, можно с помощью `instanceOf`: 
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

