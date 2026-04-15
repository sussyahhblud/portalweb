const express = require('express');
const app = express();

// 1. Headers for SharedArrayBuffer (Stops the "Cross-Origin" errors)
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

// 2. Manual MIME fixes (Stops the "Magic Number" error)
// This handles everything internally without needing any external mime package
app.use((req, res, next) => {
    const url = req.url;
    if (url.endsWith('.so') || url.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm');
    } else if (url.endsWith('.data') || url.endsWith('.vpk')) {
        res.setHeader('Content-Type', 'application/octet-stream');
    }
    next();
});

app.use(express.static(__dirname));

app.listen(8080, () => {
    console.log('sussy server probably running at http://localhost:8080/hl2_launcher.html');
});