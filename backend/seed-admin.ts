import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  let role = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN', permissions: ['ALL'] }
  });
  
  await prisma.user.upsert({
    where: { email: 'admin@enfinite.com' },
    update: { roleId: role.id, password: hashedPassword },
    create: { 
      email: 'admin@enfinite.com', 
      password: hashedPassword, 
      firstName: 'Admin', 
      lastName: 'User', 
      roleId: role.id 
    }
  });
  
  console.log('Admin seeded successfully: admin@enfinite.com / admin123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
