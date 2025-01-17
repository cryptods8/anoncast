import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'

export const signersTable = pgTable('signers', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  address: varchar({ length: 255 }).notNull().unique(),
  signerUuid: varchar({ length: 255 }).notNull().unique(),
})
