
'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import Image from 'next/image';
import { Dumbbell } from "lucide-react";

const exercises = [
  {
    name: "Child's Pose",
    description: "This gentle resting pose helps relieve back pain and cramps by stretching the hips, thighs, and ankles.",
    steps: "Kneel on the floor, sit back on your heels, then fold forward, resting your forehead on the floor. Extend your arms forward or rest them alongside your body.",
    image: {
        src: "https://placehold.co/400x250.png",
        hint: "yoga stretch"
    }
  },
  {
    name: "Cat-Cow Stretch",
    description: "This dynamic movement warms the spine and can help ease tension in your back and abdomen.",
    steps: "Start on your hands and knees. As you inhale, drop your belly and look up (Cow). As you exhale, round your spine and tuck your chin (Cat).",
     image: {
        src: "https://placehold.co/400x250.png",
        hint: "yoga cow"
    }
  },
  {
    name: "Knees-to-Chest Pose",
    description: "This pose can help relax the lower back and abdominal muscles, reducing tension and cramp pain.",
    steps: "Lie on your back and gently pull both knees into your chest. Hold them with your hands and rock gently from side to side if it feels good.",
     image: {
        src: "https://placehold.co/400x250.png",
        hint: "yoga relax"
    }
  },
  {
    name: "Light Walking",
    description: "Gentle aerobic exercise like walking increases blood flow and can help reduce bloating and cramps.",
    steps: "Go for a short, relaxed walk for 15-30 minutes. Listen to your body and don't push yourself too hard.",
     image: {
        src: "https://placehold.co/400x250.png",
        hint: "walking nature"
    }
  },
  {
    name: "Jumping Jacks",
    description: "A light cardio exercise that can boost circulation and release pain-relieving endorphins.",
    steps: "Stand with your feet together and your arms at your sides. Simultaneously jump your feet out to the side while raising your arms above your head. Jump back to the starting position.",
     image: {
        src: "https://placehold.co/400x250.png",
        hint: "jumping fitness"
    }
  },
];

export function CrampReliefExercises() {
  return (
    <Card className="w-full glass">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
            <Dumbbell className="h-6 w-6" />
            Cramp Relief Stretches
        </CardTitle>
        <CardDescription>Gentle movements that may help ease menstrual pain.</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
            {exercises.map((exercise) => (
                 <AccordionItem key={exercise.name} value={exercise.name}>
                    <AccordionTrigger className="font-bold text-lg">{exercise.name}</AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 space-y-2">
                                <p className="text-muted-foreground">{exercise.description}</p>
                                <p><span className="font-semibold">How to do it:</span> {exercise.steps}</p>
                            </div>
                            <div className="md:w-1/3">
                                <Image 
                                    src={exercise.image.src}
                                    alt={`Illustration for ${exercise.name}`}
                                    data-ai-hint={exercise.image.hint}
                                    width={400}
                                    height={250}
                                    className="rounded-lg object-cover"
                                />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
