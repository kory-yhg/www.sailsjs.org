module.exports = function (grunt) {

  // grunt.registerTask('heroku:production', [
  grunt.registerTask('prod', [
    'clean:dev',
    'docCompiler',
    'jst:dev',
    'less:dev',
    'copy:dev',
    'concat',
    'uglify',
    'cssmin',
    'hash',
    'copy:dist',
    'clean:prod',
    'sails-linker:prodJs',
    'sails-linker:prodStyles'
  ]);

  grunt.registerTask('heroku:production', [
    'clean:dev',
    'docCompiler',
    'jst:dev',
    'less:dev',
    'copy:dev',
    'concat',
    'uglify',
    'cssmin',
    'hash',
    'copy:dist',
    'clean:prod',
    'sails-linker:prodJs',
    'sails-linker:prodStyles'
  ]);


};
