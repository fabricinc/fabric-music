module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			files: ['Gruntfile.js', 'client-src/js-app/**/*.js'],
			options: {
				globals: {
					jQuery: true
				}
			}
		},
		less: {
			files: {
				src: 'client-src/less/manifest.less',
				dest: 'web-service/public/css/app.css'
			}
		},
		concat: {
			options: {
				separator: ';' 
			},
			app: {
				files: [
					{src: [
						'client-src/js-app/base/namespace.js',
						'client-src/js-app/base/config.js',
						'client-src/js-app/utils/*.js',
						'client-src/js-app/models/*.js',
						'client-src/js-app/collections/*.js',
						'client-src/js-app/views/**/*.js',
						'client-src/js-app/base/router.js',
						'client-src/js-app/base/app.js'
						],
					dest: 'web-service/public/js/app.js'}
				]
			},
			lib: {
				files: [
					{src: [
						'client-src/js-lib/jquery-*.js',
						'client-src/js-lib/js.cookie.js',
						'client-src/js-lib/underscore-*.js',
						'client-src/js-lib/backbone-*.js',
					],
					dest: 'web-service/public/js/lib.js'}
				]
			},
		},
		uglify: {
			app: {
				options: {
					banner: '/*! Fab.fm js <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				files: {
					'web-service/public/js/app.min.js': ['web-service/public/js/app.js']
				}
			},
			lib: {
				options: {
					banner: '/*! Fab.fm js -- <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				},
				files: {
					'web-service/public/js/lib.min.js': ['web-service/public/js/lib.js']
				}
			}
		},
		watch: {
			dev: {
				files: [
					'<%= jshint.files %>',
					'client-src/js-app/**/*.js',
					'client-src/less/*/*.less',
					'client-src/less/pages/*.less'
				],
				tasks: ['jshint', 'less', 'concat:app', 'uglify:app']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['jshint', 'less', 'concat:app', 'uglify:app', 'watch']);
	grunt.registerTask('w', ['watch']);
	grunt.registerTask('l', ['less']);
	grunt.registerTask('js', ['jshint', 'concat:app', 'uglify:app']);
	grunt.registerTask('lib', ['concat:lib', 'uglify:lib']);

};
