import 'dotenv/config';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Iniciando seed...');

    await prisma.food.createMany({
        data: [
            {
                nome: 'Salada Caesar',
                descricao: 'Salada de alface americana com frango grelhado, croutons e molho caesar',
                preco: 28.5,
                categoria: 'entrada',
                disponibilidade: true,
            },
            {
                nome: 'Feijoada Completa',
                descricao: 'Feijoada tradicional com arroz, couve refogada e farofa',
                preco: 45,
                categoria: 'prato principal',
                disponibilidade: true,
            },
            {
                nome: 'Lasanha à Bolonhesa',
                descricao: 'Lasanha recheada com molho bolonhesa e queijo gratinado',
                preco: 38.9,
                categoria: 'prato principal',
                disponibilidade: false,
            },
            {
                nome: 'Pudim de Leite',
                descricao: 'Pudim de leite condensado com calda de caramelo',
                preco: 15,
                categoria: 'sobremesa',
                disponibilidade: true,
            },
            {
                nome: 'Suco Natural de Laranja',
                descricao: 'Suco de laranja natural feito na hora',
                preco: 8,
                categoria: 'bebida',
                disponibilidade: true,
            },
            {
                nome: 'Bruschetta Italiana',
                descricao: 'Pão italiano tostado com tomate, manjericão e azeite',
                preco: 18,
                categoria: 'entrada',
                disponibilidade: true,
            },
            {
                nome: 'Bife à Parmegiana',
                descricao: 'Bife empanado com molho de tomate e queijo, acompanhado de arroz e fritas',
                preco: 42,
                categoria: 'prato principal',
                disponibilidade: true,
            },
            {
                nome: 'Risoto de Cogumelos',
                descricao: 'Risoto cremoso feito com cogumelos frescos',
                preco: 36,
                categoria: 'prato principal',
                disponibilidade: false,
            },
            {
                nome: 'Mousse de Chocolate',
                descricao: 'Mousse de chocolate meio amargo',
                preco: 14,
                categoria: 'sobremesa',
                disponibilidade: true,
            },
            {
                nome: 'Refrigerante Lata',
                descricao: 'Refrigerante em lata 350ml',
                preco: 6,
                categoria: 'bebida',
                disponibilidade: true,
            },
            
        ],
    });

    console.log('✅ Seed concluído com sucesso!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });



