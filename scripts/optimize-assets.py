"""Generate WebP images and PWA icons for Sun Pride."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMG = ROOT / "assets" / "img"

JPG_DIRS = [IMG / "courses", IMG / "works", IMG]
SINGLE_JPGS = [IMG / "about-tatyana.jpg"]


def to_webp(src: Path, quality: int = 82) -> None:
    dest = src.with_suffix(".webp")
    with Image.open(src) as im:
        im.save(dest, "WEBP", quality=quality, method=6)
    print(f"webp: {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KB)")


def make_icons() -> None:
    src = IMG / "courses" / "course-bahroma.jpg"
    with Image.open(src) as im:
        im = im.convert("RGB")
        for size, name in ((192, "icon-192.png"), (512, "icon-512.png"), (180, "apple-touch-icon.png")):
            icon = im.copy()
            icon.thumbnail((size, size), Image.Resampling.LANCZOS)
            w, h = icon.size
            canvas = Image.new("RGB", (size, size), "#2c2419")
            canvas.paste(icon, ((size - w) // 2, (size - h) // 2))
            out = IMG / name
            canvas.save(out, "PNG", optimize=True)
            print(f"icon: {out.relative_to(ROOT)}")


def make_hero_poster() -> None:
    src = IMG / "about-tatyana.jpg"
    dest = IMG / "hero-poster.jpg"
    with Image.open(src) as im:
        im = im.convert("RGB")
        im.thumbnail((1080, 1920), Image.Resampling.LANCZOS)
        im.save(dest, "JPEG", quality=78, optimize=True)
    print(f"poster: {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KB)")


def main() -> None:
    for folder in JPG_DIRS:
        if not folder.is_dir():
            continue
        for jpg in folder.glob("*.jpg"):
            to_webp(jpg)
    for jpg in SINGLE_JPGS:
        if jpg.exists():
            to_webp(jpg)
    make_hero_poster()
    make_icons()


if __name__ == "__main__":
    main()
