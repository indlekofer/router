# @indlekofer/router

## Usage

```js
import Router from '@indlekofer/router';

var RR = new Router();

RR.add('/search/**', (match) => {return 'test'});

RR.dispatch('/search/test/')((arg) => { console.log(arg);}); // -> 'test'


```
