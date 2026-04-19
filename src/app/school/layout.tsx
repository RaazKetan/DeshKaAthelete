import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import ClientLayout from "./client-layout";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function SchoolLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const schoolId = cookieStore.get("auth_school_id")?.value;
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || ""; 

  let schoolData = null;

  if (schoolId) {
    const school = await prisma.school.findUnique({
      where: { id: schoolId },
      select: { name: true, city: true }
    });
    schoolData = school;
  }

  return (
    <ClientLayout school={schoolData}>
      {children}
    </ClientLayout>
  );
}
