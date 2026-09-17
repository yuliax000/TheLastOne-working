# Design Direction — Living Archive

## Mode

Experience. The visitor should feel situated inside a chronological archive rather than looking at a conventional information page.

## Visual World

A quiet environmental memorial assembled from full-bleed habitat fields, documentary portrait frames, pale archival rules, and a continuous left-hand chronology. It borrows the spatial confidence and date-led pacing of the UN Women reference without copying its right-side navigation or visual identity.

## First Viewport

The opening acts as the threshold to the archive: THE LAST ONE dominates the frame, a restrained statement explains the premise, and the first date is visibly waiting on the left timeline. The first habitat begins to emerge below so the page immediately signals that scrolling moves through time and place.

## Layout Grammar

- A slim fixed timeline occupies the left edge on desktop and remains visibly left-aligned on small screens.
- Each species chapter is at least one viewport tall, with a full-bleed habitat layer, a dark readable veil, and a separate animal portrait card.
- The year is the primary typographic landmark; name, location, summary, and action form a compact reading sequence.
- Details open inline within their own chapter. The chapter grows; the reader never enters a modal or loses chronological context.
- The final passage gathers recent losses into one photographic field before opening into the statement “THE STORY IS NOT WRITTEN”.

## Typography

Bebas Neue is the display voice for title, species names, and major years. Inter is the reading voice for narrative copy, controls, captions, and metadata. Display type is tall and direct; body copy stays calm with a 65–72 character measure.

## Palette

- Bone: `#E7E7DF`
- Lichen: `#C9D2BC`
- Stone: `#8F9390`
- Charcoal: `#343836`
- Near black: `#171918`
- Archive taupe: `#A89F8D`

The habitat layer is desaturated and low-contrast under a dark overlay. One muted chapter accent may tint timeline progress and small metadata, never body copy.

## Media Roles

Habitat and individual portrait are different assets and must remain separate in the markup. Habitat owns the environment; portrait owns the individual encounter. Archival detail media belongs only in the expanded story. Until real assets arrive, clearly labelled compositional placeholders preserve these roles.

## Motion Grammar

GSAP ScrollTrigger coordinates one motion system: habitat and portrait cards crossfade at chapter thresholds, the timeline advances between chapters, and recent-extinction photographs accumulate as the reader approaches the final question. Motion never hides essential content by default and is removed or simplified when reduced motion is requested.

## Interaction States

The story control explicitly changes between “Explore story” and “Close story,” updates `aria-expanded`, and returns focus safely. Timeline controls show current position, hover, and keyboard focus. Text selection, focus rings, scrollbars, and button states use the project palette.

A restrained fixed motion control keeps the scrollytelling animation on by default and lets visitors opt into the reduced-motion version. The final statement links to a separate reference register that preserves the same archive palette and typography.

## Responsive Rules

At narrow widths, the timeline becomes a compact left rail rather than moving to the top. Content receives enough left inset to avoid collision. Portrait cards become nearly full-width, large dates reduce fluidly, and inline detail media stacks before text. No horizontal scrolling is allowed.

## Honest Limitations

Current media is placeholder material. The finished atmosphere depends on sourced, credited habitat photography, species portraits, archival media, and the Kauaʻi ʻōʻō recording; the layout must communicate clearly before those are added.
