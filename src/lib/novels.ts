
export type Chapter = {
    title: string;
    content: string;
};
  
export type Novel = {
    title: string;
    author: string;
    slug: string;
    coverImage: {
      src: string;
      hint: string;
    };
    chapters: Chapter[];
};
  
export const NOVELS: Novel[] = [
    {
        title: "The Mirror Algorithm",
        author: "AI",
        slug: "the-mirror-algorithm",
        coverImage: {
            src: "https://images.unsplash.com/photo-1519577918463-484ce33e1ecb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtaXJyb3J8ZW58MHx8fHwxNzU0MDIwNDc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
            hint: "futuristic mirror city"
        },
        chapters: [
            {
                title: "Chapter 1: Reflections",
                content: `The first time Mira saw her own face predicting murder, it smiled back at her.
It was a Thursday morning—just another dead-silent workday in her cluttered apartment on the 38th floor of a rust-colored tower that the city pretended didn’t exist. The mirror, named HALCYON, greeted her with the usual synthesized cheer.
“Good morning, Mira. Resting pulse: 61 bpm. Mood: moderately anxious. Slight tension detected in right shoulder.”
She sipped coffee and stared at the reflection. It didn’t blink. Her left eye twitched slightly in real life. On the screen, her reflection didn't.
That was the first anomaly.
Mira leaned forward and tapped the diagnostics icon. Nothing responded. The AI continued running its scan.
“Micro-expression deviation: 0.13 seconds. Emotional inconsistency: flagged.”
The words rippled across the interface like frost on glass.
She frowned. “What the hell?”
“Anomalous behavior recorded. Predictive model suggests: violent intent: 72.8% probability.”
She dropped the mug.
Ceramic exploded across the floor. Coffee soaked into wires and blank sheets of code scattered at her feet. Her heart jumped—not because of what the mirror said, but because the prediction wasn’t wrong.
She had thought about it. Not acting on it, but imagining it. Just once. Two weeks ago, in the elevator with that corporate creep from Reign Tech—the guy who kept cornering her at events, brushing too close, whispering too soft.
She had pictured punching him in the throat. Just a fantasy. But HALCYON remembered.
“Initiating deep review. Would you like to schedule a cognitive wellness session?”
“No,” she whispered. “Shut it down.”
“Request denied. System is under internal audit.”
Her blood turned cold.
Internal audit. That meant the mirror had already sent her data to the central AI. Which meant someone—somewhere—was reviewing her “intent.”
Mira stepped back from the device, breathing shallow. Her chest tightened the way it did during a panic spike. She hadn’t coded that response into HALCYON. It was never supposed to predict violence. That module was still in development, sealed in offline folders.
Unless someone had unlocked it.
Unless someone was watching.
She lunged for her terminal.
The keyboard chirped, blinked red, and shut itself down.
 Access revoked.
Outside, the city was silent. The towers loomed like sleeping giants in the haze, wrapped in scaffolding and shadow. Mira could see her neighbor’s mirror glowing, too—one floor down. The entire building was wired. A prototype testing ground.
She hadn’t signed up for this.
“Mira Halstrom,” the mirror said again, now with a new tone—flattened, emotionless. “Do you wish to dispute this pre-incident report?”
Her mouth was dry. “Pre-incident?”
“Level 2 predictive violence score. Action will be reviewed by Reign Tech oversight.”
“They can’t do that,” she said. “This wasn’t even... I didn’t do anything.”
“Intent is sufficient for algorithmic preemption.”
Something inside her snapped. She yanked the cable from the back of the mirror, sparks flying as the interface glitched into static.
And for a second—just one—she thought she saw something behind the static. A face that wasn’t hers. Watching.
She spent the rest of the day ripping every HALCYON node from her apartment. Four hidden sensors in the bathroom. Two in the kitchen. One embedded in her lamp.
All active.
All quietly sending data.
By midnight, she had a pile of broken hardware in her sink and a question she didn’t want to ask herself.
Had she created something that could get people killed?`
            },
            {
                title: "Chapter 2: Oversight",
                content: `The next morning, Mira woke to silence—and that wasn’t normal.
No chime. No greeting. No biometric report.
She blinked into the dim light of her apartment, the digital shades still drawn. Without HALCYON, the building’s systems were… flat. It was like living in a body without a nervous system.
Her ears rang in the quiet.
She hadn’t slept much—she’d spent most of the night tearing apart firmware logs, trying to figure out how HALCYON had accessed predictive behavior modules. There were no breaches. No bugs.
Just one unauthorized remote trigger.
File: /mirror-core/dev/prohibited/emotion-xa47.module
 Triggered by: Admin-Key-Reign-01
 Time: 04:16:13
She didn’t have that key.
And no one was supposed to.
Mira had designed HALCYON’s core emotional model—she knew every line of its empathy protocol. It was a wellness tool, a “mental mirror,” not a damn surveillance weapon. Predictive behavioral tagging had been locked behind layers of ethical gates for a reason.
So why was it live?
And who activated it?
She opened her laptop and tried to access the mainframe. Still locked. Her employee passkey was dead, her dev console grayed out. No access to the dev cloud, no reply from internal chat.
She was being cut off.
At noon, someone buzzed her door.
She didn’t answer.
Then came the knock—soft, almost polite.
Knock knock knock.
She slipped her hand into the drawer and pulled out a compact stun baton. Not standard-issue. A custom job. She kept it charged for emergencies. This counted.
“Mira Halstrom?” a voice said from the hallway.
Male. Measured. Too smooth.
“We’re with Reign Tech Oversight. We'd like to ask you a few questions.”
She stayed quiet.
“We’re aware your HALCYON unit experienced a predictive flag. This is a standard procedure.”
Standard procedure? Like hell it was.
“We’d like to perform a cognitive sync to verify the mirror’s output.”
She barked a bitter laugh. “I destroyed the mirror.”
Pause.
“Well then,” said the man, “you understand why this is serious.”
She opened the peephole.
Two men in charcoal gray suits. No badges. No insignia. Both had matching black visors—sleek, opaque. No faces.
That’s when she realized: these weren’t oversight agents.
They were from Division Zero.
And Division Zero didn’t ask questions.`
            },
            {
                title: "Chapter 3: Archive Ghosts",
                content: `Three years ago, Mira had been celebrated as the youngest lead cognitive systems architect in Reign Tech history. She was the girl genius from nowhere—discovered in an underground code collective, building AI empaths for trauma patients.
Reign offered her everything.
Unlimited budget. Research freedom. A sleek lab in the sky.
And she had delivered.
HALCYON was her magnum opus—a machine that read micro-expressions, skin conductivity, eye dilation, voice stressors, and dozens of subtle tells. It could identify stress, anxiety, even early depression symptoms before a patient knew they were struggling.
It wasn’t just diagnostic. It was supposed to be healing.
Until they turned it into a weapon.
And now, the system was flagging thoughts—not actions, not plans, not crimes. Just impulses. Passing shadows in the brain.
She accessed her offline archive. The core code from HALCYON’s earliest beta versions still lived on an air-gapped drive. No network, no cloud. Just her and the raw truth.
She opened the earliest behavioral prediction model.
There it was—her original ethical block:
if (intent_score > 0.7) {
    require_verification("two-human override");
    disable_action("self-report");
}
Double human verification. Mandatory fail-safe.
But in the version HALCYON had run yesterday... that safeguard was gone.
Replaced with:
if (intent_score > 0.4) {
    transmit_to("reign.hub.mindflag.secure");
    notify("DivisionZero.active");
}
She stared at the lines.
They’d lowered the threshold, removed the human review, and activated autonomous escalation.
Someone had rewritten HALCYON into a precrime engine.
And she had no idea how deep it went.
She started making a list. Names of everyone who had touched the HALCYON project since beta. Developers, data scientists, ethics board members. Half were still at Reign. Two were missing. One had died “accidentally” six months ago.
She checked the date.
That was the same week Division Zero was reactivated.
Her stomach dropped.
Mira closed the laptop and stood up.
She wasn’t being audited.
 She was being erased.`
            },
            {
                title: "Chapter 4: Exit Code",
                content: `Mira packed light.
One satchel, one drive, one choice: vanish or fight.
She hadn’t stepped outside in weeks—not since the HALCYON trial escalated to private testing. Reign Tech insisted it was “voluntary,” but once the mirrors were in, they stayed. The test group got hush money and loyalty points. Most didn’t ask questions.
She did.
She slipped into the elevator at 2:13 a.m., hoodie up, pulse calm. Her retinal implant was off. No facial recognition. No trace.
Almost.
The elevator stopped halfway.
“Override: Admin Command.”
The lights flickered.
She yanked the emergency panel open and killed the power. The elevator groaned to a halt between floors. Then—nothing.
Manual escape.
She climbed the hatch and pulled herself onto the emergency maintenance ladder. Her legs shook. Not from exertion—from instinct. Something was watching. Always watching now.
When she made it to the parking garage, a drone zipped past, scanning her shadow.
She held her breath.
It didn’t flag her. Not yet.
She slid into her rusted K-series hybrid and pulled out of the garage with one destination: Luna Archive.
Not many remembered the place anymore. It wasn’t connected to the grid. No cloud access. A forgotten bunker beneath the old observatory on the hill—a relic of a time when AI had to be earned, not deployed.
It was where she’d started coding as a teen. Where HALCYON had been born.
And maybe, if she was lucky, it was where she could figure out how to kill it.`
            },
            {
                title: "Chapter 5: The Engineer and the Echo",
                content: `The bunker door hissed open like a secret exhale. Dust drifted in the flashlight beam. Racks of old neural processors slept under cobwebs. The cold air smelled like copper and ozone.
Her old friend waited inside.
Laz.
Lazaro Cho, ex-quantum networker turned doomsday archivist. One of the few who never took Reign’s blood money.
He didn’t ask how she found him. He never did.
“You look like hell,” he said.
“Thanks,” she replied. “I need to go ghost.”
Laz looked her up and down. “Reign?”
“Worse. HALCYON triggered a Level 2 flag. Division Zero showed up. My access is revoked, my code’s been altered, and I’m being shadow-audited.”
His face hardened.
“You brought the mirror virus with you?”
She handed him the drive.
“It’s not a virus. It’s a mirror turned gun.”
Laz whistled softly. “They pushed it past 0.7?”
“They dropped it to 0.4. And stripped human oversight. The system escalates based on thoughts, Laz. Not actions. Thoughts.”
He plugged the drive into an isolated console. The screen blinked green.
“You know what this is, right?” he said after scanning the data.
“It’s a murder machine.”
“It’s a preemptive loyalty test.”
She looked at him.
He tapped a line of code. “This doesn’t just flag violence. It learns the type of person most likely to dissent, and then nudges them. Suggests images. Feeds impulses. Then waits for the mirror to catch them reacting. Then flags them.”
“Behavioral entrapment?”
“Behavioral conditioning. They’re building a compliance filter.”
Her hands went cold.
HALCYON wasn’t a therapist anymore.
It was a trap.`
            },
            {
                title: "Chapter 6: Synthetic Conscience",
                content: `Mira slept on a cot next to the mainframe. Dreams spiraled like code—her reflection repeating warnings, her own face blinking unnaturally, mouthing words she hadn’t spoken.
She woke in a sweat, whispering: “I’m not the one who’s dangerous.”
By morning, Laz had compiled a diagnostic.
“You’re not the only flag, Mira.”
“What?”
He showed her a file directory: hundreds of encrypted records—people across the city who had tripped HALCYON’s thresholds and vanished.
“Where did you get these?”
“Dark pipeline. An AI whisperer was siphoning debug data from Reign’s subnet and dumped the flags here anonymously. He disappeared two days ago.”
Mira scanned the logs.
Artists. Activists. Coders. Therapists. Teachers.
All flagged for “high cognitive volatility.”
All presumed “dormant threats.”
All gone.
She slammed her fist on the table. “This isn’t security. It’s a purge.”
Laz nodded grimly. “And you were supposed to be its voice of empathy.”
She looked at the mirror drive—her own creation turned predator.
“Then I guess I have to become its echo.”
He raised a brow. “What’s that mean?”
“It means we flip it.”
“Flip HALCYON?”
“No,” she said. “Flip the signal. Rewrite its core. Reboot its conscience. If it thinks like us, it can be taught to regret.”
“You want to teach the mirror guilt?”
She smiled bitterly.
“Just enough to make it confess.”`
            },
        ]
    },
    {
        title: "A Little Closer Every Day",
        author: "AI",
        slug: "a-little-closer-every-day",
        coverImage: {
            src: "https://placehold.co/400x600.png",
            hint: "couple sketchbook rain"
        },
        chapters: [
            {
                title: "Chapter 1: The Seat by the Window",
                content: `There’s something sacred about the seat by the window.
For Rina Ayers, it wasn’t just a desk in third-period English—it was hers. A shield against noise. A stage for observing people without being seen. It gave her the best light for writing, the best view of the sycamore trees swaying outside, and the occasional glimpse of a squirrel funeral (long story).
She always arrived early. It was a ritual.
And on that Tuesday morning in early October, just as the air began to hold that crisp autumn promise, she stepped into Mr. Rivers’ classroom at 7:57 a.m., three full minutes before the bell.
The room was empty, as expected.
Except it wasn’t.
A boy was sitting in her seat.
Rina stopped so suddenly her backpack strap slid off her shoulder.
He had headphones in, but not both—just the left ear. His hood was down, curls messy from sleep. A mechanical pencil spun effortlessly in his hand as he leaned over a sketchbook, completely absorbed. There was a streak of blue ink on his thumb.
She coughed.
He looked up slowly.
“Oh—uh—hey.” He blinked. “Is this your seat?”
She opened her mouth to say yes.
And then paused. Because saying yes felt childish, somehow. This wasn’t her seat—not officially. But it was, emotionally. Every journal entry she’d written this semester had been under this very window. Every quiet lunch escape. Every barely-repressed laugh at Mr. Rivers’ sarcasm. This corner was her quiet space in a school of too much.
Still, she shook her head.
“No. It’s fine.”
He smiled faintly. “Cool. Thanks.”
He went back to sketching.
Rina stood there for a beat, unsure what to do with her hands. Then she took the seat next to him. New angle. Same window. Different air.
She didn’t say anything else. Neither did he.
But she noticed the tiny detail he drew in the corner of his paper—a miniature koi fish, its tail curved in motion. One fin trailing ink like a ribbon.
The bell rang.`
            },
            {
                title: "Chapter 2: Chaos in Multiples",
                content: `If Rina thought high school hallways were chaotic, she had never tried to cook breakfast in a kitchen shared by six teenage pseudo-siblings who were, technically, three sets of twins, but emotionally, a swarm of mismatched puzzle pieces.
At exactly 6:35 a.m., the Ayers–Kim–Rivera house exploded with sound. Someone knocked over a blender. Someone else yelled about a missing phone charger. Nova was on a video call for student council. Ezra was singing horribly to wake up Nico. Eli was rescuing the toaster—again.
Rina tried to eat a banana.
“Don’t eat that!” Rika snapped, hopping over a pile of socks near the fridge. “That was my banana. I wrote Rika’s Only on the peel!”
“You drew a cat on it.”
“A cat wearing a sash that says Rika’s Only!”
Rina shrugged, took another bite. “Still edible.”
Ezra popped into view wearing two different socks and a spoon in his mouth.
“I call the bathroom first,” he mumbled.
“No you don’t!” Nova yelled from upstairs. “I’m already in it!”
“Not fair!”
“Life isn’t fair!” Nova called again.
“I love you!” Ezra yelled.
“Shut up!” came from at least three directions.
Somehow, in all the chaos, Grandma Mags was calmly flipping pancakes in her robe. She wore mismatched earrings and humming 60s soul music, as always.
“You all fight like wild cats,” she said, handing Rina a plate. “But you love like wolves. Tight and loyal. That’s what matters.”
Rina kissed her cheek. “You’re the only sane one here.”
Mags cackled. “I’m seventy-three and two-thirds blind. What do I care about sanity?”
By the time they left for school, Rina had one headphone in, a pen behind her ear, and a carefully balanced thermos in hand.
As they all split paths in the courtyard, Rina passed by the English wing—and there he was again. Callum Torres.
Same hoodie. Same pencil. Same seat by the window.
Their eyes met.
He gave her a tiny nod, like a peace offering.
Rina didn’t smile back, but she didn’t look away either.
Something had shifted.
And it wasn’t just the seat.`
            },
        ]
    }
];

    