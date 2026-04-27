async function inspect() {
    const url = document.getElementById("url-input").value;
    if (!url) return;

    document.getElementById("results").classList.remove("hidden");
    const startTime = performance.now();

    try {
        const response = await fetch(url);
        const duration = Math.round(performance.now() - startTime);

        document.getElementById("request-info").innerHTML = `
        <div class="info-row">
        <span class="info-key">URL</span>
        <span class="info-value">${url}</span>
        </div>

        <div class="info-row">
        <span class="info-key">Status</span>
        <span class="info-value ${response.ok ? "status-ok" : "status-error"}">${response.status} ${response.statusText}</span>
        </div>
        `;

        const headersDiv = document.getElementById("response-headers");
        headersDiv.innerHTML = "";
        response.headers.forEach((value, key) => {
            headersDiv.innerHTML += `
        <div class="info-row">
        <span class="info-key">${key}</span>
        <span class="info-value">${value}</span>
        </div>
        `;
        });

        document.getElementById("performance-info").innerHTML = `
        <div class="info-row">
        <span class="info-key">Response Time</span>
        <span class="info-value status-ok">${duration}ms</span>
        </div>
        `;

        const cookies = document.cookie;
        document.getElementById("cookie-info").innerHTML = cookies ? cookies.split(";").map(c => `<span class ="tag">${c.trim()}</span>`).join("") : `<span style="color:#888">No cookies found</span>`;

    } catch (error) {
        document.getElementById("request-info").innerHTML = `
        <div class="info-row">
        <span class="info-key">Error</span>
        <span class="info-value status-error">${error.message}</span>
        </div>
        `;
    }
}