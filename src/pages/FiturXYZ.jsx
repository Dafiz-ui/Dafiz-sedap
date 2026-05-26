import React from "react";
import PageHeader from "../components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FiturXYZ() {
  return (
    <div className="p-6">
      <PageHeader title="Fitur XYZ" subtitle="Percobaan fitur baru di branch komponen-shadcnui" />

      <Card className="mt-4 w-[380px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Belajar shadcn/ui</CardTitle>
            <Badge variant="secondary">Baru</Badge>
          </div>
          <CardDescription>
            Contoh penggunaan komponen shadcn/ui di React
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Komponen ini dibuat di branch <strong>komponen-shadcnui</strong>
            lalu di-merge ke main.
          </p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button>Simpan</Button>
          <Button variant="outline">Batal</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
