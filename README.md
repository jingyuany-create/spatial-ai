# Neighborhood

An interactive 6 × 6 neighborhood editor built with vanilla JavaScript and Three.js. Add, select, move, and delete houses or gardens; measure plot-center distances; and explore live garden coverage.

## Run locally

From the repository root:

```sh
python3 -m http.server 8000
```

Open http://localhost:8000 in a browser. No build or dependency installation is required. Three.js 0.186.1 is included in `vendor/` with its MIT license.

## Model

Each plot is 10 × 10 meters and holds at most one object. Houses are served when their plot shares an edge with a garden. Diagonal contact does not count. All spatial rules live in `model.mjs`; `app.mjs` presents the same model in 3D.

The example starts with three houses and one garden, with 67% coverage. Escape cancels a pending move or measurement. Orbit, zoom, and pan affect only the camera.

## Live demo

https://neighborhood-grid.jingyuany215.chatgpt.site

The hosted demo currently requires owner access.
