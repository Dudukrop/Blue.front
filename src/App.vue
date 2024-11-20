<template>
  <div class="app-container">
    <Header @adicionarProduto="adicionarProduto" @adicionarCategoria="adicionarCategoria" />
    <ProductTable :produtos="produtos" @editarProduto="editarProduto" @produtoDeletado="deletarProduto" />

    <Modal :visible="isModalVisible" :produtoAtual="produtoAtual" @update:visible="isModalVisible = $event"
      @salvarProduto="salvarProduto" />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import ProductTable from "./components/ProductTable.vue";
import Modal from "./components/Modal.vue";

export default {
  components: { Header, ProductTable, Modal },
  data() {
    return {
      produtos: [],
      isModalVisible: false,
      produtoAtual: null,
    };
  },
  methods: {
    async fetchProdutos() {
      try {
        const response = await fetch("https://localhost:7122/Produtos");
        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
        const data = await response.json();
        this.produtos = data.map((produto) => ({
          id: produto.id,
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          estoque: produto.estoque,
          categoria: produto.categoriaId,
        }));
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar os produtos!");
      }
    },

    adicionarProduto() {
      this.produtoAtual = null;
      this.isModalVisible = true;
    },

    editarProduto(produto) {
      this.produtoAtual = { ...produto };
      this.isModalVisible = true;
    },

    async deletarProduto(id) {
      try {
        const response = await fetch(`https://localhost:7122/Produtos/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`Erro ao excluir produto: ${response.statusText}`);
        this.produtos = this.produtos.filter(produto => produto.id !== id);
        alert("Produto excluído com sucesso!");
      } catch (error) {
        console.error(error);
        alert("Erro ao excluir o produto.");
      }
    },

    async salvarProduto(produto) {
      try {
        let response;
        if (produto.id) {

          response = await fetch(`https://localhost:7122/Produtos/${produto.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto),
          });
        } else {

          response = await fetch(`https://localhost:7122/Produtos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto),
          });
        }

        if (!response.ok) throw new Error(`Erro: ${response.statusText}`);

        await this.fetchProdutos();
        this.isModalVisible = false;
      } catch (error) {
        console.error(error);
        alert("Erro ao salvar o produto.");
      }
    },
  },

  mounted() {
    this.fetchProdutos();
  },
};
</script>