const itemTable = document.getElementById('item-table');
const itemsPerPage = 5;
let lastVisibleItem = null;

const prevButton = document.getElementById('back');
const nextButton = document.getElementById('next');

prevButton.addEventListener('click', showPreviousPage);
nextButton.addEventListener('click', showNextPage);

function showPreviousPage() {
  if (lastVisibleItem) {
    clearTable();
    lastVisibleItem = null;
    renderitems();
  }
}

function showNextPage() {
  clearTable();
  renderitems();
}

function clearTable() {
  itemTable.innerHTML = '';
}

function updateButtonState() {
  prevButton.disabled = !lastVisibleItem; 
}


async function renderitems(type) {
    itemTable.innerHTML = "";
    let query;
    if(type = "admin"){
      query = db.collection('itens').where("buy", "==", email).limit(itemsPerPage);
    }else{
      query = db.collection('itens').where("user", "==", email).limit(itemsPerPage);
    }

    if (lastVisibleItem) {
        query = query.startAfter(lastVisibleItem);
    }

    query.get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const item = doc.data();
        const { iten, data, qtde, value } = item;

        // Crie uma nova linha na tabela para cada item
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data}</td>
            <td>${iten}</td>
            <td>${qtde}</td>
            <td>${value}</td>
        `;

        // Adicione a linha à tabela
        itemTable.appendChild(row);
        });
        // Verifica se há mais itens a serem exibidos
        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        if (querySnapshot.size < itemsPerPage) {
        // Todos os itens foram exibidos
        lastVisibleItem = null;
        } else {
        // Ainda há mais itens para buscar
        lastVisibleItem = lastVisible;
        }
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

async function addItem(newItem, data, qtde, emailv, valor) {
  try {
    const userRef = db.collection('users');
    
    // Subtrair o valor do usuário em 'emaibuy'
    const userBuyQuery = userRef.where('user', '==', email);
    const userBuySnapshot = await userBuyQuery.get();
    var debito = false;
    var transacao = false;
    
    if (!userBuySnapshot.empty) {
      const userBuyDoc = userBuySnapshot.docs[0];
      const userBuyData = userBuyDoc.data();
      const newBuyValue = parseFloat(userBuyData.customerValue) - parseFloat(value);
      if(newValue >= 0 ){  
        await userBuyDoc.ref.update({ customerValue: newBuyValue }).then(() => {
          debito = true
        })
      }
    }
    
    // Somar o valor do usuário em 'email'
    const userQuery = userRef.where('user', '==', emailv);
    const userSnapshot = await userQuery.get();
    
    if (!userSnapshot.empty && debito) {
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data();
      const userValue = userData.customerValue || 0;
      const newValue = userValue + parseFloat(valor);
      
      await userDoc.ref.update({ customerValue: newValue }).then(() => {
        transacao = true
      })
    }
    
    // Adicionar o novo item na coleção 'itens'
    if(transacao){
      const newItemDocRef = await db.collection('itens').add({
        iten: newItem,
        data: data,
        qtde: qtde,
        user: emailv,
        value: valor,
        buy: email
      });
      
      console.log('Novo item adicionado com ID:', newItemDocRef.id);
      
      if (document.titulo !== "Histórioco de Transferencia") {
        renderitems();
      }
    }
  } catch (error) {
    console.error('Erro ao adicionar novo item');
  }
}

document.getElementById('save').addEventListener('click', () => {
  const newItem = document.getElementById('iten').value;
  const data = document.getElementById('data').value;
  const qtde = document.getElementById('qtde').value;
  const email = document.getElementById('email').value;
  const valor = document.getElementById('valor').value;

  addItem(newItem, data, qtde, email, valor);
});
  