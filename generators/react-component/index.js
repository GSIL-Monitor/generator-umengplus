'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var inquirer = require('inquirer');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the amazing ' + chalk.red('generator-react-new-component') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'componentName',
        message: 'What\'s the name of the new component?',
        default: 'MyComponent'
      },
      {
        type: 'list',
        name: 'stylesheetExtension',
        message: 'Which CSS pre-processor do you need?',
        choices: [
          { name: 'css', value: 'css' },
          { name: 'less', value: 'less' },
          { name: 'sass', value: 'sass' },
          { name: 'stylus', value: 'styl' }
        ],
        store: true,
        default: 'css'
      }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    var componentName = this.props.componentName;
    var jsName = componentName + '.' + 'js';
    var stylesheetName = componentName + '.' + this.props.stylesheetExtension;
    var jsFullPath = this.destinationPath(componentName + '/' + jsName);
    var stylesheetFullPath = this.destinationPath(componentName + '/' + stylesheetName);

    this.fs.copyTpl(
      this.templatePath('componentFile'),
      this.destinationPath(jsFullPath),
      {
        componentName: componentName,
        stylesheetExtension: this.props.stylesheetExtension
      }
    );

    if (!!this.props.stylesheetExtension) {
      this.fs.copy(
        this.templatePath('stylesheetFile'),
        this.destinationPath(stylesheetFullPath)
      );
    }
  }
});
