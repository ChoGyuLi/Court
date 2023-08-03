// 홈페이지 사용할 서버 만들기

const express = require('express');
const app = express();
const port = 8080;

app.use(express.static(__dirname + '/public'));

// express 모듈 사용, 서버 만들기
app.get('/', (req, res) => {
    // html을 클라이언트로
    res.sendFile(__dirname + '/main.html');
});

app.get('/pk_map.html', (req, res) => {
    // html을 클라이언트로
    res.sendFile(__dirname + '/pk_map.html');
});

app.get('/cal.html', (req, res) => {
    // html을 클라이언트로
    res.sendFile(__dirname + '/cal.html');
});

app.get((req, res) => {
    // html을 클라이언트로
    res.sendFile(__dirname + '/404.html');
});

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});