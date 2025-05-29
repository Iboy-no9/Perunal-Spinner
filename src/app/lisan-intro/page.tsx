
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
            League of Irfan Students' Artistic Nourishment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video w-full relative overflow-hidden rounded-lg shadow-md">
            <Image
              src="https://v6xrx50k-3000.inc1.devtunnels.ms/images/lisan%20logo%20new.png"
              alt="Lisan Students Union Logo"
              layout="fill"
              objectFit="contain"
              data-ai-hint="student union logo"
              className="rounded-lg"
            />
          </div>
          <div className="text-muted-foreground text-sm text-justify px-2 leading-relaxed space-y-3">
            <p>
              League of Irfan Students' Artistic Nourishment (Lisan), established in 2016, is a vibrant platform
              for students to nourish the values of Islamic leadership and compassionate service.
              Rooted in the official constitution, 10 Core Committee members were selected after the
              yearly election. 6 Working Committees; General Awareness Board (GAB), Language
              Board, Art Zone, PKV, IT, and state-registered SKSSF run all programs and contests while
              5 Auxilary Committees; Organizing Council, Marketing Management, Stationary
              Publishing Burea, and Media Crew stretch their arms to support all activities.
            </p>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Visions:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>To lead the activities of Islamic education and prepare the students for the achievement of Darul Irfan Islamic Academy.</li>
                <li>To strive for the spiritual, intellectual, artistic, sports, literary, and cultural development of the students.</li>
                <li>To focus on social service.</li>
                <li>To publish books, pamphlets, and social media content, etc.</li>
                <li>To render services to the nation, community, and organization as much as possible.</li>
              </ul>
            </div>
          </div>
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
