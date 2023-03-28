// const CryptoJS = require('crypto-js');

// const secretKey = 'Kishan@1233';

// function encryptValue(value) {
//     const encryptedValue = CryptoJS.AES.encrypt(value, secretKey).toString();
//     return encryptedValue;
//   }
  

//   const encryptedValue = document.querySelector('input[name = "post_id"]').value;


//   function decryptValue(encryptedValue) {
//     const decryptedValue = CryptoJS.AES.decrypt(encryptedValue, secretKey).toString(CryptoJS.enc.Utf8);
//     return decryptedValue;
//   }
//   document.querySelector('input[name="post_id"]').value = decryptedValue;



  // Define the string
var decodedStringBtoA = 'Hello World!';

// Encode the String
var encodedStringBtoA = btoa(decodedStringBtoA);

console.log(encodedStringBtoA);



// Define the string
var encodedStringAtoB = 'SGVsbG8gV29ybGQh';

// Decode the String
var decodedStringAtoB = atob(encodedStringAtoB);

console.log(decodedStringAtoB);