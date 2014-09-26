# insert-rule

> Insert rules into a stylesheet programatically with a simple API

# Install

Using Bower

```shell
bower install -S insert-rule
```

Using `npm`

```shell
npm install -S insert-rule
```

# `insertRule(selector, styles)`

Applies the styles to the selector. The selector can be any CSS selector. That includes `:after` and `:before`, too. Styles can either be plain text or an object. Keys in `camelCase` get converted into `css-case`.

##### Example

```js
insertRule('body:after', 'font-weight: bold;');
```

```js
insertRule('body:after', {
  content: '"Ha-ha!"',
  display: 'block',
  fontSize: '16px'
});
```

You can also remove all of the previously inserted rules.

# `insertRule.clear()`

Only those inserted by the `insert-rule` module will be affected.

# `insertRule.remove(selector)`

Removes style rules that were created using exactly the provided selector.

# `insertRule.context(name)`

You can create a "context" that's self-contained, where rules will be added to a different style element. In this case, `clear()` removes all of the rules in the given context, and `.remove(selector)` only removes those rules matching the selector from the current context.

```js
var foo = insertRule.context('foo');
var bar = insertRule.context('bar');
foo('#foo', 'color:#f00');
bar.remove('#foo'); // nothing happens
foo.remove('#foo'); // rule gets removed!
```

This separation of concerns is most useful when using `insert-rule` in _"small-module"_ type environments.

##### Example

```js
insertRule.clear();
```

# License

MIT
