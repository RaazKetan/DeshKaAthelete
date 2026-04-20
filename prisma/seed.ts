import { prisma } from '../src/lib/prisma';

async function seed() {
  console.log('🌱 Seeding DeshKa Athlete database...');

  const athletes = [
    {
      name: 'Neeraj Chopra',
      sport: 'Athletics – Javelin Throw',
      bio: "India's first Olympic gold medalist in a track and field event. A phenomenal journey from Panipat to Paris.",
      pricingSession: 75000,
      isVerified: true,
      achievements: [
        { title: 'Olympic Gold – Tokyo 2020', year: 2021 },
        { title: 'World Champion – Budapest 2023', year: 2023 },
        { title: 'Asian Games Gold', year: 2022 },
        { title: 'Commonwealth Gold', year: 2022 },
      ],
    },
    {
      name: 'Mirabai Chanu',
      sport: 'Weightlifting',
      bio: "India's pride in weightlifting. Silver medalist at Tokyo Olympics and Commonwealth Champion.",
      pricingSession: 50000,
      isVerified: true,
      achievements: [
        { title: 'Olympic Silver – Tokyo 2020', year: 2021 },
        { title: 'Commonwealth Games Gold 2022', year: 2022 },
        { title: 'World Championship Silver', year: 2021 },
      ],
    },
    {
      name: 'P.V. Sindhu',
      sport: 'Badminton',
      bio: 'Two-time Olympic medalist and World Champion. One of the most recognizable athletes in India.',
      pricingSession: 60000,
      isVerified: true,
      achievements: [
        { title: 'Olympic Silver – Rio 2016', year: 2016 },
        { title: 'Olympic Bronze – Tokyo 2020', year: 2021 },
        { title: 'World Champion 2019', year: 2019 },
      ],
    },
    {
      name: 'Manu Bhaker',
      sport: 'Shooting – 10m Air Pistol',
      bio: "History-maker at Paris 2024, winning two bronze medals—India's first double-medalist at a single Olympics.",
      pricingSession: 40000,
      isVerified: true,
      achievements: [
        { title: 'Olympic Bronze – Paris 2024 (×2)', year: 2024 },
        { title: 'Commonwealth Gold 2022', year: 2022 },
        { title: 'World Cup Champion', year: 2023 },
      ],
    },
    {
      name: 'Avinash Sable',
      sport: 'Athletics – 3000m Steeplechase',
      bio: 'National record holder and Asian Games gold medalist. Inspired millions through a journey from the Indian Army.',
      pricingSession: 25000,
      isVerified: true,
      achievements: [
        { title: 'Asian Games Gold 2022', year: 2022 },
        { title: 'Commonwealth Silver 2022', year: 2022 },
        { title: 'National Record Holder', year: 2022 },
      ],
    },
    {
      name: 'Ravi Kumar Dahiya',
      sport: 'Wrestling – Freestyle 57kg',
      bio: 'Chhattarpur boy who became an Olympic silver medalist through sheer grit and discipline.',
      pricingSession: 30000,
      isVerified: true,
      achievements: [
        { title: 'Olympic Silver – Tokyo 2020', year: 2021 },
        { title: 'World Championship Bronze', year: 2021 },
        { title: 'Asian Championship Gold', year: 2020 },
      ],
    },
    {
      name: 'Nikhat Zareen',
      sport: 'Boxing',
      bio: 'Two-time World Boxing Champion who broke barriers and inspired a generation of women boxers in India.',
      pricingSession: 35000,
      isVerified: true,
      achievements: [
        { title: 'World Champion 2022', year: 2022 },
        { title: 'World Champion 2023', year: 2023 },
        { title: 'Commonwealth Games Silver 2022', year: 2022 },
      ],
    },
    {
      name: 'Sreejesh P.R.',
      sport: 'Hockey (Field) – Goalkeeping',
      bio: "India's legendary goalkeeper who captained the national team to multiple victories including an Olympic bronze.",
      pricingSession: 45000,
      isVerified: true,
      achievements: [
        { title: 'Olympic Bronze – Tokyo 2020', year: 2021 },
        { title: 'Olympic Bronze – Paris 2024', year: 2024 },
        { title: 'Asian Games Gold 2022', year: 2022 },
      ],
    },
  ];

  for (const athleteData of athletes) {
    const { achievements, ...athleteFields } = athleteData;
    
    const athlete = await prisma.athlete.upsert({
      where: { id: athleteFields.name.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '') },
      update: {
        ...athleteFields,
        pricingSession: athleteFields.pricingSession,
      },
      create: {
        id: athleteFields.name.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, ''),
        ...athleteFields,
        pricingSession: athleteFields.pricingSession,
      },
    });

    // Delete old achievements for this athlete and re-create
    await prisma.achievement.deleteMany({ where: { athleteId: athlete.id } });
    for (const ach of achievements) {
      await prisma.achievement.create({
        data: {
          athleteId: athlete.id,
          title: ach.title,
          year: ach.year,
          isVerified: true,
        },
      });
    }

    console.log(`  ✅ Seeded: ${athlete.name} (${achievements.length} achievements)`);
  }

  console.log('\n🎉 Seeding complete!');
}

seed()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
