<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
[Назад](README.md)<br />**Содержание**

- [Кастомные хуки](#%D0%BA%D0%B0%D1%81%D1%82%D0%BE%D0%BC%D0%BD%D1%8B%D0%B5-%D1%85%D1%83%D0%BA%D0%B8)
  - [Определение](#%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5)
  - [Принцип использования](#%D0%BF%D1%80%D0%B8%D0%BD%D1%86%D0%B8%D0%BF-%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F)
    - [1. Обернуть в функцию](#1-%D0%BE%D0%B1%D0%B5%D1%80%D0%BD%D1%83%D1%82%D1%8C-%D0%B2-%D1%84%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8E)
    - [2. Возвращать и получать нужные данные](#2-%D0%B2%D0%BE%D0%B7%D0%B2%D1%80%D0%B0%D1%89%D0%B0%D1%82%D1%8C-%D0%B8-%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B0%D1%82%D1%8C-%D0%BD%D1%83%D0%B6%D0%BD%D1%8B%D0%B5-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5)
    - [3. Вынести из компонента](#3-%D0%B2%D1%8B%D0%BD%D0%B5%D1%81%D1%82%D0%B8-%D0%B8%D0%B7-%D0%BA%D0%BE%D0%BC%D0%BF%D0%BE%D0%BD%D0%B5%D0%BD%D1%82%D0%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Кастомные хуки

## Определение

**Кастомным** называют хуки, созданные с помощью встроенных в react хуков. Такие хуки можно выносить из компонентов и переиспользовать в других местах. 

## Принцип использования

```javascript
const Counter = () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(oldCount => oldCount + 1);
    }, delay);
    
    return () => clearInterval(interval);
  }, [delay]);
  
  return (
    <div>
      {count}
      <input value={delay} onChange={e => setDelay(+e.target.value)} />
    </div>
  );
}
```

Здесь используются хуки `useState` и `useEffect`, встроенные в реакт. В итоге компонент получает функциональность увеличивающегося на `1` каждые `delay` милисекунд `count`. Это можно было бы переиспользовать в другом компоненте.

### 1. Обернуть в функцию

Чтобы вынести хук из компонента, его нужно "обернуть" в отдельную функцию:

```javascript
const Counter = () => {
  const useIncrement = () => {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCount(oldCount => oldCount + 1);
      }, delay);
      
      return () => clearInterval(interval);
    }, [delay]);
  }
  useIncrement();
  
  return (
    <div>
      {count}
      <input value={delay} onChange={e => setDelay(+e.target.value)} />
    </div>
  );
}
```

### 2. Возвращать и получать нужные данные

В таком виде это работать не будет – у компонента теперь нет доступа к `count`, `delay` и `setDelay`. Нужно сделать так, чтобы они возвращались из `useIncrement`:

```javascript
const Counter = () => {
  const useIncrement = () => {
    const [count, setCount] = useState(0);
    const [delay, setDelay] = useState(1000);
    
    useEffect(() => {
      const interval = setInterval(() => {
        setCount(oldCount => oldCount + 1);
      }, delay);
      
      return () => clearInterval(interval);
    }, [delay]);
    
    return [count, delay, setDelay]
  }
  const [count, delay, setDelay] = useIncrement();
  
  return (
    <div>
      {count}
      <input value={delay} onChange={e => setDelay(+e.target.value)} />
    </div>
  );
}
```

### 3. Вынести из компонента

Теперь `useIncrement` можно вынести из компонента, даже в отдельный файл:

```javascript
// useIncrement.js

const useIncrement = () => {
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(oldCount => oldCount + 1);
    }, delay);
    
    return () => clearInterval(interval);
  }, [delay]);
  
  return [count, delay, setDelay]
}
```

```javascript
// Counter.jsx
const Counter = () => {
  const [count, delay, setDelay] = useIncrement();
  
  return (
    <div>
      {count}
      <input value={delay} onChange={e => setDelay(+e.target.value)} />
    </div>
  );
}
```

```javascript
// OtherComponent.jsx
const OtherComponent = () => {
  const [count, delay, setDelay] = useIncrement();
  
  return (
    <div>
      ......
    </div>
  );
}
```

