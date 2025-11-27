const generateBtn = document.getElementById("generateBtn");
const downloadBtn = document.getElementById("downloadBtn");
const status = document.getElementById("status");
const reportFrame = document.getElementById("reportFrame");
const reportModal = document.getElementById("reportModal");
const closeModal = document.getElementById("closeModal");
const historyList = document.getElementById("historyList");

let currentReport = null;
let zoomLevel = 1;
let history = [];

function showModal() { reportModal.classList.add("show"); }
function hideModal() { reportModal.classList.remove("show"); }

function addHistoryItem(url) {
    const timestamp = new Date().toLocaleString();
    const id = Date.now();
    const item = { id, url, timestamp };
    history.unshift(item);
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    history.forEach(item => {
        const div = document.createElement("div");
        div.className = "history-item";
        div.innerHTML = `
            <span>${item.timestamp}</span>
            <button onclick="openReport('${item.url}')">Открыть</button>
            <button onclick="downloadReport('${item.url}')">Скачать</button>
        `;
        historyList.appendChild(div);
    });
}

function openReport(url) {
    reportFrame.src = url;
    zoomLevel = 1;
    reportFrame.style.transform = `scale(${zoomLevel})`;
    reportFrame.style.transformOrigin = "0 0";
    showModal();
    status.textContent = "Отчёт открыт из истории.";
}

function downloadReport(url) {
    const a = document.createElement("a");
    a.href = url;
    a.download = `report_${new Date().toISOString()}.pdf`;
        a.click();
}

generateBtn.onclick = async () => {
    status.textContent = "Генерация отчёта... подождите...";

    if (currentReport) URL.revokeObjectURL(currentReport);

    try {
        const response = await fetch("http://127.0.0.1:5000/generate-report");
        if (!response.ok) {
            status.textContent = "Ошибка сервера: " + response.status;
            return;
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        currentReport = url;

        zoomLevel = 1;
        reportFrame.style.transform = `scale(${zoomLevel})`;
        reportFrame.style.transformOrigin = "0 0";

        status.textContent = "Отчёт сгенерирован. Откройте его из истории.";
        downloadBtn.style.display = "inline-block";

        addHistoryItem(url);
    } catch (e) {
        status.textContent = "Ошибка подключения к серверу.";
    }
};

downloadBtn.onclick = () => {
    if (!currentReport) return;
    downloadReport(currentReport);
};

closeModal.onclick = hideModal;
window.onclick = (event) => { if (event.target === reportModal) hideModal(); };

document.getElementById("zoomIn").onclick = () => { zoomLevel += 0.1; reportFrame.style.transform = `scale(${zoomLevel})`; reportFrame.style.transformOrigin = "0 0"; };
document.getElementById("zoomOut").onclick = () => { zoomLevel = Math.max(0.1, zoomLevel - 0.1); reportFrame.style.transform = `scale(${zoomLevel})`; reportFrame.style.transformOrigin = "0 0"; };
document.getElementById("resetZoom").onclick = () => { zoomLevel = 1; reportFrame.style.transform = `scale(${zoomLevel})`; reportFrame.style.transformOrigin = "0 0"; };
