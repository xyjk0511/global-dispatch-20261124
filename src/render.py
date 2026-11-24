import os
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright

REPO_ROOT = Path(__file__).resolve().parent.parent
HTML_PATH = REPO_ROOT / "preview" / "edition.html"
RAW_PNG = REPO_ROOT / "preview" / "raw-1024.png"
ENTRY_PNG = REPO_ROOT / "entry.png"
THUMB_PNG = REPO_ROOT / "preview" / "thumb-300.png"
MAX_BYTES = 1_048_576


def find_chromium_executable() -> str | None:
    local_app = os.environ.get("LOCALAPPDATA")
    if local_app:
        ms_pw = Path(local_app) / "ms-playwright"
        if ms_pw.exists():
            candidates = sorted(
                list(ms_pw.glob("chromium-*/chrome-win*/chrome.exe"))
                + list(ms_pw.glob("chromium_headless_shell-*/chrome-headless-shell-win*/chrome-headless-shell.exe")),
                reverse=True,
            )
            if candidates:
                return str(candidates[0])
    return None


def render_page() -> None:
    if not HTML_PATH.exists():
        raise FileNotFoundError(f"Missing HTML file: {HTML_PATH}")

    exe_path = find_chromium_executable()
    with sync_playwright() as p:
        launch_kwargs = {"executable_path": exe_path} if exe_path else {}
        browser = p.chromium.launch(**launch_kwargs)
        page = browser.new_page(viewport={"width": 1024, "height": 1024}, device_scale_factor=1)
        page.goto(HTML_PATH.as_uri(), wait_until="load")
        page.wait_for_timeout(200)

        overflows = page.evaluate("""() => {
          const selectors = ['.page', '.masthead', '.hero-card', '.map-panel', '.spot-card', '.continent-box'];
          const issues = [];
          for (const sel of selectors) {
            for (const el of document.querySelectorAll(sel)) {
              const dh = el.scrollHeight - el.clientHeight;
              const dw = el.scrollWidth - el.clientWidth;
              if (dh > 1 || dw > 1) {
                issues.push({ sel, dh, dw, text: (el.innerText || '').slice(0, 60) });
              }
            }
          }
          return issues;
        }""")
        if overflows:
            print("OVERFLOW WARNINGS:", overflows)
        else:
            print("DOM OVERFLOW AUDIT: PASS (0 clipped containers)")

        page.screenshot(path=str(RAW_PNG), type="png")
        browser.close()


def optimize_output() -> None:
    im = Image.open(RAW_PNG).convert("RGB")
    if im.size != (1024, 1024):
        raise ValueError(f"Expected 1024x1024 image, got {im.size}")

    # First try lossless optimized PNG
    im.save(ENTRY_PNG, format="PNG", optimize=True, compress_level=9)
    png_bytes = ENTRY_PNG.stat().st_size

    # Also test adaptive 256-color palette PNG (high-contrast text + gouache art stays crisp & tiny)
    quant_path = REPO_ROOT / "preview" / "quant-1024.png"
    quant = im.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE)
    quant.save(quant_path, format="PNG", optimize=True, compress_level=9)
    quant_bytes = quant_path.stat().st_size

    print(f"Lossless PNG: {png_bytes:,} bytes | Quantized PNG: {quant_bytes:,} bytes")

    if png_bytes <= MAX_BYTES:
        # Check if quantized is dramatically smaller while preserving sharpness; keep lossless if <= 750KB
        if png_bytes <= 750_000:
            print(f"Selected lossless optimized PNG ({png_bytes:,} bytes)")
        else:
            quant_path.replace(ENTRY_PNG)
            print(f"Selected compact 256-color PNG ({quant_bytes:,} bytes)")
    else:
        if quant_bytes <= MAX_BYTES:
            quant_path.replace(ENTRY_PNG)
            print(f"Selected quantized PNG under 1 MiB ({quant_bytes:,} bytes)")
        else:
            # Fallback high-quality JPEG (allowed by competition rules, still named entry.png)
            im.save(ENTRY_PNG, format="JPEG", quality=92, optimize=True, subsampling=0)
            print(f"Selected JPEG fallback ({ENTRY_PNG.stat().st_size:,} bytes)")

    thumb = Image.open(ENTRY_PNG).convert("RGB").resize((300, 300), Image.Resampling.LANCZOS)
    thumb.save(THUMB_PNG, format="PNG", optimize=True)
    print(f"Saved 300x300 thumbnail: {THUMB_PNG} ({THUMB_PNG.stat().st_size:,} bytes)")


if __name__ == "__main__":
    render_page()
    optimize_output()
