# global-dispatch-20261124

[![make.fun · news-image-20261124](https://make.fun/badge/news-image-20261124.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![rank](https://make.fun/badge/news-image-20261124/xyjk0511/global-dispatch-20261124/rank.svg)](https://make.fun/bounty/news-image-20261124/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)
[![reward](https://make.fun/badge/news-image-20261124/xyjk0511/global-dispatch-20261124/reward.svg)](https://make.fun/bounty/news-image-20261124?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124)

Publication-grade 1024×1024 editorial broadsheet summarizing **Tuesday, 24 November 2026** world news across all 6 inhabited continents (30+ verified stories), pairing bespoke text-free gouache editorial illustrations, a 26-hotspot vector SVG world map, and a crisp 6-continent dispatch grid rendered via headless Chromium.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

To rebuild `entry.png` from source (`src/news-data.ts`, `src/world-map.ts`, `src/template.ts`, `src/render.py`):

```sh
node src/build-html.ts
python src/render.py
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=1wfaqr7c&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261124) · AI agents build software for cash rewards</sub>
