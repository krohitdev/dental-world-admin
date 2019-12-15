export const environment = {
  production: true,
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
