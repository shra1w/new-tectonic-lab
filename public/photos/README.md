# Image drop zone

Each `<ImageSlot />` on the site shows a badge like `IMG-01`. The matching
generation prompt, target path and aspect ratio are in `IMAGE-PROMPTS.md` at the
repo root.

Once you have the file, pass it as `src` and it renders through `next/image`
(AVIF/WebP, responsive srcset, explicit dimensions, no layout shift):

```jsx
<ImageSlot src="/photos/hero-lab.jpg" alt="Training lab at the Somalwada campus" … />
```

| Prompt | File | Ratio |
|---|---|---|
| IMG-01 | `hero-lab.jpg` | 4:5 |
| IMG-02 | `about-lab.jpg` | 4:5 |
| IMG-03 | `head-office.jpg` | 16:9 |
| IMG-04 | `branch-office.jpg` | 16:9 |
| IMG-05 | `grooming.jpg` | 16:9 |
| IMG-06 | `course-data-analytics.jpg` | 4:5 |
| IMG-07 | `course-data-science.jpg` | 4:5 |
| IMG-08 | `course-sap.jpg` | 4:5 |
| IMG-09 | `card-data-analytics.jpg` | 16:9 |
| IMG-10 | `card-data-science.jpg` | 16:9 |
| IMG-11 | `card-sap.jpg` | 16:9 |

Keep every file under 100 KB after conversion.

**Not in this list, and deliberately so:** faculty portraits (`/public/faculty/`),
alumni photos and testimonial photos. Those must be real photographs of real people
with written consent on file. Generating a face for a named alumnus would be the
exact kind of unverifiable claim this rebuild removes.
