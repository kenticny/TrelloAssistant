var Template = function(source, target) {
  this.document = source;
  this.target = target;
};

Template.prototype.get = function(id) {
  this.renderTpl = this.document.querySelector("template#" + id);
  return this;
};

Template.prototype.render = function(data, exdata) {
  var tpl = this.renderTpl.innerHTML;
  var rendered = renderTemplate(tpl, data);
  renderMain(this.target, rendered);
};

Template.prototype.iterator = function(datas, exdata) {
  var rendered = "";
  var tpl = this.renderTpl.innerHTML;
  for(var i = 0; i < datas.length; i++) {
    rendered += renderTemplate(tpl, datas[i], exdata);
  }
  renderMain(this.target, rendered);
}

function renderMain(target, tpl) {
  document.querySelector("#" + target).innerHTML = tpl;
}

function renderTemplate(template, data, exdata) {
  exdata = exdata || {};
  for(var key in data) {
    var reg = new RegExp("\\$\\{\\{" + key + "\\}\\}", "g");
    template = template.replace(reg, data[key]);
  }
  for(var skey in exdata) {
    var sreg = new RegExp("\\$\\{\\{" + skey + "\\}\\}", "g");
    template = template.replace(sreg, exdata[skey](data));
  }
  return template;
}