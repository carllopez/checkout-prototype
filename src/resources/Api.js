const requestHeaders = {
  'Authorization': 'Basic MTAwMTAwMTgzOjU3NDA0MWZkNzc1ODhjNTNiNDQ5ZGFiYjM5NWExODg1OWRjYjJiYzg5YzdiMDNhMWNhY2VlZWI0OTdjNzU5NTE1MzU2MzIwZWYwZTUzYzE2N2IyMmYyZDBiYzMyNTg4ODVhODAwNzQ4OGE3MDUwMWY5ZDgwYjc5NDQ1OWQwNzE1',
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

const simpleOrder = {
  totalAmount: {
    amount: 100,
    currency: "USD"
  },
  consumer: {
    phoneNumber: "0400000000",
    givenNames: "",
    surname: "",
    email: ""
  },
  merchant: {
    redirectConfirmUrl: "https://www.merchant.com/confirm",
    redirectCancelUrl: "https://www.merchant.com/cancel"
  },
  merchantReference: "merchantOrder-1234"
};

export {
  requestHeaders,
  simpleOrder
}