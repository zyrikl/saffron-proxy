// API keys
document.addEventListener("DOMContentLoaded", (e) => {
    if (typeof apiKey === "undefined" || typeof base === "undefined") {
        const error = document.createElement("div");
        error.className = "iframe-embed";
        error.innerHTML = `
        <span style='font-family: mono;'>
            <b style='color: red;'>Your current url is</b>: ${window.self.location.href}<br>
            <b style='color: yellow;'>Invalid API key or base</b>: Not set<br>
            <br>Omicron was not hosted correctly. Please contact the host for them to fix it. If you are the host: Remember to update your base attribute every time you update Omicron. 
            <br>
            <br>~brevix (<b style="color: aqua">v0.0.0 how did you even get here</b>)
            <br>You're running ${navigator.userAgent}
        </span>`;
        document.body.appendChild(error);
    }
    var validApi = true;

    // Work on fetch url later
    const apiUrl = `https://cdn.fwh.is/omicron/api.php?key=${apiKey}&base=${base}url=${window.self.location.href}`;
    var returnData = fetch(apiUrl).then(response => {
        if (!response.ok) {
            console.log(`Failing...`);
        }
        return response.text();
    }).then(data => {
        return data;
    }).catch(error => {
        console.log(`Failing...`);
    });

    if (window.top !== window.self) {
        var fileName;
        if (document.referrer === "") {
            fileName = `Local or shared private file`;
        } else {
            fileName = document.referrer;
        }
        const error = document.createElement("div");
        error.className = "iframe-embed";
        error.innerHTML = `
        <span style='font-family: mono;'>
            <b style='color: red;'>Your current url is</b>: ${fileName}<br>
            <b style='color: lightgreen;'>Valid url</b>: ${window.self.location.href}<br>
            <br>Sorry, but you're not using a real version of Omicron. This version has embeded a valid version, which you can navigate to with the url above. Omicron is created by Charles Wang and can be found through cdn.fwh.is, where you can download the single file. But thanks anyways for using Omicron.
            <br>
            <br>~brevix (<b style="color: aqua">v0.0.0 how did you even get here</b>)
            <br>You're running ${navigator.userAgent}
        </span>`;
        document.body.appendChild(error);
    } else if (!validApi) {
        const error = document.createElement("div");
        error.className = "iframe-embed";
        error.innerHTML = `
        <span style='font-family: mono;'>
            <b style='color: red;'>Your current url is</b>: ${window.self.location.href}<br>
            <br>Sorry, Omicron isn't hosted correctly on this server. You are missing any one of the following: <b style='color: lightgreen;'>API key, base content, url</b>.
            <br>
            <br>~brevix (<b style="color: aqua">v0.0.0 how did you even get here</b>)
            <br>You're running ${navigator.userAgent}
        </span>`;
        document.body.appendChild(error);
    }
});