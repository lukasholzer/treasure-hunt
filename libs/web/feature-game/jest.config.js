module.exports = {
  name: 'web-feature-game',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/web/feature-game',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
