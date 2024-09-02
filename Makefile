watch:
	find | grep -v index.html \
		| grep -v '.git' \
		| grep -v wedding | entr -rc python build.py --draft

dist:
	python build.py
