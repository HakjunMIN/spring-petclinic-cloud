BOOTSTRAP = ./docs/assets/css/bootstrap.css
BOOTSTRAP_LESS = ./less/bootstrap.less
BOOTSTRAP_RESPONSIVE = ./docs/assets/css/bootstrap-responsive.css
BOOTSTRAP_RESPONSIVE_LESS = ./less/responsive.less
DATE=$(shell date +%I:%M%p)
CHECK=\033[32m✔\033[39m
HR=\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#\#


#
# BUILD DOCS
#

build:
	@echo "\n${HR***REMOVED***"
	@echo "Building Bootstrap***REMOVED***"
	@echo "${HR***REMOVED***\n"
	@jshint js/*.js --config js/.jshintrc
	@jshint js/tests/unit/*.js --config js/.jshintrc
	@echo "Running JSHint on javascript***REMOVED***             ${CHECK***REMOVED*** Done"
	@./node_modules/.bin/recess --compile ${BOOTSTRAP_LESS***REMOVED*** ***REMOVED*** ${BOOTSTRAP***REMOVED***
	@./node_modules/.bin/recess --compile ${BOOTSTRAP_RESPONSIVE_LESS***REMOVED*** ***REMOVED*** ${BOOTSTRAP_RESPONSIVE***REMOVED***
	@echo "Compiling LESS with Recess***REMOVED***               ${CHECK***REMOVED*** Done"
	@node docs/build
	@cp img/* docs/assets/img/
	@cp js/*.js docs/assets/js/
	@cp js/tests/vendor/jquery.js docs/assets/js/
	@echo "Compiling documentation***REMOVED***                  ${CHECK***REMOVED*** Done"
	@cat js/bootstrap-transition.js js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-typeahead.js js/bootstrap-affix.js ***REMOVED*** docs/assets/js/bootstrap.js
	@./node_modules/.bin/uglifyjs -nc docs/assets/js/bootstrap.js ***REMOVED*** docs/assets/js/bootstrap.min.tmp.js
	@echo "/**\n* Bootstrap.js v2.3.0 by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" ***REMOVED*** docs/assets/js/copyright.js
	@cat docs/assets/js/copyright.js docs/assets/js/bootstrap.min.tmp.js ***REMOVED*** docs/assets/js/bootstrap.min.js
	@rm docs/assets/js/copyright.js docs/assets/js/bootstrap.min.tmp.js
	@echo "Compiling and minifying javascript***REMOVED***       ${CHECK***REMOVED*** Done"
	@echo "\n${HR***REMOVED***"
	@echo "Bootstrap successfully built at ${DATE***REMOVED***."
	@echo "${HR***REMOVED***\n"
	@echo "Thanks for using Bootstrap,"
	@echo "<3 @mdo and @fat\n"

#
# RUN JSHINT & QUNIT TESTS IN PHANTOMJS
#

test:
	./node_modules/.bin/jshint js/*.js --config js/.jshintrc
	./node_modules/.bin/jshint js/tests/unit/*.js --config js/.jshintrc
	node js/tests/server.js &
	phantomjs js/tests/phantom.js "http://localhost:3000/js/tests"
	kill -9 `cat js/tests/pid.txt`
	rm js/tests/pid.txt

#
# CLEANS THE ROOT DIRECTORY OF PRIOR BUILDS
#

clean:
	rm -r bootstrap

#
# BUILD SIMPLE BOOTSTRAP DIRECTORY
# recess & uglifyjs are required
#

bootstrap: bootstrap-img bootstrap-css bootstrap-js


#
# JS COMPILE
#
bootstrap-js: bootstrap/js/*.js

bootstrap/js/*.js: js/*.js
	mkdir -p bootstrap/js
	cat js/bootstrap-transition.js js/bootstrap-alert.js js/bootstrap-button.js js/bootstrap-carousel.js js/bootstrap-collapse.js js/bootstrap-dropdown.js js/bootstrap-modal.js js/bootstrap-tooltip.js js/bootstrap-popover.js js/bootstrap-scrollspy.js js/bootstrap-tab.js js/bootstrap-typeahead.js js/bootstrap-affix.js ***REMOVED*** bootstrap/js/bootstrap.js
	./node_modules/.bin/uglifyjs -nc bootstrap/js/bootstrap.js ***REMOVED*** bootstrap/js/bootstrap.min.tmp.js
	echo "/*!\n* Bootstrap.js by @fat & @mdo\n* Copyright 2012 Twitter, Inc.\n* http://www.apache.org/licenses/LICENSE-2.0.txt\n*/" ***REMOVED*** bootstrap/js/copyright.js
	cat bootstrap/js/copyright.js bootstrap/js/bootstrap.min.tmp.js ***REMOVED*** bootstrap/js/bootstrap.min.js
	rm bootstrap/js/copyright.js bootstrap/js/bootstrap.min.tmp.js

#
# CSS COMPLILE
#

bootstrap-css: bootstrap/css/*.css

bootstrap/css/*.css: less/*.less
	mkdir -p bootstrap/css
	./node_modules/.bin/recess --compile ${BOOTSTRAP_LESS***REMOVED*** ***REMOVED*** bootstrap/css/bootstrap.css
	./node_modules/.bin/recess --compress ${BOOTSTRAP_LESS***REMOVED*** ***REMOVED*** bootstrap/css/bootstrap.min.css
	./node_modules/.bin/recess --compile ${BOOTSTRAP_RESPONSIVE_LESS***REMOVED*** ***REMOVED*** bootstrap/css/bootstrap-responsive.css
	./node_modules/.bin/recess --compress ${BOOTSTRAP_RESPONSIVE_LESS***REMOVED*** ***REMOVED*** bootstrap/css/bootstrap-responsive.min.css

#
# IMAGES
#

bootstrap-img: bootstrap/img/*

bootstrap/img/*: img/*
	mkdir -p bootstrap/img
	cp img/* bootstrap/img/


#
# MAKE FOR GH-PAGES 4 FAT & MDO ONLY (O_O  )
#

gh-pages: bootstrap docs
	rm -f docs/assets/bootstrap.zip
	zip -r docs/assets/bootstrap.zip bootstrap
	rm -r bootstrap
	rm -f ../bootstrap-gh-pages/assets/bootstrap.zip
	node docs/build production
	cp -r docs/* ../bootstrap-gh-pages

#
# WATCH LESS FILES
#

watch:
	echo "Watching less files***REMOVED***"; \
	watchr -e "watch('less/.*\.less') { system 'make' ***REMOVED***"


.PHONY: docs watch gh-pages bootstrap-img bootstrap-css bootstrap-js