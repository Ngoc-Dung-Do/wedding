watch:
	find | grep -v index.html \
		| grep -v wedding \
		| entr -rc python build.py

dist:
	python build.py --slug "/wedding"
	rm -rf public/*
	cp index.html favicon.ico public/
	cp musics/ js/ css/ images/ fonts/ public/ -r
