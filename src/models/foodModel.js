import prisma from '../utils/prismaClient.js';

export const create = async (data) => {
    return await prisma.food.create({ data });
};

export const findAll = async (filters = {}) => {
    const { nome, categoria, disponibilidade } = filters;
    const where = {};

    if (nome) where.nome = { contains: nome, mode: 'insensitive' };
    if (categoria) where.categoria = { contains: categoria, mode: 'insensitive' };
    if (disponibilidade !== undefined) where.disponibilidade = Boolean(disponibilidade) 


    return await prisma.food.findMany({
        where,
        orderBy: { createdAt: 'desc' },
    });
};

export const findById = async (id) => {
    return await prisma.food.findUnique({
        where: { id: parseInt(id) },
    });
};

export const update = async (id, data) => {
    return await prisma.food.update({
        where: { id: parseInt(id) },
        data,
    });
};

export const remove = async (id) => {
    return await prisma.food.delete({
        where: { id: parseInt(id) },
    });
};

