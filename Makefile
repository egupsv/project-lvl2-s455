install: 
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

publish:
	npm publish

lint:
	npx eslint .
