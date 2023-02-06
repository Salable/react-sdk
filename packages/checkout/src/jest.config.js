const rootConfig = require('../../../jest.config');

rootConfig.projects[0].testEnvironment = 'jsdom';
rootConfig.projects[0].moduleNameMapper = {
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    '<rootDir>/__mocks__/fileMock.js',
  '\\.(css|less|scss)$': 'identity-obj-proxy',
  '#mocks/prisma-client': '<rootDir>/__mocks__/prisma-client.ts',
};
rootConfig.projects[0].setupFilesAfterEnv = ['<rootDir>/jest.setup.ts'];

module.exports = rootConfig;
