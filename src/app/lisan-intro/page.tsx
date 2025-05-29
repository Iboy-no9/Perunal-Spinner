
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function LisanIntroPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-background text-foreground">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold text-center text-primary">
            Lisan - Students Union
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground pt-2">
            The voice of the students at Darul Irfan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video w-full relative overflow-hidden rounded-lg shadow-md">
            <Image
              src="https://placehold.co/600x338.png"
              alt="Lisan Students Union"
              layout="fill"
              objectFit="cover"
              data-ai-hint="student union group"
              className="rounded-lg"
            />
          </div>
          <p className="text-muted-foreground text-center px-2">
            Lisan represents the student body, organizing events, and working to enhance the student experience at Darul Irfan Islamic Academy.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end pt-4">
          <Link href="/spinner" passHref>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-md transition-transform transform hover:scale-105 active:scale-95">
              Next <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Lisan Students Union. Powered by students.</p>
        </footer>
    </main>
  );
}
