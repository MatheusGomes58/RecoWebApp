
let currentUser = {}

function login() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut()
  }
  
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      swal
        .fire({
          icon: "success",
          title: "Login realizado com sucesso",
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace("./indexPage.html")
          }, 1000)
        })
    })
    .catch((error) => {
      const errorCode = error.code
      switch (errorCode) {
        case "auth/wrong-password":
          swal.fire({
            icon: "error",
            title: "Senha inválida",
          })
          break
        case "auth/invalid-email":
          swal.fire({
            icon: "error",
            title: "E-mail inválido",
          })
          break
        case "auth/user-not-found":
          swal
            .fire({
              icon: "warning",
              title: "Usuário não encontrado",
            })
          break
        default:
          swal.fire({
            icon: "error",
            title: error.message,
          })
      }
    })
}

function logando() {
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      swal
        .fire({
          icon: "success",
          title: "Login realizado com sucesso",
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace("profile.html")
          }, 1000)
        })
    })
    .catch((error) => {
      const errorCode = error.code
      switch (errorCode) {
        case "auth/wrong-password":
          swal.fire({
            icon: "error",
            title: "Senha inválida",
          })
          break
        case "auth/invalid-email":
          swal.fire({
            icon: "error",
            title: "E-mail inválido",
          })
          break
        case "auth/user-not-found":
          swal
            .fire({
              icon: "warning",
              title: "Usuário não encontrado",
            })
          break
        default:
          swal.fire({
            icon: "error",
            title: error.message,
          })
      }
    })
}

function logout() {
  firebase.auth().signOut()
}

function getUser() {
  if(document.title !== "Tela de Login"){
    firebase.auth().onAuthStateChanged((user) => {
      let userLabel = document.getElementById("useLabel")
      if (user) {
        currentUser.uid = user.uid
        userLabel.innerHTML = user.email
        if(email != null){email.value = user.email}
        getUserInfo(user.email)
      } else {
        swal
          .fire({
            icon: "success",
            title: "Redirecionando para a tela de autenticação",
          })
        .then(() => {
          setTimeout(() => {
            window.location.replace("./index.html")
          }, 1000)
        })
      }
    })
  }
}

window.onload = function () {
  getUser()
  console.log(document.title)
  if(typeof titulo != "undefined")
  {
    db = firebase.firestore()
  }
  
}