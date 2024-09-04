import json
import os
import random
import shutil
from os import path

import yaml
from jinja2 import Environment, FileSystemLoader
from PIL import Image
from slugify import slugify


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
    invitation_template = env.get_template("images/invitation/card-template.svg")
    ctx = dict(
        sprites=sorted(get_files("images/sprites/")),
        album_images=sorted(get_files("images/album/")),
        carousel_images=sorted(get_files("images/carousel/")),
        footer_image=data["footer-image"],
        bride_image=data["bride-image"],
        groom_image=data["groom-image"],
        donations=data["donations"],
        events=data["events"],
    )
    rendered = template.render(**ctx)

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
        dest = path.join(output_dir, file)
        print(f"making directory {dest}")
        os.makedirs(dest, exist_ok=True)
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

    """Invitation list"""
    inv_dir = os.path.join(output_dir, "invitation")
    try:
        shutil.rmtree(inv_dir)
    except Exception:
        pass
    os.makedirs(inv_dir, exist_ok=True)
    with open("guest-list.json", encoding="utf-8") as f:
        guests = json.load(f)

    inv_paths = []
    for _, guest_group in guests.items():
        card_url = guest_group["card"]
        for guest_name in guest_group["guests"]:
            # Render
            rendered = template.render(
                **ctx,
                guest_name=guest_name,
                invite_card_url=card_url,
            )
            rendered_card = invitation_template.render(guest_name=guest_name)

            # Write rendered outputs
            out_path = path.join(inv_dir, slugify(guest_name))
            os.makedirs(out_path, exist_ok=True)
            with open(path.join(out_path, "index.html"), "w") as f:
                f.write(rendered)
            with open(path.join(out_path, "invitation.svg"), "w") as f:
                f.write(rendered_card)

            # Save invitation slugs
            url = "https://ngoc-dung-do.github.io"
            inv_paths.append(f"{guest_name}: {url}/{out_path}")

    # Save invitation links
    inv_links_path = path.join(output_dir, "INVITATION_LINKS.txt")
    with open(inv_links_path, "w", encoding="utf-8") as f:
        f.write("\n".join(inv_paths))
    print("Invitation link: " + inv_links_path)
    print("DONE!")


if __name__ == "__main__":
    build()
