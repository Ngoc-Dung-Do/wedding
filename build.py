import json
import os
import shutil
from argparse import ArgumentParser
from distutils.dir_util import copy_tree
from os import path

import yaml
from jinja2 import Environment, FileSystemLoader


def make_js(var, obj):
    data = json.dumps(obj, ensure_ascii=False, indent=4)
    return f"{var} = {data}"


def get_files(rootdir):
    all_files = []
    for root, _, files in os.walk(rootdir):
        root = root.lstrip("/")
        for file in files:
            full_path = path.join(root, file)
            all_files.append(full_path)
    return all_files


# Load data
with open("data.yaml", encoding="utf-8") as f:
    data = yaml.load(f, Loader=yaml.FullLoader)
images = [
    # album images
    make_js("albumImages", get_files("images/album/")),
    # Carousel images
    make_js("carouselImages", get_files("images/carousel/")),
]

# Load jinja env
env = Environment(loader=FileSystemLoader("."))
template = env.get_template("template.html")
rendered = template.render(
    album_images=get_files("images/album/"),
    carousel_images=get_files("images/carousel/"),
    footer_image="images/album/NTD01947.webp",
    donations=data["donations"],
    events=data["events"],
)


def install_dist(prefix="wedding"):
    install_files = [
        "index.html",
        "favicon.ico",
        "musics",
        "js",
        "css",
        "images",
        "fonts",
    ]

    # Clean everything
    # for root, dirs, files in os.walk(prefix):
    #     for dir in dirs:
    #         dirpath = os.path.join(root, dir)
    #         print(dirpath)
    #         shutil.rmtree(dirpath)
    #     for file in files:
    #         filepath = os.path.join(root, file)
    #         os.remove(filepath)

    # Install every files
    for file in install_files:
        dest = f"{prefix}/{file}"
        print(f"{file} -> {dest}")
        if os.path.isdir(file):
            copy_tree(file, dest)
        else:
            shutil.copy(file, dest)


with open("index.html", "w", encoding="utf-8") as f:
    f.write(rendered)
install_dist()
