module.exports = function(grunt) {

    grunt.initConfig({
        watch: {
            js: {
                files: "js/**/*.js",
                options: {
                    livereload: true
                }
            },
            css: {
                files: "css/**/*.css",
                options:{
                    livereload: true
                }
            },
            html: {
                files: "*.html",
                options: {
                    livereload: true
                }
            }
        }
    });

    // grunt tasks
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-clean");
    
};
