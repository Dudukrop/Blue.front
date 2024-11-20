<template>
	<div class="product-table-container">
		<table class="product-table">
			<thead>
				<tr>
					<th>Nome</th>
					<th>Preço</th>
					<th>Estoque</th>
					<th>Ações</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="produto in produtos" :key="produto.id">
					<td>{{ produto.nome }}</td>
					<td>{{ produto.preco | currency }}</td>
					<td>{{ produto.estoque }}</td>
					<td>
						<button @click="editarProduto(produto)" class="btn btn-edit">Editar</button>
						<button @click="deletarProduto(produto.id)" class="btn btn-delete">Deletar</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
export default {
	props: {
		produtos: Array,
	},
	methods: {
		editarProduto(produto) {
			this.$emit('editarProduto', produto);
		},
		deletarProduto(id) {
			this.$emit('produtoDeletado', id);
		},
	},
};
</script>

<style scoped>
.product-table-container {
	margin-top: 20px;
	padding: 0 20px;
}

.product-table {
	width: 100%;
	border-collapse: collapse;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-table th,
.product-table td {
	padding: 12px 15px;
	text-align: left;
	font-size: 14px;
	color: #333;
}

.product-table th {
	background-color: #f2f2f2;
}

.product-table tr:nth-child(even) {
	background-color: #f9f9f9;
}

.product-table tr:hover {
	background-color: #f1f1f1;
}

button {
	padding: 8px 16px;
	font-size: 14px;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	margin-right: 10px;
}

button.btn-edit {
	background-color: #007bff;
	color: white;
}

button.btn-edit:hover {
	background-color: #0056b3;
}

button.btn-delete {
	background-color: #dc3545;
	color: white;
}

button.btn-delete:hover {
	background-color: #c82333;
}
</style>