import superjson from 'superjson';

export const schema = `
model User {
    id String @id @default(cuid())
    createdAt DateTime @default (now())
    updatedAt DateTime @updatedAt
    email String @unique
    posts Post[]
}

model Post {
    id String @id @default(cuid())
    createdAt DateTime @default (now())
    updatedAt DateTime @updatedAt
    title String
    author User? @relation(fields: [authorId], references: [id])
    authorId String?
    published Boolean @default(false)
    viewCount Int @default(0)
}
`;

export function makeUrl(path: string, q?: object, useSuperJson = false) {
    return q ? `${path}?q=${encodeURIComponent(useSuperJson ? superjson.stringify(q) : JSON.stringify(q))}` : path;
}