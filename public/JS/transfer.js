  function updateValue(value, codigo) {
    db.collection('users')
      .where('user', '==', email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const user = doc.data();

          if (user.customerCode == codigo) {
            const newValue = parseFloat(user.customerValue) - parseFloat(value);
            if(newValue >= 0 ){
                console.log(newValue)
  
                db.collection('users')
                    .doc(doc.id)
                    .update({ customerValue: newValue })
                    .then(() => {
                    swal
                    .fire({
                      icon: "success",
                      title: "Valor atualizado com sucesso",
                    })
                    .then(() => {
                      setTimeout(() => {
                        window.location.replace("./indexPage.html")
                      }, 1000)
                    })
                    getUserInfo()
                })
            }else{
                swal
                .fire({
                  icon: "error",
                  title: "seu saldo não é suficiente para executar tal operação",
                })
                .then(() => {
                  setTimeout(() => {
                    window.location.replace("./indexPage.html")
                  }, 1000)
                })
            }
          }else{
            swal
            .fire({
              icon: "error",
              title: "O código fornecido, não é válido"
            })
            .then(() => {
              setTimeout(() => {
                window.location.replace("./indexPage.html")
              }, 1000)
            })
          }
        });
      })
      .catch((error) => {
        swal
        .fire({
          icon: "error",
          title: "Erro ao realizar consulta",
        })
        .then(() => {
          setTimeout(() => {
            window.location.replace("./indexPage.html")
          }, 1000)
        })
      });
  }
  
  document.getElementById('trns').addEventListener('click', () => {
    const value = document.getElementById('value').value;
    const codigo = document.getElementById('codigo').value + "";
    updateValue(value, codigo);
  });