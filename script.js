function showTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function calcPT100() {
    const Rt = parseFloat(document.getElementById('res-input').value);
    const R0 = 100, A = 3.9083e-3, B = -5.775e-7;
    if (Rt === R0) return document.getElementById('res-pt100').innerText = "0.00 °C";
    const delta = Math.pow(A, 2) - (4 * B * (1 - Rt/R0));
    const t = (-A + Math.sqrt(delta)) / (2 * B);
    document.getElementById('res-pt100').innerText = `Temperatura: ${t.toFixed(2)} °C`;
}

function calcMAtoVal() {
    const min = parseFloat(document.getElementById('f-min').value);
    const max = parseFloat(document.getElementById('f-max').value);
    const ma = parseFloat(document.getElementById('ma-in').value);
    const res = ((ma - 4) / 16) * (max - min) + min;
    document.getElementById('res-ma').innerText = `Resultado: ${res.toFixed(2)}`;
}

function calcValtoMA() {
    const min = parseFloat(document.getElementById('f-min').value);
    const max = parseFloat(document.getElementById('f-max').value);
    const val = parseFloat(document.getElementById('val-in').value);
    const res = ((val - min) / (max - min)) * 16 + 4;
    document.getElementById('res-ma').innerText = `Corrente: ${res.toFixed(2)} mA`;
}

function calcMotor() {
    const cv = parseFloat(document.getElementById('m-cv').value);
    const eff = parseFloat(document.getElementById('m-eff').value) || 0.85;
    const fp = parseFloat(document.getElementById('m-fp').value) || 0.85;
    
    const corrente = (cv * 735.5) / (Math.sqrt(3) * 380 * eff * fp);
    const cProj = corrente * 1.25;

    const tabela = [
        [1.5, 15.5], [2.5, 21], [4, 28], [6, 36], [10, 50], [16, 68], 
        [25, 89], [35, 110], [50, 134], [70, 171], [95, 207], [120, 239]
    ];
    
    let bitola = "Acima de 120 mm²";
    for (let [b, cap] of tabela) {
        if (cProj <= cap) { bitola = b + " mm²"; break; }
    }

    document.getElementById('res-motor').innerHTML = 
        `In: ${corrente.toFixed(2)}A <br> Cabo (+25%): ${cProj.toFixed(2)}A <br> Bitola: ${bitola}`;
}