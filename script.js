		let lista = [];
		const paragrafo = document.getElementById('titulo');
		const tabela = document.getElementById('corpo-tabela');
		const container = document.getElementById('containerTabela');

		function Adicionar() {
			const prod = document.getElementById('in1').value;
			const preco = document.getElementById('in2').value;
			const qtd = document.getElementById('in3').value;
			if (!prod || !preco || !qtd) {
				alert("preencha todos os campos!")
				document.getElementById("in1").classList.add('bordinha');
				document.getElementById("in2").classList.add('bordinha');
				document.getElementById("in3").classList.add('bordinha');
			} else {
				const novoItem = { produto: prod, price: preco, quantidade: qtd };
				lista.push(novoItem);
				document.getElementById("in1").classList.remove('bordinha');
				document.getElementById("in2").classList.remove('bordinha');
				document.getElementById("in3").classList.remove('bordinha');
                paragrafo.innerHTML = `<h2>Produto adicionado. Total cadastrados: ${lista.length}</h2> `;
			}
			container.style.display = 'none';
		};

		function Tabela() {
			const tabela = document.getElementById("corpoTabela");

            if (lista.length === 0) {
				alert("Sua lista está vazia!");
				return; // esse return evita que a primeira linha da tabela seja criada.
			}
			tabela.innerHTML = "";
			paragrafo.innerHTML = "<h2>Produtos cadastrados</h2>";
			container.style.display = 'block';
			lista.forEach((item, index) => {
				tabela.innerHTML += `
            <tr>
                <td>${index}</td> 
                <td>${item.produto}</td>
				<td>${item.price}</td>
				<td>${item.quantidade}</td>
				<td>${item.price * item.quantidade}</td>
            </tr>`;
			});
		}

		function Resumo() {
			container.style.display = 'none';

			if (lista.length === 0) {
				alert("Adicione produtos!");
                return;
			} 

			const totalItens = lista.reduce((acumulador, produto) => { // esse acumulador começa em 0, tá no final da função
				return acumulador + Number(produto.quantidade); // esse number é pra converter o valor em numero 
			}, 0);

			// 2. Valor Total do Estoque (Soma de: preco * qtd)
			const valorEstoque = lista.reduce((acumulador, produto) => { // a mesma coisa do outro esse acumulador
				return acumulador + (Number(produto.price) * Number(produto.quantidade));
			}, 0);

            paragrafo.innerHTML =  `
            <h3>Resumo</h3>
            <p>Total de produtos (linhas): ${lista.length}</p> 
	        <p>Total de itens (somando quantidades): ${totalItens}</p>  
	        <p>Valor total do estoque: ${valorEstoque.toFixed(2)}</p> `
		};

		function RemoveIn() {
			const ind = document.getElementById('indice').value;
			container.style.display = 'none';
			if (!ind || ind > lista.length) {
				alert("Seu troxa!");
			} else {
				lista.splice(ind, 1);
				paragrafo.innerHTML = "<h2>Foi removido com sucesso</h2>";
			}
		};

		function Limpar() {
			lista = [];
			container.style.display = 'none';
			paragrafo.innerHTML = "<h2>Todos os produtos foram removidos</h2>";
		};
