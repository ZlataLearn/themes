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

