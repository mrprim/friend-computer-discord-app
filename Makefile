.PHONY:	clean install start

install:
	npm ci

clean:
	rm -rf node_modules
	rm -rf build

build: clean install
	npm run build

start: build
	npm start