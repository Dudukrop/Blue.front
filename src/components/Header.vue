<template>
	<div class="button-container">
		<button @click="adicionarProduto" class="btn btn-primary">Adicionar Produto</button>
	</div>
</template>

<script>
export default {
	methods: {
		adicionarProduto() {
			this.$emit("adicionarProduto");
		},
		adicionarCategoria() {
			this.$emit("adicionarCategoria");
		},
	},
};
</script>

<style scoped>
.button-container {
	display: flex;
	justify-content: space-between;
	gap: 15px;
	margin-top: 20px;
	padding: 0 20px;
}

button {
	padding: 12px 20px;
	font-size: 16px;
	border-radius: 8px;
	border: none;
	cursor: pointer;
	transition: background-color 0.3s ease, transform 0.2s ease;
	width: 48%;
}

button:hover {
	transform: translateY(-2px);
}

button:active {
	transform: translateY(2px);
}

.btn-primary {
	background-color: #007bff;
	color: white;
}

.btn-primary:hover {
	background-color: #0056b3;
}

.btn-secondary {
	background-color: #28a745;
	color: white;
}

.btn-secondary:hover {
	background-color: #218838;
}
</style>