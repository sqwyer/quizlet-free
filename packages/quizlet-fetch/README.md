```js
const { load } = require('quizlet-fetch')

(async function() {
    const data = await load('https://quizlet.com/750898962/mrs-arana-spanish-2-test-2-verb-list-1-flash-cards/')
    console.log(data);
})();
```