var startButton;    // スタートボタン
var stopButton;     // ストップボタン
var resetButton;    // リセットボタン
var showTime;       // 表示時間

var timer;              // setinterval, clearTimeoutで使用
var startTime;          // 開始時間
var elapsedTime = 0;    // 経過時間
var holdTime = 0;       // 一時停止用に時間を保持

window.onload = function () {
    startButton = document.getElementById("start");
    stopButton = document.getElementById("stop");
    resetButton = document.getElementById("reset");
    showTime = document.getElementById("time");
}
// スタートボタン押下時
function start(){
    startTime = Date.now(); // 開始時間を現在の時刻に設定

    measureTime(); // 時間計測
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
}
// ストップボタン押下時
function stop(){
    clearInterval(timer); // タイマー停止

    holdTime += Date.now() - startTime;  // 停止時間を保持

    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
}
// リセットボタン押下時
function reset(){
    clearInterval(timer); // タイマー停止

    // 変数、表示を初期化
    elapsedTime = 0;
    holdTime = 0;
    showTime.textContent = "0:0:0:0";

    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
}
// 時間を計測（再帰関数）
function measureTime() {
    // タイマーを設定
    timer = setTimeout(function () {
        // 経過時間を設定し、画面へ表示
        elapsedTime = Date.now() - startTime + holdTime;
        showTime.textContent = new Date(elapsedTime).toISOString().slice(11, 21);
        
        // 関数を呼び出し、時間計測を継続する
        measureTime();
    }, 10);
}
