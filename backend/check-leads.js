const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const leads = await prisma.lead.findMany({
    where: {
      phone: '6205700804'
    }
  });
  console.log('Leads with phone 6205700804:', leads.length);
  console.log(leads.map(l => ({ id: l.id, email: l.email, type: l.type, phone: l.phone })));
  
  const allLeads = await prisma.lead.findMany();
  console.log('Total leads:', allLeads.length);
}
main();
