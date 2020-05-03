
db.collection("bills").onSnapshot((snapshot) => {
  fetchBills(snapshot.docs);
});

//fetchbills
const fetchBills = (data) => {
  let billTable = "";
  data.forEach((doc) => {
    const bills = doc.data();
    console.log(bills);
    const li = `
    <tr>
    <td>${bills.dateonbill}</td>
    <td>${bills.billpaidon}</td>
    <td>${bills.company}</td>
    <td>${bills.billno}</td>
    <td>${bills.noofbags}</td>
    <td>${bills.weight}</td>
    <td>${bills.amount}</td>
    <td>${bills.description}</td>
    </tr>
    `;
    billTable += li;
  });
  document.querySelector(".bills-table-content").innerHTML = billTable;
};

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  let dateonbill = document.getElementById("date-on-bill").value;
  let billpaidon = document.getElementById('bill-paid-on').value;
  let company = document.getElementById("company").value;
  let billNo = document.getElementById("bill-no").value;
  let noofbags = document.getElementById('no-of-bags').value;
  let weight = document.getElementById('weight').value;
  let amount = document.getElementById("amount").value;
  let description = document.getElementById("description").value;

  if (dateonbill == 0 || billpaidon == 0 || company == 0 || billNo == 0 || noofbags == 0 || weight == 0 || amount == 0 || description == 0) {
    document.querySelector(".error").innerHTML = "Fields can't remain empty";
  } else {
    db.collection("bills")
      .doc(`${company} - ${billNo}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          document.querySelector(".error").innerHTML = "Bill already added";
        } else {
          // console.log(date, company, billNo, amount);
          db.collection("bills")
            .doc(`${company} - ${billNo}`)
            .set({
              dateonbill: dateonbill,
              billpaidon: billpaidon,
              company: company,
              billno: billNo,
              noofbags: noofbags,
              weight: weight,
              amount: amount,
              description: description,
            })
            .then(() => {
              M.toast({ html: "Submited Successfully" });
            });
        }
      });
  }
});