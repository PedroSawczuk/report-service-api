import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('reports', (table) => {
        table.uuid('id').primary();
        table.string('title').notNullable();
        table.text('description');
        table.string('url_path');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('reports');
}

