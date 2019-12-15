// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  ItemperPage: '10',
  BaseURL: 'http://ec2-13-233-120-194.ap-south-1.compute.amazonaws.com:3333/api/v1',
  // BaseURL:'http://192.168.3.225:3333/api/v1',
  AdminAPI: {
    user: '/partner/getAllUsers',
    oneUser: '/partner/showOneUser',
    winner: '/partner/getAllWinners',
    quizStat:'/partner/quiz-stat',
  }
};
