import { prisma } from '../src/lib/prisma';

async function seed() {
  console.log('🌱 Seeding DeshKa Athlete database...');

  const athletes = [
    {
      id: 'neeraj-chopra',
      username: 'neeraj_chopra',
      phone: '9876500001',
      password: 'athlete123',
      name: 'Neeraj Chopra',
      sport: 'Athletics',
      bio: "India's first Olympic gold medalist in a track & field event. A phenomenal journey from Panipat to Paris.",
      achievements: ['Olympic Gold – Tokyo 2020', 'World Champion – Budapest 2023', 'Asian Games Gold', 'Commonwealth Gold'],
      pricingSession: 75000,
      isVerified: true,
      aadhaarLastFour: '1234',
      federationId: 'AFI/HR/001',
    },
    {
      id: 'mirabai-chanu',
      username: 'mirabai_chanu',
      phone: '9876500002',
      password: 'athlete123',
      name: 'Mirabai Chanu',
      sport: 'Weightlifting',
      bio: "India's pride in weightlifting. Silver medalist at Tokyo Olympics and Commonwealth Champion.",
      achievements: ['Olympic Silver – Tokyo 2020', 'Commonwealth Games Gold 2022', 'World Championship Silver'],
      pricingSession: 50000,
      isVerified: true,
      aadhaarLastFour: '5678',
      federationId: 'IWLF/MN/001',
    },
    {
      id: 'pv-sindhu',
      username: 'pv_sindhu',
      phone: '9876500003',
      password: 'athlete123',
      name: 'P.V. Sindhu',
      sport: 'Badminton',
      bio: 'Two-time Olympic medalist and World Champion. One of the most recognizable athletes in India.',
      achievements: ['Olympic Silver – Rio 2016', 'Olympic Bronze – Tokyo 2020', 'World Champion 2019'],
      pricingSession: 60000,
      isVerified: true,
      aadhaarLastFour: '9012',
      federationId: 'BAI/TL/001',
    },
    {
      id: 'manu-bhaker',
      username: 'manu_bhaker',
      phone: '9876500004',
      password: 'athlete123',
      name: 'Manu Bhaker',
      sport: 'Shooting',
      bio: "History-maker at Paris 2024, winning two bronze medals — India's first double-medalist at a single Olympics.",
      achievements: ['Olympic Bronze – Paris 2024 (×2)', 'Commonwealth Gold 2022', 'World Cup Champion'],
      pricingSession: 40000,
      isVerified: true,
      aadhaarLastFour: '3456',
      federationId: 'NRAI/HR/001',
    },
    {
      id: 'avinash-sable',
      username: 'avinash_sable',
      phone: '9876500005',
      password: 'athlete123',
      name: 'Avinash Sable',
      sport: 'Athletics',
      bio: 'National record holder and Asian Games gold medalist. Inspired millions through a journey from the Indian Army.',
      achievements: ['Asian Games Gold 2022', 'Commonwealth Silver 2022', 'National Record Holder'],
      pricingSession: 25000,
      isVerified: true,
      aadhaarLastFour: '7890',
      federationId: 'AFI/MH/002',
    },
    {
      id: 'ravi-dahiya',
      username: 'ravi_dahiya',
      phone: '9876500006',
      password: 'athlete123',
      name: 'Ravi Kumar Dahiya',
      sport: 'Wrestling',
      bio: 'Chhattarpur boy who became an Olympic silver medalist through sheer grit and discipline.',
      achievements: ['Olympic Silver – Tokyo 2020', 'World Championship Bronze', 'Asian Championship Gold'],
      pricingSession: 30000,
      isVerified: true,
      aadhaarLastFour: '2345',
      federationId: 'WFI/DL/001',
    },
  ];

  for (const athlete of athletes) {
    await prisma.athlete.upsert({
      where: { id: athlete.id },
      update: {},
      create: athlete,
    });
    console.log(`  ✅ Seeded: ${athlete.name}  (@${athlete.username}  /  📱 ${athlete.phone}  /  🔑 ${athlete.password})`);
  }

  // Seed a demo school
  const school = await prisma.school.upsert({
    where: { id: 'demo-school' },
    update: {},
    create: {
      id: 'demo-school',
      name: 'Delhi Public School, R.K. Puram',
      city: 'New Delhi',
      contact: '9811000001',
    },
  });
  console.log(`\n  🏫 Seeded School: ${school.name} (📱 ${school.contact})`);

  console.log('\n🎉 Seeding complete!');
  console.log('\n📋 Test Login Credentials:');
  console.log('──────────────────────────────────────────');
  console.log('ATHLETES → /athlete/auth (password: athlete123)');
  athletes.forEach(a => console.log(`  @${a.username} | ${a.phone}`));
  console.log('\nSCHOOL → /school/auth');
  console.log(`  Contact: ${school.contact} | Name: ${school.name}`);
  console.log('──────────────────────────────────────────\n');
}

seed()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
