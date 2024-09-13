module.exports = function (plop) {
  // 创建一个简单的 NestJS 模块生成器
  // Handlebars

  plop.setGenerator('nestjs-module', {
    description: '创建一个新的 NestJS 模块',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: '模块名称是什么？',
      },
      // {
      //   type: 'input',
      //   name: 'controllerName',
      //   message: '控制器名称是什么？',
      // },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.module.ts',
        templateFile: 'plop-templates/module.hbs',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.controller.ts',
        templateFile: 'plop-templates/controller.hbs',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.service.ts',
        templateFile: 'plop-templates/service.hbs',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.dto.ts',
        templateFile: 'plop-templates/dto.hbs',
      },
      {
        type: 'add',
        path: 'src/{{kebabCase name}}/{{kebabCase name}}.permissions.ts',
        templateFile: 'plop-templates/permissions.hbs',
      },
    ],
  });
};
