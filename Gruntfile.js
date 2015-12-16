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
				src: 'client-src/less/desktop-manifest.less',
				dest: 'assets/css/desktop.css'
			}
		},
		concat: {
			options: {
				separator: ';' 
			},
			// app: {
			// 	files: [
			// 		{src: [
			// 			'client-src/js-app/base/namespace.js',
			// 			'client-src/js-app/base/config.js',
			// 			'client-src/js-app/utils/*.js',
			// 			'client-src/js-app/models/*.js',
			// 			'client-src/js-app/views/components/*.js',
			// 			'client-src/js-app/views/blocks/*.js',
			// 			'client-src/js-app/views/pages/*.js',
			// 			'client-src/js-app/base/app.js'
			// 			],
			// 		dest: 'assets/js/app.js'}
			// 	]
			// },
			lib: {
				files: [
					{src: 'client-src/js-lib/**/*.js',
					dest: 'web-service/public/js/lib.js'}
				]
			},
		},
		uglify: {
			// app: {
			// 	options: {
			// 		banner: '/*! Fab.fm js <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			// 	},
			// 	files: {
			// 		'web-service/public/js/app.min.js': ['web-service/public/js/app.js']
			// 	}
			// },
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
					'client-src/less/**/*.less',
					'client-src/less/pages/*.less'
				],
				//tasks: ['jshint', 'less', 'concat:desktop', 'uglify:desktop']
				tasks: ['jshint', 'less']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//grunt.registerTask('default', ['jshint', 'less', 'concat:desktop', 'uglify:desktop', 'watch']);
	grunt.registerTask('default', ['jshint', 'less', 'watch']);
	grunt.registerTask('w', ['watch']);
	grunt.registerTask('l', ['less']);
	//grunt.registerTask('js', ['jshint', 'concat:desktop', 'uglify:desktop']);

	grunt.registerTask('library', ['concat:lib', 'uglify:lib']);

};
