# E-commerce de Sacos de Lixo

Este é um projeto simples de e-commerce para venda de sacos de lixo, feito com React + Vite e pronto para deploy no GitHub Pages.

## Funcionalidades
- Página inicial com listagem dos produtos
- Página de detalhes do produto
- Carrinho de compras
- Checkout simples

## Como rodar localmente

1. Instale as dependências:
	```bash
	npm install
	```
2. Rode o projeto:
	```bash
	npm run dev
	```

## Deploy no GitHub Pages

1. Altere o campo `base` no `vite.config.js` para o nome do seu repositório:
	```js
	// vite.config.js
	export default defineConfig({
	  base: '/NOME-DO-REPO/',
	  // ...
	})
	```
2. Instale o plugin de deploy:
	```bash
	npm install --save-dev gh-pages
	```
3. Adicione os scripts no `package.json`:
	```json
	"scripts": {
	  "predeploy": "npm run build",
	  "deploy": "gh-pages -d dist"
	}
	```
4. Faça o deploy:
	```bash
	npm run deploy
	```

## Imagens
Coloque as imagens dos produtos na raiz pública (`public/`).

---

Feito por um designer excelente. ;)
# Ibra1
