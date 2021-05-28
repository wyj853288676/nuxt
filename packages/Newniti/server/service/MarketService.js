const http = require("http");
const https = require("https");
const cheerio = require("cheerio");
const Decimal = require("decimal.js");

module.exports = {
    getLiveRates: function (from, to) {
        return new Promise((resolve, reject) => {
            const options = {
                hostname: "www.webmasterhome.cn",
                path: "/huilv/forexD.min.asp?" + `from=${from}&to=${to}&t=${Math.random()}`,
                method: "GET",
                port: 80,
                headers: {
                    Cookie: "ForexChart=eDDFqHIP; ExActC=azvsLYTH65wf; ForexActC=QgZ0RiTy; ForexGetC=6epjG3xt; ExActCgg=mbPDvNbpWj; ASPSESSIONIDSSTQCBCA=FPJFEMHBIPJHABLNBPIGGBKB; __51cke__=; __vtins__1v488Xpw9ngCTUiM=%7B%22sid%22%3A%20%2254102d3d-2e4c-5d46-b6df-305029372dc7%22%2C%20%22vd%22%3A%201%2C%20%22stt%22%3A%200%2C%20%22dr%22%3A%200%2C%20%22expires%22%3A%201616579388535%2C%20%22ct%22%3A%201616577588535%7D; __51uvsct__1v488Xpw9ngCTUiM=1; __51vcke__1v488Xpw9ngCTUiM=eeb5fbaf-711c-5fa8-aba9-7be90dd35f63; __51vuft__1v488Xpw9ngCTUiM=1616577588541; UM_distinctid=17863886d5a721-055ab58a36e09f-5771133-306000-17863886d5bc11; CNZZDATA1279228592=950819672-1616573565-https%253A%252F%252Fwww.baidu.com%252F%7C1616573565; __gads=ID=ed7e11af16d7c187-22be134cccc600f6:T=1616577589:RT=1616577589:S=ALNI_MbS1ISpemXH1nQXmE_vOWS-NspTlg; exMoreinfo=exc; ASPSESSIONIDQQSRBADA=EKHJMMOBBNPCOHEGFLGJDHJA; __tins__212346=%7B%22sid%22%3A%201616635148657%2C%20%22vd%22%3A%204%2C%20%22expires%22%3A%201616637379175%7D; __51laig__=6; ASPSESSIONIDQSRSADCA=FCAENDPBCCNCEGMKEDJAJBJF",
                    Referer: `http://www.webmasterhome.cn/huilv/${from}/${from}${to}/`,
                }
            };
            const req = http.request(options, res => {
                let chunk = "";
                res.on("data", data => {
                    chunk += data;
                });
                res.on("end", () => {
                    let $html = cheerio.load(chunk);
                    let rate = $html("span.mexl").html(),
                        updatedAt = $html("div.mUpTime>div.floatl>span").html();
                    if (!rate || rate.indexOf("N/A") >= 0) {
                        rate = null;
                    };
                    if (updatedAt) {
                        updatedAt = updatedAt.replace(/更新时间：\s*/, "").trim();
                    }
                    resolve({
                        rate: rate,
                        updatedAt,
                        updateTime: new Date(updatedAt).getTime(),
                        dataGotDate: new Date(),
                    });
                });
            });
            req.on("error", error => {
                reject(`pair: ${from} ${to} ${error}`);
            });
            req.end();
        });
    },


    getPrices: function (allSubPairs) {
        return new Promise((resolve, reject) => {
            let options = {
                hostname: "www.xe.com",
                path: "/api/protected/midmarket-converter/",
                method: "GET",
                headers: {
                    Authorization: "Basic bG9kZXN0YXI6REx1OHhOQ1ZrWkpSeHk3ck91R1hDQ2l2d0U2cXd4c1Q=",
                },
            };
            const req = https.request(options, res => {
                let chunk = "";
                res.on("data", (data) => {
                    chunk += data;
                });
                res.on("error", (error) => {
                    error;
                });
                res.on("end", () => {
                    let data = null,
                        prices = {};
                    try {
                        data = JSON.parse(chunk);
                    } catch (err) {
                        reject(err);
                    }
                    if (!data) {
                        return resolve({});
                    }
                    for (let i = 0; i < allSubPairs.length; i++) {
                        let pairSplit = allSubPairs[i].split("/"),
                            from = pairSplit[0],
                            to = pairSplit[1];
                        let fromPrice = data.rates[from],
                            toPrice = data.rates[to];
                        if (!fromPrice || !toPrice) {
                            continue;
                        }
                        //mock random price
                        let calPrice = new Decimal(toPrice).dividedBy(data.rates[from]),
                            buyPrice = new Decimal(calPrice).times(1.05 - Math.random() / 10),
                            sellPrice = new Decimal(calPrice).times(1.05 - Math.random() / 10);
                        prices[allSubPairs[i]] = {
                            buy: buyPrice,
                            sell: sellPrice,
                        };
                    }
                    resolve(prices);
                });
            });
            req.on("error", (error) => {
                reject(`GET PRICES ERROR: ${error}`);
            })
            req.end();
        });
    },
};