import shutil
from argparse import ArgumentParser
from os import path, remove, walk

from PIL import Image

parser = ArgumentParser()
parser.add_argument("input")
parser.add_argument("-s", "--size", dest="size", default="1920x1080")
parser.add_argument("-d", "--delete", action="store_true", default=False)
args = parser.parse_args()

thumbnail = [int(sz.strip()) for sz in args.size.split("x")]
rootdir = args.input
for root, _, files in walk(rootdir):
    for file in files:
        file = path.join(root, file)
        try:
            image = Image.open(file)
        except Exception:
            continue
        image.thumbnail(thumbnail, Image.Resampling.LANCZOS)
        base, ext = path.splitext(file)
        output = f"{base}.webp"
        image.save(output)

        if args.delete and output != file:
            remove(file)
        print(f"{file} -> {output}")
