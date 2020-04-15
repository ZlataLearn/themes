<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [Конструкторы](#%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D0%BE%D1%80%D1%8B)
  - [Определение](#%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5)
  - [Принцип работы](#%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF-%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B)
  - [Пример конструктора](#%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%D0%BA%D0%BE%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%82%D0%BE%D1%80%D0%B0)
  - [Свойство `.prototype`](#%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2%D0%BE-prototype)
  - [`instanceof`](#instanceof)
  - [Наследование (функциональное)](#%D0%BD%D0%B0%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D0%B5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Конструкторы

## Определение

**Конструктор** – любая функция (кроме стрелочных), вызванная с  оператором `new`. Предназначены для создания (конструирования) новых объектов. 

## Принцип работы

Когда любая функция вызывается с помощью оператора `new` (`new Foo()` или `new bar()`), за ней закрепляется новый пустой объект и ссылка на него помещается в `this` этой функции. 

Если функция вернет любой объект, он вернется в место её вызова, как обычно. В противном случае из конструктора вернется новый сконструированный объект (который был в `this`). 

> Обычно названия конструкторов пишут с большой буквы, но это принято исключительно как стилевая договоренность. 

## Пример конструктора

```javascript
function Animal(species, height, age, weight) {
  this.species = species;
  this.height = height;
  this.age = age;
  this.weight = weight;
}

const dobby = new Animal("cat", 30, 4, 5.8);
```

Здесь функция `Animal` конструирует из аргументов и `this` новый объект, который будет помещен в переменную `dobby`:

```javascript
{
	species: "cat",
  height: 30,
  age: 4,
  weight: 5.8,
}
```

## Свойство `.prototype`

Если у конструктора есть свойство `.prototype`, объект из него будет помещен в `__proto__` созданного объекта:

```javascript
Animal.prototype = {
  grow() {
    this.age++;
    this.height *= 1.02;
    this.weight *= 1.04;
  },
}
```

Так общие для всех объектов, конструируемых `Animal`, функции будут доступны для всех этих объектов:

```javascript
dobby.grow();
```

```javascript
dobby будет содержать {
	species: "cat",
	height: 30.6,
	age: 5,
	weight: 6.032,
}
```

Подробнее в [прототипном наследовании](prototype.md).

## `instanceof`

С помощью оператора `instanceof` можно проверить, связан ли объект с конструктором:

```javascript
dobby instanceof Animal // true
dobby instanceof Object // тоже true, потому что Animal "унаследован" от Object
```

## Наследование (функциональное)

Для того, чтобы "расширить" работу конструктора, можно унаследовать от него другой. Для этого используют метод `call` или `apply` того конструктора, от которого хотят унаследоваться:

```javascript
function Cat(height, age, weight) {
	Animal.call(this, 'cat', height, age, weight);
	this.fur = true;
}

Cat.prototype = {
  ...Animal.prototype,
  meow() {
    console.log('meow');
  }
}
```

Здесь при вызове конструктора `Cat` он вызывает конструктор `Animal`, связывая его с текущим `this`, чтобы он мог создать объект, с которым можно работать дальше, расширяя `Animal`.

