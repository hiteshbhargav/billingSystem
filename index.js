const sort = (e) => {
  let sortVal = document.getElementById("sort-company").value;

  if (sortVal === "all") {
    db.collection("bills").onSnapshot((snapshot) => {
      fetchBills(snapshot.docs);
    });
  } else {
    db.collection("bills")
      .where("company", "==", `${sortVal}`)
      .onSnapshot((snapshot) => {
        fetchBills(snapshot.docs);
      });
  }
};

//fetchbills
const fetchBills = (data) => {
  let billTable = "";
  data.forEach((doc) => {
    const bills = doc.data();
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
  let dateonbill = document.getElementById("date-on-bill").value,
    billpaidon = document.getElementById("bill-paid-on").value,
    company = document.getElementById("company").value,
    billNo = document.getElementById("bill-no").value,
    noofbags = document.getElementById("no-of-bags").value,
    weight = document.getElementById("weight").value,
    amount = document.getElementById("amount").value,
    description = document.getElementById("description").value;
  if (
    dateonbill == 0 ||
    billpaidon == 0 ||
    company == 0 ||
    billNo == 0 ||
    noofbags == 0 ||
    weight == 0 ||
    amount == 0 ||
    description == 0
  ) {
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
