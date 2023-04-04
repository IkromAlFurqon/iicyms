// User's name input
let name = prompt("Hi, what is your name", "type here!")
function openingPage(){
    globalThis.name
}

var typed = new Typed(".typing",{
    strings:["Hi "+name+" !", "Welcome to your <span class='calCredit'>CalCredit</span> !",""],
    typeSpeed:25,
    BackSpeed:50,
    loop:true
})

let loanAmount = document.getElementById("loan-amount")

loanAmount.addEventListener('keyup', function(e){
    loanAmount.value = rupiahCurrency(this.value,'Rp')
})
function rupiahCurrency(angka, prefix){
    let number_string = angka.replace(/[^,\d]/g,'').toString(),
    split = number_string.split(','),
    sisa = split[0].length % 3,
    loan = split[0].substr(0, sisa),
    ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
        separator = sisa ? '.' : ''
        loan += separator + ribuan.join('.')
    }
    loan = split[1] != undefined ? loan + ',' + split[1] : loan
    return prefix ==  undefined ? loan : (loan ? 'Rp ' + loan : '') 
}

let loanDuration = document.getElementById('loan-duration')
let interestRate = document.getElementById('interest-rate') 
let calculateButton = document.getElementById('calculator-button')

let flatInterestAmount = document.getElementById('flatInterestAmount')
let annuityInterestAmount = document.getElementById('annuityInterestAmount')
let effectiveInterestAmount = document.getElementById('effectiveInterestAmount')

let flatDebtAmount = document.getElementById('flatDebtAmount')
let annuityDebtAmount = document.getElementById('annuityDebtAmount')
let effectiveDebtAmount = document.getElementById('effectiveDebtAmount')

calculateButton.addEventListener("click", function() {
    flatInterestAmount.innerText = ''
    annuityInterestAmount.innerText = ''
    effectiveInterestAmount.innerText = ''

    flatDebtAmount.innerText = ''
    annuityDebtAmount.innerText = ''
    effectiveDebtAmount.innerText = ''

    let l = loanAmount.value
    l = Number(l.replace('Rp','').replaceAll('.',''))
    let d = Number(loanDuration.value)
    let ir = Number(interestRate.value)

    // Perhitungan Metode Flat
    let flatBesarBunga, flatTotalBunga, flatTotalBalikin
    flatBesarBunga = ((ir/100)/12)*l
    flatTotalBunga = flatBesarBunga*d
    flatTotalBalikin = l + flatTotalBunga

    flatTotalBunga = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(Math.round(flatTotalBunga))
    flatTotalBalikin = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(Math.round(flatTotalBalikin))

    // Perhitungan Metode Anuitas
    let total = (l*((ir/100)/12))/(1-(1/(1+((ir/100)/12))**d))
    let anuitasBesarBunga, anuitasPokok, anuitasTotalBunga = 0, anuitasTotalPokok = 0, anuitasTotalBalikin
    let pinjamanAnuitas = l
    for (let i = 0; i < d; i++) {
        anuitasBesarBunga = pinjamanAnuitas*((ir/100)/12)
        anuitasPokok = total - anuitasBesarBunga
        anuitasTotalBunga = anuitasTotalBunga + anuitasBesarBunga
        anuitasTotalPokok = anuitasTotalPokok + anuitasPokok
        pinjamanAnuitas = pinjamanAnuitas - anuitasPokok
    }

    anuitasTotalBalikin = anuitasTotalBunga + anuitasTotalPokok

    anuitasTotalBunga = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(Math.round(anuitasTotalBunga))
    anuitasTotalBalikin = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(Math.round(anuitasTotalBalikin))

    // Perhitungan Metode Efektif
    let efektifPokok, efektifTotalPokok = 0, efektifBesarBunga, efektifTotalBunga = 0, efektifTotalBalikin
    efektifPokok = Math.round(l/d)
    let pinjamanEfektif = l
    for (let i = 0; i < d; i++) {
        efektifBesarBunga = pinjamanEfektif*((ir/100)/12)
        pinjamanEfektif = pinjamanEfektif - efektifPokok
        efektifTotalBunga = efektifTotalBunga + efektifBesarBunga
        efektifTotalPokok = efektifTotalPokok + efektifPokok
    }
    efektifTotalBalikin = efektifTotalBunga + efektifTotalPokok

    efektifTotalBunga = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(Math.round(efektifTotalBunga))
    efektifTotalBalikin = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(Math.round(efektifTotalBalikin))

    // Proses pemunculan ke dalam output
    flatInterestAmount.innerText = flatTotalBunga.toString()
    flatDebtAmount.innerText = flatTotalBalikin.toString()

    annuityInterestAmount.innerText = anuitasTotalBunga.toString()
    annuityDebtAmount.innerText = anuitasTotalBalikin.toString()

    effectiveInterestAmount.innerText = efektifTotalBunga.toString()
    effectiveDebtAmount.innerText = efektifTotalBalikin.toString()
})