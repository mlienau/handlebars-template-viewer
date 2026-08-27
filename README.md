# handlebars-template-viewer

Open an HTML file, see it rendered as a Handlebars template, and drive it with form controls
generated from a JSON Schema embedded in the file.

The whole tool is one file: **`index.html`**. Double-click it (or drag it into a browser) — no
build, no server, no install. Handlebars 4.7.8 loads from a CDN, so you need a connection the
first time; to go fully offline, drop `handlebars.min.js` next to `index.html` and point the
`<script src>` at it.

## Using it

1. Open `index.html`.
2. Click **Open template…** (or drag files onto the window) and pick your `.html` / `.hbs` file.
   Select any sibling files it needs at the same time — schema, images, CSS, helper JS.
3. Edit the generated controls; the preview re-renders as you type.

Other bits: the **Data (JSON)** tab lets you paste or hand-edit the whole context, **Reload**
re-reads the file from disk after you edit it (Chrome/Edge), **Save rendered HTML** writes out
the compiled result, and the divider between panel and preview drags.

## Declaring the schema

Add one script tag anywhere in the template. The viewer strips it before compiling, so it never
shows up in the output.

Inline:

```html
<script type="application/schema+json">
{ "type": "object", "properties": { "title": { "type": "string", "default": "Hello" } } }
</script>
```

Or in a separate file (select it alongside the template — `file://` can't fetch it):

```html
<script type="application/schema+json" src="invoice.schema.json"></script>
```

A template with no schema still renders; it just gets an empty context.

### Supported schema

`object` (nested, `required` marks the label), `array` (add/remove rows, primitives or objects),
`string` (`enum` → select, `format` `date` / `date-time` / `time` / `email` / `uri` / `color` /
`password` / `textarea`, `maxLength`, `pattern`), `number` / `integer` (`minimum`, `maximum`,
`multipleOf`, `enum`), `boolean`, and local `$ref`s into `#/$defs` or `#/definitions`.
`title` labels a field, `description` becomes hint text, and `default` (or the first entry in
`examples`) seeds the initial value — good defaults make the first render look real.

## Custom helpers

Any `.js` file in your selection that calls `Handlebars.registerHelper` or `registerPartial` is
executed against Handlebars before compiling, so templates depending on your own helpers work:

```js
Handlebars.registerHelper('money', v => '$' + (Number(v) || 0).toFixed(2));
```

## Examples

- `examples/product-card.html` — inline schema, nested object, string array, array of objects.
- `examples/invoice.html` + `invoice.schema.json` + `invoice.helpers.js` — external schema with
  `$ref`s and custom helpers. Select all three.

## Notes

- Relative `src`/`href` values are rewritten to the files you selected, so local images and
  stylesheets show up in the preview.
- The preview runs in a sandboxed iframe that can run scripts but can't navigate the viewer away.
- Everything stays on your machine; no file is uploaded anywhere.
