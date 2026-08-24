// Styling
const styling = document.createElement("style");
styling.textContent = `
.iframe-embed {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    color: white;
}

@keyframes tilt {
    0% {
        transform: rotateX(0deg) rotateY(0deg);
    }
    33% {
        transform: rotateX(-15deg) rotateY(15deg);
    }
    67% {
        transform: rotateX(15deg) rotateY(15deg);
    }
    100% {
        transform: rotateX(0deg) rotateY(0deg);
    }
}
body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #111;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}
#tab-bar {
    display: flex;
    background: rgba(0,0,0,0);
    color: white;
    align-items: center;
    padding-left: 10px;
    padding-top: 5px;
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.tab {
    padding: 10px 15px;
    cursor: pointer;
    background: #333;
    border-right: 1px solid #555;
    display: flex;
    align-items: center;
    border-radius: 20px;
    min-width: 100px;
    max-width: 300px;
    margin-right: 5px;
    color: #aaa;
}
.tab.active {
    color: white;
    background: #555;
}
.tab .close {
    font-family: Verdana, sans-serif;
    font-size: 10pt;
    margin-left: auto;
    margin-right: 0;
    padding-left: 5px;
    font-weight: bold;
    cursor: pointer;
    color: #bbb;
}
.tab .close:hover {
    color: white;
}
.tab-name {
    max-width: 280px;
    overflow-x: hidden;
}
#new-tab {
    cursor: pointer;
    background: #000;
    font-size: 12pt;
    padding: 5px 9px 5px 9px;
    border-radius: 20px;
    color: #aaa;
}
#new-tab:hover {
    color: white;
    background: #333;
}
#controls {
    display: flex;
    background: #000;
    padding: 5px;
    align-items: center;
}
#controls button {
    padding: 10px;
    color: white;
    background: #000;
    border: none;
    border-radius: 20px;
    height: 35px;
    width: 35px;
    color: #bbb;
}
#controls button:hover {
    color: white;
    background: #333;
    cursor: pointer;
}
#address-bar {
    flex: 1;
    font-size: 14px;
    background: rgba(255,255,255,0.2);
    border: none;
    color: #bbb;
    border-radius: 20px;
    padding: 10px;
    margin-left: 10px;
}
#address-bar:focus {
    color: white;
}
iframe {
    width: 100%;
    height: calc(100% - 90px);
    border: none;
    display: none;
    position: fixed;
    background: white;
}
iframe.active {
    display: block;
} 
.close-text {
    text-align: right;
}
#reload {
    padding-top: 5px !important;
    font-size: 8pt;
    transform: rotate(315deg);
}
#default {
    color: white;
    position: fixed;
    z-index: 0;
    width: 60%;
    margin-left: 20%;
    text-align: center;
    height: 20%;
    margin-top: 10%;
}
#default h1 {
    font-size: 50pt;
}
#search-bar {
    font-family: 15pt;
    padding: 15px;
    border-radius: 30px;
    border: none;
    width: 400px;
    background: #333;
    color: #aaa;
}
@keyframes enlarge {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.3);
        opacity: 0;
    }
}
#search-bar:hover {
    animation: enlarge ease-in 1s forwards;
}
#search-bar:focus {
    color: white;
    animation: tilt 2s 1;
}
iframe[src="about:blank"] {
    z-index: -1;
    background: rgba(0,0,0,0);
}
#particles {
    position: fixed;
    border: none;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -999;
}
.draggable {
    position: fixed;
}
`;
document.head.appendChild(styling);