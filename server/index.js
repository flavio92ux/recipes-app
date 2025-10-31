const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET'],
  allowedHeaders: ['Content-Type']
}));

// Caminho para os arquivos JSON
const dataDir = path.join(__dirname, '..', 'data');

// GET /api/receitas - Lista todas as receitas
app.get('/api/receitas', (req, res) => {
  try {
    const filePath = path.join(dataDir, 'recipes.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    // Se há query de categoria, filtra as receitas
    const { category } = req.query;
    if (category) {
      data.items = data.items.filter(
        recipe => recipe.category.toLowerCase() === category.toLowerCase()
      );
    }

    res.json(data);
  } catch (error) {
    console.error('Erro ao ler receitas:', error);
    res.status(500).json({ error: 'Erro ao carregar receitas' });
  }
});

// GET /api/receitas/:slug - Retorna uma receita específica
app.get('/api/receitas/:slug', (req, res) => {
  try {
    const { slug } = req.params;
    const filePath = path.join(dataDir, 'recipes_by_slug.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    const recipe = data[slug];
    if (!recipe) {
      return res.status(404).json({ error: 'Receita não encontrada' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Erro ao ler receita:', error);
    res.status(500).json({ error: 'Erro ao carregar receita' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});