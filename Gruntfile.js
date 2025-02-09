const webpackConfig = require('./webpack.config');

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: 'client/dist/bundle.js',
        dest: 'dist/built.js',
      },
    },

    uglify: {
      my_target: {
        files: {
          'dist/built.js': ['dist/built.js'],
        },
      },
    },

    eslint: {
      options: {
        quiet: true,
      },
      target: ['dist/built.js'],
    },

    cssmin: {
      'dist/output.css': ['client/src/App.css'],
    },

    nodemon: {
      dev: {
        script: 'server/index.js',
      },
    },

    watch: {
      scripts: {
        files: [
          'client/dist/bundle.js',
        ],
        tasks: [
          'concat',
          'uglify',
        ],
      },
      css: {
        files: 'client/src/App.css',
        tasks: 'cssmin',
      },
    },

    shell: {
      prodServer: {
        command: 'pm2 start 3rd-Wheel --watch',
      },
    },

    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
      },
      prod: webpackConfig,
      dev: webpackConfig,
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('server-dev', () => {
    grunt.task.run(['nodemon', 'watch']);
  });

  grunt.registerTask('build', [
    'webpack', 'concat', 'uglify', 'cssmin',
  ]);

  grunt.registerTask('upload', () => {
    if (grunt.option('prod')) {
      grunt.task.run(['shell']);
    } else {
      grunt.task.run(['server-dev', 'watch']);
    }
  });

  grunt.registerTask('deploy', [
    'build', 'upload',
  ]);
};
