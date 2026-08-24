let highestZ = 1;
function bringToFront(element) {
    highestZ++;
    element.style.zIndex = highestZ;
}
function makeDraggable(element, index) {
    let isDragging = false;
    let offset = { x: 0, y: 0 };

    element.addEventListener("mousedown", (e) => {
        bringToFront(element);
        isDragging = true;
        offset.x = e.clientX - element.offsetLeft;
        //offset.y = e.clientY - element.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            element.style.left = `${e.clientX - offset.x}px`;
            //element.style.top = `${e.clientY - offset.y}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        let d = Math.max(Math.round(element.offsetLeft/185) * 185, 0);
        marginsTabs[index] = d;
        element.style.left = `${marginsTabs[index] - Math.min(...marginsTabs)+10}px`;
    });
}

// Boilerplate
const tabBar = document.getElementById('tab-bar');
const browser = document.getElementById('browser');
const newTabButton = document.getElementById('new-tab');
const addressBar = document.getElementById('address-bar');
const backBtn = document.getElementById('back');
const forwardBtn = document.getElementById('forward');
const reloadBtn = document.getElementById("reload");
const searchBar = document.getElementById("search-bar");

let tabs = [];
let marginsTabs = [];
let activeIndex = 0;
let minTabs = 1;

function createTab(url) {
    const iframe = document.createElement('iframe');
    const tab = document.createElement('tab');
    tab.className = 'tab';
    const urlTitle = document.createElement('span');
    urlTitle.className = 'tab-name';
    tab.appendChild(urlTitle);

    // activate other tabs
    const tabIndex = tabs.length; // current tab index
    tab.addEventListener('click', () => activateTab(tabIndex) );

    let link;

    if (url.startsWith('https://') || url.startsWith('http://')) {
        link = url;
        iframe.src = `./proxy.html?url=${url}`;
    } else if (url.startsWith('omicron:')) {
        link = url;
        urlTitle.textContent = 'New Tab';
        iframe.src = 'about:blank';
    } else {
        link = `https://google.com/search?q=${encodeURIComponent(url)}`;
        iframe.src = `./proxy.html?url=https://google.com/search?q=${encodeURIComponent(url)}`;
    }

    tabs.push({
        tab, // reference to tab element
        iframe, // reference to iframe element
        history: [link],
        historyIndex: 0
    });
    marginsTabs.push(tabIndex * 185);

    // draggable
    makeDraggable(tab, tabIndex);
    tab.style.left = `${marginsTabs[tabIndex] - Math.min(...marginsTabs)+10}px`;
    newTabButton.style.left = `${tabs.filter(item => item !== null).length * 185 + 20}px`;

    // close button
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&#x2715;';
    closeBtn.className = 'close';
    closeBtn.addEventListener('click', (e) => {
        // prevent event listener from setting something else off too
        e.stopPropagation();
        closeTab(tabIndex);
    });
    tab.appendChild(closeBtn);

    // add stuff to screen
    tabBar.insertBefore(tab, newTabButton);
    browser.appendChild(iframe);

    activateTab(tabIndex);
    addressBar.focus();
}

function activateTab(index) {
    if (addressBar.value === '') {
        addressBar.focus();
    }
    activeIndex = index;
    tabs.forEach((tab, i) => {
        if (!tab) return;

        const active = i === index;
        tab.tab.classList.toggle('active', active);
        tab.iframe.classList.toggle('active', active);
    });
}

function closeTab(index) {
    if (!tabs[index]) return;
    if (tabs.length-1 >= minTabs) {
        const { tab, iframe } = tabs[index];
        tab.remove();
        iframe.remove();
        tabs[index] = null;
        const nextActive = [...tabs.keys()].reverse().find(i => tabs[i]);
        if (nextActive !== undefined) activateTab(nextActive);
        
        newTabButton.style.left = `${tabs.filter(item => item !== null).length * 185 + 20}px`;
    }
    addressBar.blur();
}

function navigate(url) {
    const activeTab = tabs[activeIndex];
    
    if (url.startsWith('https://') || url.startsWith('http://')) {
        activeTab.iframe.src = `./proxy.html?url=${url}`;
        return url;
    } else if (url.startsWith('omicron:')) {
        activeTab.iframe.src = 'about:blank';
        return '';
    } else {
        activeTab.iframe.src = `./proxy.html?url=https://google.com/search?q=${encodeURIComponent(url)}`;
        return `https://google.com/search?q=${encodeURIComponent(url)}`;
    }
}

addressBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addressBar.value = navigate(addressBar.value);
        addressBar.blur();
    }
});

newTabButton.addEventListener('click', () => {
    createTab('omicron:new');
});

createTab('omicron:new');