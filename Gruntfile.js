module.exports = function(grunt) {
  (require('load-grunt-tasks'))(grunt);
  grunt.registerTask('default', ['concurrent:default']);
  return grunt.initConfig({    
    connect: {
      server: {
        options: {
          port: 8000,
          base: ['src/'],
          keepalive: true
        }
      }
    },    
    concurrent: {
      "default": ['connect'],
      options: {
        logConcurrentOutput: true
      }
    }
  });
};