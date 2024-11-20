<template>
	<div v-if="visible" class="modal-overlay">
		<div class="modal-content">
			<h3>{{ produto.id ? 'Editar Produto' : 'Adicionar Produto' }}</h3>
			<form @submit.prevent="handleSubmit">
				<div class="input-group">
					<label for="nome">Nome:</label>
					<input v-model="produto.nome" type="text" id="nome" placeholder="Digite o nome do produto"
						required />
				</div>
				<div class="input-group">
					<label for="descricao">Descrição:</label>
					<input v-model="produto.descricao" type="text" id="descricao" placeholder="Digite uma descrição" />
				</div>
				<div class="input-group">
					<label for="preco">Preço:</label>
					<input v-model="produto.preco" type="number" id="preco" placeholder="Preço do produto" required />
				</div>
				<div class="input-group">
					<label for="estoque">Estoque:</label>
					<input v-model="produto.estoque" type="number" id="estoque" placeholder="Quantidade no estoque"
						required />
				</div>
				<div class="input-group">
					<label for="categoria">Categoria:</label>
					<input v-model="produto.categoria" type="number" id="categoria" placeholder="Categoria do produto"
						required />
				</div>
				<div class="modal-actions">
					<button type="submit" class="btn btn-primary">Salvar</button>
					<button type="button" @click="fecharModal" class="btn btn-secondary">Cancelar</button>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		visible: Boolean,
		produtoAtual: Object,
	},
	data() {
		return {
			produto: {
				nome: '',
				descricao: '',
				preco: null,
				estoque: null,
				categoria: null,
				...this.produtoAtual,
			},
		};
	},
	watch: {
		produtoAtual(newProduto) {
			if (newProduto) {
				this.produto = { ...newProduto }; // Atualiza o produto se for um produto já existente
			}
		},
	},
	methods: {
		handleSubmit() {
			if (this.produto.id) {
				// Se o produto tiver um id, envia a requisição PUT (editar)
				this.$emit('salvarProduto', { ...this.produto, id: this.produto.id });
			} else {
				// Caso contrário, envia a requisição POST (adicionar)
				this.$emit('salvarProduto', { ...this.produto });
			}
		},
		fecharModal() {
			this.$emit('update:visible', false);
		},
	},
};
</script>

<style scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.modal-content {
	background: white;
	padding: 20px;
	border-radius: 10px;
	width: 400px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease-in-out;
}

h3 {
	text-align: center;
	color: #333;
	margin-bottom: 20px;
}

.input-group {
	margin-bottom: 15px;
}

.input-group label {
	display: block;
	font-size: 14px;
	color: #555;
}

.input-group input {
	width: 100%;
	padding: 10px;
	font-size: 14px;
	border: 1px solid #ccc;
	border-radius: 5px;
	margin-top: 5px;
	background-color: #f9f9f9;
	transition: border-color 0.2s;
}

.input-group input:focus {
	border-color: #007bff;
	outline: none;
}

.modal-actions {
	display: flex;
	justify-content: space-between;
}

button {
	padding: 10px 20px;
	font-size: 16px;
	border-radius: 5px;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

button[type="submit"] {
	background-color: #28a745;
	color: white;
}

button[type="submit"]:hover {
	background-color: #218838;
}

button[type="button"] {
	background-color: #6c757d;
	color: white;
}

button[type="button"]:hover {
	background-color: #5a6268;
}
</style>