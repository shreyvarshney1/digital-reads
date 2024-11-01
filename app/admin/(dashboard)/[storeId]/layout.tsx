import { redirect } from "next/navigation";
import React from "react";

import prisma from "@/lib/prisma";
import Navbar from "@/components/navbar";
import { auth, signIn } from "@/auth";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const session = await auth();
  const userId = session?.user?.id;
  // const role = session?.user?.role;
  if (!userId) {
    signIn("google");
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId,
    },
  });

  if (!store) {
    redirect("/admin");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
