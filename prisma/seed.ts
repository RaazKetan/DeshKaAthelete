import { prisma } from '../src/lib/prisma';

async function seed() {
  console.log('🌱 Seeding DeshKa Athlete database...');

  const athletes = [
    {
      name: 'Neeraj Chopra',
      sport: 'Athletics – Javelin Throw',
      bio: 'India\'s first Olympic gold medalist in a track and field event. A phenomenal journey from Panipat to Paris.',
      achievements: ['Olympic Gold – Tokyo 2020', 'World Champion – Budapest 2023', 'Asian Games Gold', 'Commonwealth Gold'],
      pricingSession: 75000,
      isVerified: true,
    },
    {
      name: 'Mirabai Chanu',
      sport: 'Weightlifting',
      bio: 'India\'s pride in weightlifting. Silver medalist at Tokyo Olympics and Commonwealth Champion.',
      achievements: ['Olympic Silver – Tokyo 2020', 'Commonwealth Games Gold 2022', 'World Championship Silver'],
      pricingSession: 50000,
      isVerified: true,
    },
    {
      name: 'P.V. Sindhu',
      sport: 'Badminton',
      bio: 'Two-time Olympic medalist and World Champion. One of the most recognizable athletes in India.',
      achievements: ['Olympic Silver – Rio 2016', 'Olympic Bronze – Tokyo 2020', 'World Champion 2019'],
      pricingSession: 60000,
      isVerified: true,
    },
    {
      name: 'Manu Bhaker',
      sport: 'Shooting – 10m Air Pistol',
      bio: 'History-maker at Paris 2024, winning two bronze medals—India\'s first double-medalist at a single Olympics.',
      achievements: ['Olympic Bronze – Paris 2024 (×2)', 'Commonwealth Gold 2022', 'World Cup Champion'],
      pricingSession: 40000,
      isVerified: true,
    },
    {
      name: 'Avinash Sable',
      sport: 'Athletics – 3000m Steeplechase',
      bio: 'National record holder and Asian Games gold medalist. Inspired millions through a journey from the Indian Army.',
      achievements: ['Asian Games Gold 2022', 'Commonwealth Silver 2022', 'National Record Holder'],
      pricingSession: 25000,
      isVerified: true,
    },
    {
      name: 'Ravi Kumar Dahiya',
      sport: 'Wrestling – Freestyle 57kg',
      bio: 'Chhattarpur boy who became an Olympic silver medalist through sheer grit and discipline.',
      achievements: ['Olympic Silver – Tokyo 2020', 'World Championship Bronze', 'Asian Championship Gold'],
      pricingSession: 30000,
      isVerified: true,
    },
  ];

  for (const athlete of athletes) {
    await prisma.athlete.upsert({
      where: { id: athlete.name.toLowerCase().replace(/\s/g, '-') },
      update: {},
      create: { id: athlete.name.toLowerCase().replace(/\s/g, '-'), ...athlete },
    });
    console.log(`  ✅ Seeded: ${athlete.name}`);
  }

  console.log('\n🎉 Seeding complete!');
}

seed()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
