// Created by Charles Wang, do not remove

// Functionality
const minTabs = 1;
const tabBar = document.getElementById('tab-bar');
const browser = document.getElementById('browser');
const newTabButton = document.getElementById('new-tab');
const addressBar = document.getElementById('address-bar');
const backBtn = document.getElementById('back');
const forwardBtn = document.getElementById('forward');
const reloadBtn = document.getElementById("reload");
const searchBar = document.getElementById("search-bar");

let tabs = [];
let activeIndex = 0;

searchBar.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        navigate(searchBar.value.replaceAll(" ","%20"));
        searchBar.value = "";
    }
});

function createTab(url) {
    const tabIndex = tabs.length;
    const tabButton = document.createElement('div');
    tabButton.className = 'tab';
    const urlTitle = document.createElement('span');
    urlTitle.className = 'tab-name';
    tabButton.appendChild(urlTitle);

    const closeBtn = document.createElement('span');
    closeBtn.textContent = 'x';
    closeBtn.className = 'close';
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeTab(tabIndex);
    });
    tabButton.appendChild(closeBtn);

    tabButton.addEventListener('click', () => activateTab(tabIndex));
    tabBar.insertBefore(tabButton, newTabButton);

    var info = false;
    const iframe = document.createElement('iframe');

    tabs.push({
        tabButton,
        iframe,
        history: [url],
        historyIndex: 0
    });

    iframe.addEventListener('load', (event) => {
        const new_url = iframe.contentWindow.location.href;
        const activeTab = tabs[activeIndex];
        //activeTab.iframe.src = new_url;
        console.log(`Active tab: ${activeTab}`);
        activeTab.history = activeTab.history.slice(0, activeTab.historyIndex + 1);
        if (new_url === 'about:blank') {
            activeTab.history.push('omicron:new');
        } else {
            activeTab.history.push(new_url.substr(window.location.href.length+15));
        }
        activeTab.historyIndex++;
        let d = iframe.contentDocument || iframe.contentWindow.document;
        console.log(`Title: ${d.title}`);
        if (d.title) {
            urlTitle.textContent = d.title;
        } else if (d.title.trim() === '') {
            urlTitle.textContent = new_url.substr(window.location.href.length+15);
        }
        if (activeTab.history[activeTab.historyIndex]==='omicron:new') urlTitle.textContent = 'New Tab'; 
        updateAddressBar();
    });

    // Set link
    if (url === 'omicron:new') {
        //urlTitle.textContent = 'New Tab';
        iframe.src = "about:blank";
    } else if (url == "omicron:info") {
        //urlTitle.textContent = 'Omicron Info'
        iframe.src = "about:blank";
        iframe.contentDocument.open();
        iframe.contentDocument.write("asdf");
        iframe.contentDocument.close();
        info = true;
    } else {
        iframe.src = url;
    }

    browser.appendChild(iframe);

    activateTab(tabIndex);
    addressBar.focus();
    //localStorage.setItem('tabs', `${localStorage.getItem('tab')},${new_url.substr(window.location.href.length+15)}`);
}

function closeTab(index) {
    if (!tabs[index]) return;
    if (tabs.length-1 >= minTabs) {
        const { tabButton, iframe } = tabs[index];
        //tabButton.textContent = '';
        /*tabButton.animate(
            [
                { width: '300px' },
                { width: '0px' }
            ],
            {
                duration: 1000,
                iterations: 1
            }
        );*/
        tabButton.remove();
        iframe.remove();
        tabs[index] = null;
        const nextActive = [...tabs.keys()].reverse().find(i => tabs[i]);
        if (nextActive !== undefined) activateTab(nextActive);
    }
    addressBar.blur();
}

function activateTab(index) {
    activeIndex = index;
    tabs.forEach((tab, i) => {
        if (!tab) return;
        const active = i === index;
        tab.tabButton.classList.toggle('active', active);
        tab.iframe.classList.toggle('active', active);
    });
    updateAddressBar();
}

function updateAddressBar() {
    const activeTab = tabs[activeIndex];
    if (activeTab) {
        var d = activeTab.history[activeTab.historyIndex];
        if (d === "omicron:new") {
            addressBar.value = "";
        } else if (d.startsWith('./proxy.html')) {
            addressBar.value = d.substr(17);
        } else {
            addressBar.value = d || '';
        }
    }
}

function navigate(url) {
    if (!(url.startsWith('http') || url.startsWith('omicron:'))) {
        url = `https://google.com/search?q=${url}`;
    }
    const activeTab = tabs[activeIndex];
    if (url.startsWith('omicron:')) { activeTab.iframe.src = 'about:blank'; } else { 
        url = `./proxy.html?url=${url}`;
        activeTab.iframe.src = url;
    }
    activeTab.history = activeTab.history.slice(0, activeTab.historyIndex + 1);
    activeTab.history.push(url);
    activeTab.historyIndex++;
    updateAddressBar();
    console.log(activeTab.iframe.src);
}

addressBar.addEventListener('keydown', (e) => {
    const keyVal = addressBar.value;
    if (e.key === 'Enter') {
        addressBar.blur();
        if (keyVal.startsWith('https://') || keyVal.startsWith('http://')) {
            navigate(keyVal);
        } else if (keyVal.startsWith("omicron:")) {
            navigate(keyVal);
        } else {
            navigate(keyVal.replaceAll(" ","%20"));
        }
    }
});

backBtn.addEventListener('click', () => {
    const activeTab = tabs[activeIndex];
    if (activeTab.historyIndex > 0) {
        activeTab.historyIndex--;
        let url = activeTab.history[activeTab.historyIndex];
        if (url.startsWith('omicron:')) {
            activeTab.iframe.src = 'about:blank';
        } else {
            activeTab.iframe.src = `${url}`;
        }
        updateAddressBar();
    }
});

forwardBtn.addEventListener('click', () => {
    const activeTab = tabs[activeIndex];
    if (activeTab.historyIndex < activeTab.history.length - 1) {
        activeTab.historyIndex++;
        let url = activeTab.history[activeTab.historyIndex];
        if (url.startsWith('omicron:')) {
            activeTab.iframe.src = 'about:blank';
        } else {
            activeTab.iframe.src = `${url}`;
        }
        updateAddressBar();
    }
});

newTabButton.addEventListener('click', () => {
    createTab('omicron:new');
});

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 't') {
        event.preventDefault();
        createTab('omicron:new');
    }
    tabBar.scrollTo({
        left: tabBar.scrollWidth - tabBar.clientWidth,
        behavior: 'smooth'
    });
});

document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'w') {
        event.preventDefault();
        closeTab(activeIndex);
    }
});






createTab('omicron:new');
addressBar.focus();