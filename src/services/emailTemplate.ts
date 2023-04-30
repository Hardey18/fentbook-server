import { numberWithCommas } from "../utils/randomNumber";

export const invoiceTemplate = (
  companyPhoto: any,
  invoiceNumber: any,
  companyName: any,
  companyEmail: any,
  productName: any,
  customerName: any,
  customerAddress: any,
  customerCity: any,
  customerState: any,
  customerEmail: any,
  date: any,
  productDescription: any,
  unitPrice: any,
  quantity: any,
  vat: any,
  shippingCost: any,
  grandTotal: any
) => {
  const temp = `
    <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  .clearfix:after {
    content: "";
    display: table;
    clear: both;
  }
  
  a {
    color: #5D6975;
    text-decoration: underline;
  }
  
  body {
    position: relative;
    width: 21cm;  
    height: 29.7cm; 
    margin: 0 auto; 
    color: #001028;
    background: #FFFFFF; 
    font-family: Arial, sans-serif; 
    font-size: 12px; 
    font-family: Arial;
  }
  
  header {
    padding: 10px 0;
    margin-bottom: 30px;
  }
  
  #logo {
    text-align: center;
    margin-bottom: 10px;
  }
  
  #logo img {
    width: 90px;
  }
  
  h1 {
    border-top: 1px solid  #5D6975;
    border-bottom: 1px solid  #5D6975;
    color: #5D6975;
    font-size: 2.4em;
    line-height: 1.4em;
    font-weight: normal;
    text-align: center;
    margin: 0 0 20px 0;
    background: url(https://i.ibb.co/hgxw6wr/dimension.png);
  }
  
  #project {
    float: left;
  }
  
  #project span {
    color: #5D6975;
    text-align: right;
    width: 52px;
    margin-right: 10px;
    display: inline-block;
    font-size: 0.8em;
  }
  
  #company {
    float: right;
    text-align: right;
  }
  
  #project div,
  #company div {
    white-space: nowrap;        
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    margin-bottom: 20px;
  }
  
  table tr:nth-child(2n-1) td {
    background: lightgrey;
  }

  table thead {
    background: lightgreen;
  }
  
  table th,
  table td {
    text-align: center;
  }
  
  table th {
    padding: 5px 20px;
    color: darkgreen;
    border-bottom: 1px solid #C1CED9;
    white-space: nowrap;        
    font-weight: normal;
  }
  
  table .service,
  table .desc {
    text-align: left;
  }
  
  table td {
    padding: 20px;
    text-align: right;
  }
  
  table td.service,
  table td.desc {
    vertical-align: top;
  }
  
  table td.unit,
  table td.qty,
  table td.total {
    font-size: 1.2em;
  }
  
  table td.grand {
    border-top: 1px solid #5D6975;;
  }
  
  #notices .notice {
    color: #5D6975;
    font-size: 1.2em;
  }
  
  footer {
    color: #5D6975;
    width: 100%;
    height: 30px;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #C1CED9;
    padding: 8px 0;
    text-align: center;
  }
  </style>

</head>
<body>
    <header class="clearfix">
      <div id="logo">
        <img src="${companyPhoto}">
      </div>
      <h1>${invoiceNumber}</h1>
      <div id="company" class="clearfix">
        <div>${companyName}</div>
        <div>${companyEmail}</div>
      </div>
      <div id="project">
        <div><span>CLIENT</span> ${customerName}</div>
        <div><span>ADDRESS</span> ${customerAddress}, ${customerCity}, ${customerState}</div>
        <div><span>EMAIL</span> ${customerEmail}</div>
        <div><span>DATE</span> ${date}</div>
      </div>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th class="service">SERVICE</th>
            <th class="desc">DESCRIPTION</th>
            <th>PRICE</th>
            <th>QTY</th>
            <th>TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="service">${productName}</td>
            <td class="desc">${productDescription}</td>
            <td class="unit">&#8358;${numberWithCommas(+unitPrice)}</td>
            <td class="qty">${quantity}</td>
            <td class="qty">&#8358;${numberWithCommas(unitPrice*quantity)}</td>
          </tr>
          <tr>
            <td colspan="4">VAT</td>
            <td class="total">${vat}%</td>
          </tr>
          <tr>
            <td colspan="4">SHIPPING COST</td>
            <td class="total">&#8358;${numberWithCommas(+shippingCost)}</td>
          </tr>
          <tr>
            <td colspan="4" class="grand total">GRAND TOTAL</td>
            <td class="grand total">&#8358;${numberWithCommas(+grandTotal)}</td>
          </tr>
        </tbody>
      </table>
    </main>
  </body>
</html>
    `;
  return temp;
};
