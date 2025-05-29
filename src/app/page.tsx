
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function DarulIrfanIntroPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-background text-foreground">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold text-center text-primary">
            Darul Irfan Islamic Academy
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground pt-2">
            Welcome to our esteemed institution.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video w-full relative overflow-hidden rounded-lg shadow-md">
            <Image
              src="https://storage.googleapis.com/project-sparky-firebase-testing/temp-assets/darul-irfan-campus.jpg"
              alt="Darul Irfan Islamic Academy campus with students in assembly"
              layout="fill"
              objectFit="cover"
              data-ai-hint="college campus assembly"
              className="rounded-lg"
            />
          </div>
          <p className="text-muted-foreground text-center px-2">
            Darul Irfan Islamic Academy is dedicated to providing excellent education and fostering a vibrant community. Learn more about our values and programs.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end pt-4">
          <Link href="/lisan-intro" passHref>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95">
              Next <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
       <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Darul Irfan Islamic Academy. All rights reserved.</p>
        </footer>
    </main>
  );
}
