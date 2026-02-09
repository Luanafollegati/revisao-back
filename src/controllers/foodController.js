import * as model from '../models/foodModel.js';

//get all
export const getAll = async (req, res) => {
    try {
        const food = await model.findAll(req.query);

        if (!food || food.length === 0) {
            return res.status(200).json({
                message: 'Nenhum registro encontrado.',
            });
        }
        res.json(food);
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registros' });
    }
};

//create
export const create = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados da food!',
            });
        }

        const { nome, descricao, preco, categoria, disponibilidade } = req.body;

        if (!nome) return res.status(400).json({ error: 'O nome (nome) é obrigatório!' });
        if (!preco) return res.status(400).json({ error: 'O preço (preco) é obrigatório!' });
        if (!categoria)
            return res.status(400).json({ error: 'A categoria (categoria) é obrigatório!' });
        if (!descricao)
            return res.status(400).json({ error: 'A descricao (descricao) é obrigatório!' });
        if (!disponibilidade)
            return res.status(400).json({ error: 'A variável (disponibilidade) é obrigatória!' });

        const data = await model.create({
            nome,
            descricao,
            preco: parseFloat(preco),
            categoria,
            disponibilidade: disponibilidade === 'true' || disponibilidade === true,
        });

        res.status(201).json({
            message: 'Food cadastrado com sucesso!',
            data,
        });
    } catch (error) {
        console.error('Erro ao criar:', error);
        res.status(500).json({ error: 'Erro interno no servidor ao salvar a food.' });
    }
};

//by id
export const getById = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const data = await model.findById(id);
        if (!data) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
        }
        res.json({ data });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        res.status(500).json({ error: 'Erro ao buscar registro' });
    }
};

//update
export const update = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: 'Corpo da requisição vazio. Envie os dados do food!',
            });
        }

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await model.findById(id);

        if (!exists) {
            return res.status(404).json({ error: 'Food não encontrado para atualizar.' });
        }

        const data = await model.update(id, req.body);
        res.json({
            message: `A food "${data.nome}" foi atualizado com sucesso!`,
            data,
        });
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        res.status(500).json({ error: 'Erro ao atualizar a food' });
    }
};

// delete
export const remove = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

        const exists = await model.findById(id);
        if (!exists) {
            return res.status(404).json({ error: 'Food não encontrado para deletar.' });
        }

        await model.remove(id);
        res.json({
            message: `A food "${exists.nome}" foi deletado com sucesso!`,
            deletado: exists,
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        res.status(500).json({ error: 'Erro ao deletar food' });
    }
};
