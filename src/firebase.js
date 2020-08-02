import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAUuFc1C9atbdlWeZloPrx7vmkG2sfK7f8",
  authDomain: "relatorio-producao-77d89.firebaseapp.com",
  databaseURL: "https://relatorio-producao-77d89.firebaseio.com",
  projectId: "relatorio-producao-77d89",
  storageBucket: "relatorio-producao-77d89.appspot.com",
  messagingSenderId: "330900985501",
  appId: "1:330900985501:web:297e8bedad43e66aece674",
  measurementId: "G-9DPMQC81EH"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseFirestore = firebase.firestore();

export const storeReport = async (document) => {
  const data = {
    name: 'Brasilia',
    state: 'DF',
    country: 'BR'
  };

  return firebaseFirestore.collection('relatorios').doc(document.name).set(data);
}

export const getReport = async (document) => {
  return firebaseFirestore.collection('relatorios').doc(document.name);
}


/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.17.1/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAUuFc1C9atbdlWeZloPrx7vmkG2sfK7f8",
    authDomain: "relatorio-producao-77d89.firebaseapp.com",
    databaseURL: "https://relatorio-producao-77d89.firebaseio.com",
    projectId: "relatorio-producao-77d89",
    storageBucket: "relatorio-producao-77d89.appspot.com",
    messagingSenderId: "330900985501",
    appId: "1:330900985501:web:297e8bedad43e66aece674",
    measurementId: "G-9DPMQC81EH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script> */
