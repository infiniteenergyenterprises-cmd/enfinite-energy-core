const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  let role = await prisma.role.findUnique({ where: { name: 'ADMIN' } });
  if (!role) {
    role = await prisma.role.create({
      data: {
        name: 'ADMIN',
        permissions: '["ALL"]'
      }
    });
  }

  const hash = await bcrypt.hash('admin123', 10);
  
  await prisma.user.upsert({
    where: { email: 'admin@enfinite.com' },
    update: { password: hash },
    create: {
      email: 'admin@enfinite.com',
      password: hash,
      firstName: 'Super',
      lastName: 'Admin',
      roleId: role.id
    }
  });

  console.log('Admin account ready: admin@enfinite.com / admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
