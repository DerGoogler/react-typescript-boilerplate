NODE_BIN = ./node_modules/.bin

install:
	npm install --force

dev: licenses
	${NODE_BIN}/webpack --mode=development

prod: licenses
	${NODE_BIN}/webpack --mode=production