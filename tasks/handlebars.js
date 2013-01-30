/*
 *
 * Task: Handlebars
 * Description: Compile handlebars templates to JST files
 * Dependencies: handlebars
 *
 */

module.exports = function(grunt) {

  var exec = require('child_process').exec;

  grunt.registerMultiTask('handlebars', 'Precompile Handlebars template', function() {
    var self = this;
    var done = self.async();

    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      var destDir = f.dest.replace(/[^\/]+$/, '');

      if (!grunt.file.isDir(destDir)) {
        grunt.file.mkdir(destDir);
      }

      var templateDir = src[0];
      var truncateFileCmd = '> ' + f.dest;
      var handlebarsCmd = __dirname + '/../node_modules/.bin/handlebars -m ' + templateDir + '/*.handlebars -f ' + f.dest;

      exec(truncateFileCmd +' && '+ handlebarsCmd, function(err, stdout, stderr) {
        if (err) {
          grunt.fail.fatal(stderr);
        }
        done();
      });
    });
  });
};
