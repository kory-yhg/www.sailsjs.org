var DocCompiler = require('../../api/services/DocCompilerService');

module.exports = function (grunt) {
  grunt.registerTask('docCompiler', 'Runs Doc Compiler Service', function() {

    // Force task into async mode and grab a handle to the "done" function.
    var done = this.async();

    grunt.log.writeln('Compiling documentation to HTML...');
    DocCompiler(function(err) {
      if (err) {
        grunt.log.writeln('The following error occurred when compiling docs:');
        grunt.log.writeln(err);
        done(err);
        return;
      }

      grunt.log.writeln('Compiled docs successfully!');
      done();
    });

  });
};
