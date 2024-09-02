import os
import shutil
from argparse import ArgumentParser
from os import path

import yaml
from css_html_js_minify import (process_single_css_file,
                                process_single_html_file,
                                process_single_js_file)
from jinja2 import Environment, FileSystemLoader


def get_files(rootdir: str):
    """Find all file paths in a directory.

    If rootdir is a file, return an array of only that file.
    """
    # Guard
    if os.path.isfile(rootdir):
        return [rootdir]

    # Find all
    all_files = []
    for root, _, files in os.walk(rootdir):
        root = root.lstrip("/")
        for file in files:
            if ".git" in file:
                continue
            full_path = path.join(root, file)
            all_files.append(full_path)
    return all_files


def build(
    output_dir: str = "wedding",
    data_file: str = "data.yaml",
):
    """Build the web page directory"""

    """Load data"""
    with open(data_file, encoding="utf-8") as f:
        data = yaml.load(f, Loader=yaml.FullLoader)

    """Render jinja template"""
    env = Environment(loader=FileSystemLoader("."))
    template = env.get_template("template.html")
    sprites = sorted(get_files("images/sprites/"))
    album_images = sorted(get_files("images/album/"))
    carousel_images = sorted(get_files("images/carousel/"))
    rendered = template.render(
        album_images=album_images,
        carousel_images=carousel_images,
        sprites=sprites,
        footer_image=data["footer-image"],
        bride_image=data["bride-image"],
        groom_image=data["groom-image"],
        donations=data["donations"],
        events=data["events"],
    )

    """install files"""
    install_files = [
        "index.html",
        "favicon.ico",
        "musics",
        "js",
        "css",
        "images",
        "fonts",
    ]

    """Cleanup build directory"""
    for file in get_files(output_dir):
        if path.isdir(file):
            shutil.rmtree(file)
        else:
            os.remove(file)

    """Prepare directories"""
    src_files = sum([get_files(src) for src in install_files], [])
    for file in install_files:
        if path.isfile(file):
            continue
        for root, dirs, _ in os.walk(file):
            for dir in dirs:
                dest = path.join(output_dir, root, dir)
                print(f"making directory {dest}")
                os.makedirs(dest, exist_ok=True)

    """Copy the files over"""
    for file in src_files:
        if path.isdir(file):
            continue
        dest = path.join(output_dir, file)

        # Compress if is image
        shutil.copy(file, dest)
        print(f"{file} -> {dest}")

    """Write index file"""
    out_index = path.join(output_dir, "index.html")
    with open(out_index, "w", encoding="utf-8") as f:
        f.write(rendered)

    """minify"""
    for file in get_files(output_dir):
        print(file)
        if file.endswith(".css"):
            process_single_css_file(file, overwrite=True)
        if file.endswith(".html"):
            process_single_html_file(file, overwrite=True)
        if file.endswith(".js"):
            process_single_js_file(file, overwrite=True)

    print("DONE!")


if __name__ == "__main__":
    build()
