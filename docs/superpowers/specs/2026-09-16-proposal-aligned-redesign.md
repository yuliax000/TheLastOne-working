# THE LAST ONE - Proposal-Aligned Redesign

## Purpose

Redesign the existing scrollytelling prototype so it faithfully expresses the proposal: extinction becomes emotionally understandable through the stories of last known individuals, moving from collective life through decline and isolation to final disappearance.

The UN Women *Women's Footprint in History* timeline is a structural reference for fullscreen chronology, large dates, persistent navigation and cinematic chapter transitions. Its branding, content treatment and right-side navigation are not copied.

## Non-Negotiable Proposal Requirements

- Six chronological species chapters: Great Auk, Passenger Pigeon, Thylacine, Kauaʻi ʻōʻō, Baiji and Pinta Island Tortoise / Lonesome George.
- A persistent vertical timeline on the left at desktop sizes.
- Habitat imagery or video fills each chapter background.
- A distinct species card sits over the habitat and contains the species or last-individual portrait.
- The extinction year is a large visual anchor near the top.
- The species name or last individual's name is displayed in large, bold type.
- Primary interaction is scrolling; secondary interaction is clicking the card to reveal more.
- Clicking expands an inline detail section beneath the card rather than opening a detached modal.
- Detail content supports text with archival photographs, audio or video placeholders.
- After chapter six, the timeline accelerates through recent losses to 2026 and ends on “NEXT?”.

## Narrative Structure

### Opening

The opening introduces the idea of the last individual and invites a slow descent into the timeline. It uses the proposal's restrained palette and typography rather than a decorative editorial treatment.

### Species chapters

Each chapter is a scroll-controlled sequence with four layers:

1. **Habitat layer** — a full-viewport placeholder ready for a habitat photograph or video. It receives reduced saturation, controlled contrast, a dark overlay and subtle grain.
2. **Time layer** — the extinction year appears at the top as the chapter's dominant orientation cue.
3. **Species card** — a framed panel contains the animal/individual portrait placeholder, species index, common and scientific names, location, and a short emotional introduction.
4. **Inline detail layer** — clicking the card collapses or shifts its visual portion and expands a section below it with the complete story, extinction pressure, supporting-media placeholders and source labels.

The page remains readable without animation. GSAP enhances transitions but does not own the content structure.

### Ending

After Lonesome George, the scroll distance compresses conceptually. The visible year moves from 2012 toward 2026 with increasing speed while recent-extinction placeholder cards flash in sequence. The final state removes the imagery and holds on “NEXT?”.

## Desktop Composition

- The left timeline occupies a narrow fixed rail and remains visible throughout all six chapters and the ending.
- The main habitat stage begins to the right of the rail but can visually bleed underneath it.
- A pale rectangular frame, inspired by the reference site's composition, defines the active viewport without enclosing every piece of text.
- The year is placed across the upper main stage.
- Species cards alternate subtly between central-right and central-left positions, but never obstruct the timeline.
- The active timeline marker shows the current year; inactive years remain visible with reduced contrast.
- Timeline density visually increases toward the present rather than distributing all years at equal historical distance.

## Mobile Composition

- The timeline remains conceptually left-aligned as a slim vertical rail; labels reduce to the active year and progress marks.
- Habitat media remains full-width.
- The species card occupies the lower portion of the viewport with sufficient contrast.
- Inline details open in normal document flow and never become a modal or horizontal carousel.
- Large display type scales down without clipping or horizontal overflow.

## Visual System

Use the proposal's design system:

- Display type: Bebas Neue, bold for major years and species names; regular for secondary titles.
- Body type: Inter.
- Main text: `#E7E7DF`.
- Primary accent: `#C9D2BC`.
- Secondary text: `#8F9390`.
- Panel background: `#343836`.
- Main background: `#171918`.
- Secondary accent: `#A89F8D`.

The image language is quiet, cinematic, environmental, immersive and archival. Placeholder visuals must already indicate the future asset role: habitat, portrait, archival image, audio or video. Grain is subtle; decorative effects never compete with the story.

## Motion System

GSAP and ScrollTrigger provide:

- habitat crossfades and slow parallax;
- subtle habitat scale changes;
- species-card reveal and departure;
- large-year transitions;
- active timeline progression;
- animated inline detail expansion;
- accelerated ending sequence.

Motion remains slow and restrained through the six main chapters. Rapid transitions appear only in the ending and remain below unsafe flashing rates. `prefers-reduced-motion` presents every chapter and ending item in source order without pinning or flashes.

## Interaction Details

### Timeline

- Desktop timeline is fixed on the left.
- Markers are clickable and move to the corresponding chapter.
- Active state is synchronized by ScrollTrigger with IntersectionObserver as a fallback.
- Progress is calculated from chapter order, not a decorative looping animation.

### Species card and detail

- The card contains a clear “Explore story” control; it is not made into an ambiguous click target.
- Activation expands content inside the chapter.
- The control updates `aria-expanded` and references the detail region with `aria-controls`.
- Expanding one detail section does not hide or destroy other chapter content.
- The same control collapses the section and restores focus predictably.

### Media placeholders

- Habitat placeholders are structurally replaceable with `<img>` or `<video>`.
- Portrait placeholders are independent from habitat media.
- Archival, audio and video placeholders in details have descriptive labels.
- Final sources and licences remain data fields so they can be added without editing animation logic.

## Implementation Boundaries

- Continue using static HTML, CSS and JavaScript.
- Continue using locally pinned GSAP and ScrollTrigger.
- Preserve the data-driven six-chapter structure.
- Remove the current dialog-based detail experience after the inline detail implementation is verified.
- Do not add maps, real audio, real video, final photography or unverified factual claims during this redesign.
- Keep GitHub Pages compatibility and no build step.

## Verification

The redesign is complete only when:

- all six habitats, years, cards and inline detail regions render in order;
- the desktop timeline stays on the left and never overlaps chapter content;
- timeline markers navigate correctly and active state follows scrolling;
- every card expands and collapses its own inline detail section by mouse and keyboard;
- the ending advances to 2026 and resolves on “NEXT?”;
- GSAP loads locally with no CDN dependency;
- desktop and mobile layouts have no clipping or horizontal overflow;
- reduced-motion mode exposes all content without pinning or rapid flashes;
- automated tests and rendered browser checks pass without relevant console errors.

