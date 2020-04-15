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

