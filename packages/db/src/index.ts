import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { signersTable } from './db/schema'
import { eq } from 'drizzle-orm'

const db = drizzle(process.env.DATABASE_URL as string)

export async function getSignerForAddress(address: string) {
  const [user] = await db
    .select()
    .from(signersTable)
    .where(eq(signersTable.address, address))
    .limit(1)
  return user
}

export async function createSignerForAddress(address: string, signerUuid: string) {
  const [user] = await db
    .insert(signersTable)
    .values({ address, signerUuid })
    .onConflictDoUpdate({ target: signersTable.address, set: { signerUuid } })
    .returning()
  return user
}
