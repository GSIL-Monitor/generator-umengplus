'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var utils = require('../utils.js');

module.exports = generators.Base.extend({

  initializing: function () {
    utils.debug(this, "static:initializing");

    this.projectName = this.options.projectName || 'my-project';
    this.cssPreProcessor = this.options.cssPreProcessor || "none";
    this.needRedux = this.options.needRedux || false;
  },

  prompting: function () {
    utils.debug(this, "static:prompting");

    var prompts = [];
    if (_.isUndefined(this.options.projectName)) {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: 'What\'s the name of your project?',
        default: this.projectName
      });
    }

    if (_.isUndefined(this.options.needRedux)) {
      prompts.push(      {
        type: 'confirm',
        name: 'needRedux',
        message: 'Do you need Redux?',
        default: this.needRedux
      });
    }

    if (_.isUndefined(this.options.cssPreProcessor)) {
      prompts.push(      {
        type: 'list',
        name: 'cssPreProcessor',
        message: 'Which CSS pre-processor do you need?',
        choices: [
          { name: 'none', value: 'none' },
          { name: 'less', value: 'less' },
          { name: 'sass', value: 'sass' },
          { name: 'stylus', value: 'stylus' }
        ],
        default: this.cssPreProcessor,
        store: true
      });
    }

    if (prompts.length > 0) {
      var done = this.async();

      this.prompt(prompts, function (props) {
        this.projectName = props.projectName;
        this.cssPreProcessor = props.cssPreProcessor;
        this.needRedux = props.needRedux;
        done();
      }.bind(this));
    }
  },

  writing: function () {
    this._createSubFolders();

    this.fs.copy(
      this.templatePath('js/template.js'),
      this.destinationPath('static/js/' + this.projectName + '.js')
    );
  },

  install: function () {
  },

  _createSubFolders: function () {
    utils.debug(this, "static:_createSubFolders");

    mkdirp.sync('static/font');
    this._logFile("static/font");

    mkdirp.sync('static/img');
    this._logFile("static/img");

    //create js folders
    if (this.needRedux) {
      mkdirp.sync('static/js/actions');
      this._logFile("static/js/actions");

      mkdirp.sync('static/js/reducers');
      this._logFile("static/js/reducers");
    }

    mkdirp.sync('static/js/components');
    this._logFile("static/js/components");

    mkdirp.sync('static/js/constants');
    this._logFile("static/js/constants");

    mkdirp.sync('static/js/container');
    this._logFile("static/js/container");

    mkdirp.sync('static/js/lib');
    this._logFile("static/js/lib");

    // mkdirp.sync('static/js/routes');
    // this._logFile("static/js/routes");

    mkdirp.sync('static/js/utils');
    this._logFile("static/js/utils");

    //create css folders
    var cssFolder = 'static/' + this.cssPreProcessor;
    mkdirp.sync(cssFolder);
    this._logFile(cssFolder);

    mkdirp.sync(cssFolder + '/utils');
    this._logFile(cssFolder + '/utils');
  },

  _logFile: function (fileName) {
    this.log(chalk.green("   create ") + fileName);
  }
});
