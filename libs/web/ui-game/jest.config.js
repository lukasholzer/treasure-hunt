module.exports = {
  name: 'web-ui-game',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/web/ui-game',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
