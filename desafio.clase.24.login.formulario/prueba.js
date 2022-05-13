/* CODIGO A COPIAR EN NAVEGADOR
let text = document.getElementsByTagName("div");
let array = [];
for (i = 97; i<text.length; i=i+42) {
    array.push(text[i].textContent);
    array.push(text[i+20].textContent);
}
console.log(JSON.stringify(array)); 
*/

/* const dato = ["AER3O","0,000","BACED","0,000","CAC2D","101,000","CAC2O","20.800,000","CP17C","0,000","CP17D","105,000","CP17O","21.700,000","CP21D","103,200","CP21O","21.589,500","CP25D","91,000","CP25O","0,000","CRCED","76,250","CRCEO","15.800,000","CS34D","0,000","CS34O","0,000","CS36O","0,000","CSDOD","101,000","CSDOO","20.700,000","CSIWO","0,000","CSJXD","0,000","CSJXO","0,000","CSJYD","101,200","CSJYO","21.200,000","CSKZD","0,000","CSKZO","0,000","GN34D","102,600","GN34O","0,000","GNCWD","105,200","GNCWO","21.900,000","GNCXD","101,600","GNCXO","21.100,000","HBC4D","0,000","HJC6D","0,000","HJC7D","0,000","HJC9D","0,000","IRC1D","0,000","IRC1O","0,000","IRC5O","0,000","IRC8D","73,650","IRC8O","15.000,000","IRC9D","105,500","IRC9O","21.790,000","IRCDO","0,000","IRCEO","0,000","LMS1C","66,940","LMS1D","69,000","LMS1O","14.000,000","LUC1O","11.500,000","MRCEO","19.300,000","MRECD","93,000","MTCGD","103,100","MTCGO","21.640,000","MTCHO","0,000","MTCIO","0,000","MXC1O","0,000","PNC9D","0,000","PNDCD","113,000","PNDCO","23.500,000","PQCDD","102,000","PQCDO","21.100,000","PTSTD","103,300","PTSTO","21.225,000","PZC5D","100,000","PZC5O","20.900,000","RA31O","20.361,000","RAC4D","0,000","RCC9D","103,700","RCC9O","21.385,000","RPC2D","100,400","RPC2O","20.620,000","RUC3D","0,000","RUC3O","21.100,000","SNS7O","0,000","TLC1D","99,800","TLC1O","20.625,000","TLC5D","100,700","TLC5O","20.800,000","TN47D","0,000","TN47O","0,000","TTC1D","104,500","TTC1O","21.600,000","TTC4D","0,000","TTC4O","0,000","VSC2D","102,500","VSC2O","0,000","VSC3D","98,000","VSC3O","20.300,000","WNC9O","0,000","YCA6O","17.250,000","YCA6P","84,100","YMCHD","93,000","YMCHO","18.549,000","YMCID","72,500","YMCIO","14.800,000","YMCJD","61,000","YMCJO","12.710,000","YPCUD","66,500","YPCUO","13.500,000","","V1.5 - © 2022 - Buenos Aires, Argentina"]; 

for (let i = 1; i < dato.length; i = i + 2) {
    let dato2 = dato[i].replace(".", "")
    dato2 = dato2.replace(/,/g, '.');
    dato[i] = +dato2;
}

let array = [];
for (let i = 0; i < dato.length; i = i + 2) {
    array.push([dato[i], dato[i + 1]]);
}
console.table(array);
 */

