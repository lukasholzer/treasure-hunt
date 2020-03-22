module.exports = {
  name: 'web-feature-lobby',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/web/feature-lobby',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
