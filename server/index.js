const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Caminho para os arquivos JSON
const dataDir = path.join(__dirname, "..", "data");

// GET /api/receitas - Lista todas as receitas
app.get("/api/receitas", (req, res) => {
  try {
    const filePath = path.join(dataDir, "recipes.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    // Se há query de categoria, filtra as receitas
    const { category, tag } = req.query;
    if (category) {
      data.items = data.items.filter(
        (recipe) => recipe.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (tag) {
      data.items = data.items.filter((recipe) => 
        recipe.tags?.some(t => t.toLowerCase() === tag.toLowerCase())
      );
    }

    // Ordena as receitas pelo campo publishedAt (mais recente primeiro)
    data.items.sort(
      (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );

    res.json(data);
  } catch (error) {
    console.error("Erro ao ler receitas:", error);
    res.status(500).json({ error: "Erro ao carregar receitas" });
  }
});

// GET /api/search - Busca receitas por título
app.get("/api/search", (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ error: "Parâmetro 'q' é obrigatório" });
    }

    const filePath = path.join(dataDir, "recipes.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    const results = data.items
      .filter((recipe) => recipe.title.toLowerCase().includes(q.toLowerCase()))
      .map((recipe) => ({
        title: recipe.title,
        path: `/receitas/${recipe.slug}`,
      }));

    res.json({ total: results.length, items: results });
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
    res.status(500).json({ error: "Erro ao buscar receitas" });
  }
});

// GET /api/receitas/:slug - Retorna uma receita específica
app.get("/api/receitas/:slug", (req, res) => {
  try {
    const { slug } = req.params;
    const filePath = path.join(dataDir, "recipes_by_slug.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    const recipe = data[slug];
    if (!recipe) {
      return res.status(404).json({ error: "Receita não encontrada" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Erro ao ler receita:", error);
    res.status(500).json({ error: "Erro ao carregar receita" });
  }
});

// GET /api/categorias - Retorna lista de categorias únicas
app.get("/api/categorias", (req, res) => {
  try {
    const filePath = path.join(dataDir, "recipes.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    const categories = Array.from(
      new Set(
        (data.items || [])
          .map((r) => (r.category || "").toLowerCase())
          .filter(Boolean)
      )
    );

    res.json({ total: categories.length, items: categories });
  } catch (error) {
    console.error("Erro ao ler categorias:", error);
    res.status(500).json({ error: "Erro ao carregar categorias" });
  }
});

// GET /api/slugs - Retorna todos os slugs
app.get("/api/slugs", (req, res) => {
  try {
    const filePath = path.join(dataDir, "recipes.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    const slugs = (data.items || []).map((r) => r.slug).filter(Boolean);

    res.json({ total: slugs.length, items: slugs });
  } catch (error) {
    console.error("Erro ao carregar slugs:", error);
    res.status(500).json({ error: "Erro ao carregar slugs" });
  }
});

// POST /api/receitas - Adiciona uma nova receita
app.post("/api/receitas", (req, res) => {
  try {
    const newRecipe = req.body;

    // Validação simples
    if (!newRecipe || !newRecipe.title || !newRecipe.slug) {
      return res.status(400).json({ error: "Dados da receita inválidos" });
    }

    const recipesFilePath = path.join(dataDir, "recipes.json");
    const recipesBySlugFilePath = path.join(dataDir, "recipes_by_slug.json");

    const recipesRaw = fs.readFileSync(recipesFilePath, "utf-8");
    const recipesData = JSON.parse(recipesRaw);

    const recipesBySlugRaw = fs.readFileSync(recipesBySlugFilePath, "utf-8");
    const recipesBySlugData = JSON.parse(recipesBySlugRaw);

    newRecipe.publishedAt = new Date().toISOString();

    // Adiciona a nova receita
    recipesData.items.push(newRecipe);
    recipesData.total = recipesData.items.length;

    recipesBySlugData[newRecipe.slug] = newRecipe;

    fs.writeFileSync(recipesFilePath, JSON.stringify(recipesData, null, 2));
    fs.writeFileSync(
      recipesBySlugFilePath,
      JSON.stringify(recipesBySlugData, null, 2)
    );

    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Erro ao adicionar receita:", error);
    res.status(500).json({ error: "Erro ao adicionar receita" });
  }
});

// GET /api/tags - Retorna lista de tags
app.get("/api/tags", (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/recipes.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(raw);

    // Extrai todas as categorias únicas das receitas
    const tags = Array.from(
      new Set(data.items.map((recipe) => recipe.category))
    );

    res.json({ tags });
  } catch (error) {
    console.error("Erro ao carregar tags:", error);
    res.status(500).json({ error: "Erro ao carregar tags" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});
