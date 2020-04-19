Классы

## Определение

**Классы** в JavaScript – синтаксический сахар над механизмом конструкторов и прототипного наследования.

> Синтаксическим сахаром называют синтаксис, выглядящий иначе, более наглядно и/или удобно, но технически реализующий то же самое, что и другой механизм. 

## Синтаксис

```javascript
class ИмяКласса extends ИмяРодительскогоКласса {
  тело класса
}
```

* `class` – ключевое слово для создания класса
* `ИмяКласса` – идентификатор класса, обычно начинается с большой буквы
* `extends ИмяРодительскогоКласса` – опциональное указание родительского класса для наследования
* `тело класса` – описание методов и полей класса

### Синтаксис тела класса

Тело класса может содержать следующие значения:

* Свойства – аналог `this.smth = …` в конструкторе
* Методы – аналог `this.doSmth = function() {...}` в конструкторе

> Например:
>
> ```javascript
> class Cat extends Animal {
>   species = "cat";
> 	age = 0;
> 	getSomething() {
>  		return 10;   
>   };
> }
> ```

### "Особые" виды методов

* Статические методы
* Геттеры/сеттеры
* Метод `constructor`

#### Статические методы

Статическими методами являются методы, принадлежащие не объектам, создаваемым классом, а самому классу. Так, например, для конструкторов это бы выглядело так:

```javascript
function Cat() {
  // ...
};

Cat.goSomething = function() {...}
```

Для описания статических методов у классов используется ключевое слово `static` перед методом:

```javascript
class A {
  static calc() {...}
};
A.calc();
const a = new A();
a.calc(); // ошибка
```

#### Геттеры/сеттеры

Для описания геттеров и сеттеров свойств, перед методом указывается ключевое слово `get` или `set`

```javascript
class A {
  get key() {
    return 0;
  }
  set key(value) {console.log(value)}
};
const a = new A();
a.key; // 0
```

#### Метод `constructor`

Метод `constructor` позволяет более явно определить поведение конструктора объектов для класса. Он получает аргументы, передаваемые при создании объекта класса, как и обычный конструктор.

```javascript
class A {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name
  }
};
const a = new A('Dobby');
a.getName(); // Dobby
```

## `super`

В методах класса, унаследованного от другого класса, доступно ключевое слово `super`. Оно позволяет:

* В конструкторе вызвать конструктор родительского класса (`super()`)
* Во всех методах вызывать методы, унаследованные от родительского класса

### В конструкторе

Если у класса, наследующего методы другого класса, есть свой метод `constructor`, он должен вызвать `super` с нужными родителю параметрами:

```javascript
class Cat { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' издает звук.');
  }
}

class Lion extends Cat {
  constructor(name, age) {
    super(name);
    this.age = age;
  };
  
  getAge() { return this.age; }
}
```

### В других методах

```javascript
class Cat { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' издает звук.');
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' рычит.');
  }
}

const l = new Lion('Dobby');
l.speak(); 
// Dobby издает звук.
// Dobby рычит.
```

## Классы – сахар для конструкторов и прототипов

Синтаксис классов внутри работает с механизмом прототипного наследования, не создавая ничего принципиально нового. 

Например, вот как (примерно) обрабатывается синтаксис класса "внутри":

```javascript
class Animal {
  constructor(species) {
    this.species = species;
  };
  speak() {
    console.log('*sound*');
  };
}

class Cat extends Animal {
  constructor(name, age) {
    super('cat');
    this.name = name;
    this.age = age;
  };
  speak() {
    super.speak();
    console.log('meow');
  };
}
```

```javascript
function Animal(species) {
	this.species = species;
};
Animal.prototype = {
  speak() {
    console.log('*sound*');
  }
};

function Cat(name, age) {
    Animal.call(this, 'cat');
    this.name = name;
    this.age = age;
};
Cat.prototype = {
    speak() {
        Animal.prototype.speak.call(this);
        console.log('meow');
    }
};
Cat.prototype.__proto__ = Animal.prototype;
```

