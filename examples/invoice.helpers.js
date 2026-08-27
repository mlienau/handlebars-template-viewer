// Select this file along with invoice.html to give the template its helpers.
// Any selected .js file that calls Handlebars.registerHelper / registerPartial is run before compiling.

Handlebars.registerHelper('money', v => '$' + (Number(v) || 0).toFixed(2));

Handlebars.registerHelper('lineTotal', line => (Number(line.hours) || 0) * (Number(line.rate) || 0));

Handlebars.registerHelper('invoiceTotal', lines =>
  (lines || []).reduce((sum, l) => sum + (Number(l.hours) || 0) * (Number(l.rate) || 0), 0));

Handlebars.registerHelper('eq', (a, b) => a === b);
