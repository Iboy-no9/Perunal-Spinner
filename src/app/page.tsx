
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
            A Beacon of Knowledge and Faith Since 2014
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
          <p className="text-muted-foreground text-sm text-justify px-2 leading-relaxed">
            Darul Irfan Islamic Academy, nestled on the historical mountain of Variyamkunn facing
            the serene beauty of River Kadalundi of Kerala, India, has been a standing beacon of
            knowledge and faith since 2014. Affiliated with the renowned Darul Huda Islamic
            University, our Academy takes pride in its dedication to provide an exceptional
            education that blends traditional Islamic education with modern academic grounding.
            Our students delve deep into Islamic knowledge, simultaneously acquiring proficiency
            in five languages - English, Arabic, Urdu, Hindi, and Malayalam. This linguistic fluency
            empowers them to bridge cultural gaps and effectively communicate the timeless
            message of Islam across diverse communities.
          </p>
          <p className="text-muted-foreground text-sm text-justify px-2 leading-relaxed">
            Our curriculum goes beyond textbooks, aiming for a new generation of well-rounded
            Sunni scholars covering various aspects of religious, spiritual, intellectual, socio-
            political, and economic dimensions. Our graduates are skilled in these areas and well-
            equipped to take on the world's challenges. Our college is committed to providing a
            holistic education that prepares our students for the future. We provide excellent
            facilities to support our students' learning, research, and physical activities. From our
            well-stocked library, a treasure trove of Islamic and Five lingual literature, to our
            equipped computer lab and Smart classrooms, we nourish the resources and
            environment that nurture intellectual growth and personal development.
          </p>
          <p className="text-muted-foreground text-sm text-justify px-2 leading-relaxed">
            Built in as a memorial of C.M. Valiyullahi, Darul Irfan, believes that education is a holistic
            journey that prepares graduates to excel in the world while staying true to their faith. We
            equip our students with the knowledge, skills, and moral compass to navigate the
            complexities of modern life and contribute meaningfully to society.
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
