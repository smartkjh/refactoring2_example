const invoicesJson = require("../invoices.json");
const playsJson = require("../plays.json");

function statement(invoice, plays) {
    let result = `청구내역 (고객명: ${invoice.customer}_\n`;
    for (let perf of invoice.performances) {
        result += `${playFor(perf).name}: ${usd(amountFor(perf)/100)} (${perf.audience}석\n`;
    }
    result += `총액: ${usd(totalAmount()/100)}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    return result;


function totalAmount() {
  let result = 0;
  for (let perf of invoice.performances) {
    result += amountFor(perf);
  }
  return result;
}

function totalVolumeCredits() {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
  }
  return volumeCredits;
}

function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy": // 비극
      result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy": // 희극
      result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 30);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
    result += Math.floor(aPerformance.audience / 5);
    return result;
  }image.png

  function usd(aNumber) {
    return new Intl.NumberFormat("es-US",
                    { style: "currency", currency: "USD",
                      minimumFractionDigits: 2 }).format(aNumber);
  }
}

statement(invoicesJson,playsJson);

