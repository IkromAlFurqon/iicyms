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

// Input Indonesian Currency
let loan = document.getElementById("loan")

loan.addEventListener('keyup', function(e){
    loan.value = rupiahCurrency(this.value,'Rp')
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

// Perhitungan
// Loan sudah di tangkap
let duration = document.getElementById('duration')
let interestRate = document.getElementById('interestRate') 

let calculateButton = document.querySelector('.submit-container button')

let FinterestAmount = document.getElementById('FinterestAmount')
let AinterestAmount = document.getElementById('AinterestAmount')

let FtotalAmount = document.getElementById('FtotalAmount')
let AtotalAmount = document.getElementById('AtotalAmount')

calculateButton.addEventListener("click", function(){
    // Reset Value
    FinterestAmount.innerText = ''
    AinterestAmount.innerText = ''
    FtotalAmount.innerText = ''
    AtotalAmount.innerText = ''

    let l = loan.value
    l = Number(l.replace('Rp','').replaceAll('.',''))
    let d = Number(duration.value)
    let ir = Number(interestRate.value)

    // Perhitungan Flat
    let FbesarBunga, FtotalBunga, FtotalBalikin
    FbesarBunga = ((ir/100)/12)*l
    FtotalBunga = FbesarBunga*d
    FtotalBalikin = l + FtotalBunga
    
    FtotalBunga = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(Math.round(FtotalBunga))
    FtotalBalikin = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(Math.round(FtotalBalikin))

    // Perhitungan Anuitas
    let total = (l*((ir/100)/12))/(1-(1/(1+((ir/100)/12))**d))
    let AbesarBunga, Apokok, AtotalBunga = 0, AtotalPokok = 0, AtotalBalikin
    for (let i = 0; i < d; i++) {
        AbesarBunga = l*((ir/100)/12)
        Apokok = total - AbesarBunga
        AtotalBunga = AtotalBunga + AbesarBunga
        AtotalPokok = AtotalPokok + Apokok
        l = l - Apokok
    }
    AtotalBalikin = AtotalBunga + AtotalPokok
    
    AtotalBunga = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(Math.round(AtotalBunga))
    AtotalBalikin = new Intl.NumberFormat("id-ID", {style: "currency", currency: "IDR"}).format(Math.round(AtotalBalikin))

    //Proses pemunculan ke dalam output
    FinterestAmount.innerText = FtotalBunga.toString()
    FtotalAmount.innerText = FtotalBalikin.toString()

    AinterestAmount.innerText = AtotalBunga.toString()
    AtotalAmount.innerText = AtotalBalikin.toString()

})