watch:
	find | entr -rc python build.py

dist:
	python build.py
	rm -rf public/*
	cp index.html favicon.ico public/
	cp js/ css/ images/ fonts/ public/ -r
