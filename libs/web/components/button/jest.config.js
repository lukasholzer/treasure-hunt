module.exports = {
  name: 'web-components-button',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/web/components/button',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
