# Image generation prompts

Every `<ImageSlot />` on the site shows a badge like `IMG-01`. Find that ID below,
generate the image, save it to the path shown, then pass it as `src`:

```jsx
<ImageSlot src="/photos/hero-lab.jpg" alt="…" id="IMG-01" … />
```

**Student photos are deliberately not in this list.** Placement records, testimonials
and faculty portraits must be real photographs of real people with written consent
(audit Section 5.1). Generating a face for a named alumnus would be exactly the
kind of unverifiable claim this whole rebuild exists to remove.

---

## Shared style block

Append this to every prompt so the set reads as one system:

> **Style:** Dark editorial tech photography. Near-black background (#09090B–#141416),
> deep zinc greys, and a single acid-lime accent (#EAFD56) appearing as screen glow,
> a light strip, a cable, or a highlighted UI element — never as a colour wash over
> the whole frame. High contrast, crisp focus, soft directional key light from one
> side, deep shadows retained rather than lifted. Fine geometric grid or hairline
> rules subtly visible in the background architecture. No lens flares, no circular
> gradients, no bokeh orbs, no glossy 3D renders, no stock-photo smiling. Restrained,
> confident, slightly cool. Photographic realism, 35mm look, shallow-to-medium depth
> of field. No text, no watermarks, no logos, no readable UI copy.

Aspect ratios and paths are listed per image. Keep every file under 100 KB after
WebP/AVIF conversion.

---

## IMG-01 — Homepage hero
**Path:** `/public/photos/hero-lab.jpg` · **4:5 portrait, 1600×2000**

> A modern training lab at night, shot from a low three-quarter angle. Three or four
> monitors stand in a row on a dark desk, each showing an abstract data dashboard —
> bar charts and line graphs rendered as glowing acid-lime shapes on near-black
> screens, deliberately blurred so no text is legible. A single desk lamp throws warm
> directional light across a keyboard and a notebook in the foreground. The back wall
> is exposed dark concrete with a faint square grid of hairlines catching the light.
> No people. The mood is a room where serious work happens after hours — precise,
> quiet, slightly severe.
>
> *+ shared style block*

---

## IMG-02 — About page hero
**Path:** `/public/photos/about-lab.jpg` · **4:5 portrait, 1600×2000**

> A wide, empty classroom in a dark modern building, viewed from the back of the room
> at eye level. Rows of desks with closed laptops recede toward a large screen on the
> far wall glowing faint acid-lime. Late-afternoon light rakes in through tall
> vertical window slats on the left, cutting hard parallel bars of light across the
> floor and desks. Chairs are slightly askew, as though a session has just ended. No
> people. The composition emphasises structure and repetition — a grid of desks under
> a grid of light.
>
> *+ shared style block*

---

## IMG-03 — Head office, Somalwada
**Path:** `/public/photos/head-office.jpg` · **16:9 landscape, 1600×900**

> The glass entrance of a small modern training institute on an upper floor of an
> Indian commercial building, photographed at dusk from outside. Warm interior light
> spills through the glass. A slim horizontal acid-lime light strip runs above the
> doorway. Inside, out of focus, a reception desk and the edge of a corridor are
> visible. The exterior is clean dark stone and dark metal framing. No signage text,
> no readable lettering. Quiet, professional, unmistakably contemporary Indian urban
> architecture.
>
> *+ shared style block*

---

## IMG-04 — Branch office, Jaitala Road
**Path:** `/public/photos/branch-office.jpg` · **16:9 landscape, 1600×900**

> The interior corridor of a small training centre — a narrow dark hallway with a
> polished concrete floor, doorways on the right leading into lit classrooms, and a
> continuous thin acid-lime light strip running along the ceiling line into the
> distance. Strong one-point perspective. A single figure in silhouette far down the
> corridor, unidentifiable, adding scale. Everything else in deep shadow. Calm,
> architectural, slightly cinematic.
>
> *+ shared style block*

---

## IMG-05 — Corporate grooming
**Path:** `/public/photos/grooming.jpg` · **16:9 landscape, 1600×900**

> An empty interview room set up for a recorded mock interview. Two chairs face each
> other across the corner of a dark table. A small camera on a tripod points at one
> chair. A laptop sits closed beside a printed document and a pen. A ring of soft
> light from an off-camera source falls on the candidate's chair, leaving the
> interviewer's side in shadow. A faint acid-lime recording indicator glows on the
> camera. No people. The framing makes the empty chair the subject — waiting, a
> little intimidating, exactly what the moment feels like.
>
> *+ shared style block*

---

## IMG-06 — Data Analytics course hero
**Path:** `/public/photos/course-data-analytics.jpg` · **4:5 portrait, 1600×2000**

> A close, angled shot across a curved monitor showing an abstract business
> intelligence dashboard — stacked bar charts, a KPI tile and a line trend, drawn as
> luminous acid-lime and pale grey geometry on near-black, blurred enough that no
> label is readable. A hand rests on a mouse at the lower edge of frame, mostly in
> shadow. A spiral notebook with hand-drawn chart sketches sits beside the keyboard.
> Shallow depth of field, the dashboard sharp and the room falling away behind it.
>
> *+ shared style block*

---

## IMG-07 — Data Science course hero
**Path:** `/public/photos/course-data-science.jpg` · **4:5 portrait, 1600×2000**

> A dark desk seen from directly above. A laptop screen shows an abstract scatter
> plot with a fitted curve and clustered points glowing acid-lime against near-black,
> deliberately unreadable. Beside it, a page of handwritten mathematical notation —
> curves, sigma notation, a small matrix — in grey pencil on off-white paper, lit by a
> single hard light from the left that throws the pen's shadow across the page.
> A coffee cup at the frame edge. The contrast between screen and paper is the point.
>
> *+ shared style block*

---

## IMG-08 — SAP course hero
**Path:** `/public/photos/course-sap.jpg` · **4:5 portrait, 1600×2000**

> A dual-monitor enterprise workstation photographed at a low angle in a dark room.
> Both screens show dense abstract enterprise-software interfaces — nested tables,
> field grids and a tree navigation panel — rendered as fine grey lines on near-black
> with a few acid-lime highlighted rows, all blurred beyond legibility. In the
> foreground, softly out of focus, a small server rack panel with a row of tiny status
> lights, one glowing lime. Serious, dense, corporate. The visual language of a
> configuration screen rather than a dashboard.
>
> *+ shared style block*

---

## IMG-09 — Data Analytics card (homepage)
**Path:** `/public/photos/card-data-analytics.jpg` · **16:9 landscape, 1200×675**

> An extreme close-up of a spreadsheet grid on a dark monitor, shot at a shallow
> raking angle so the cells recede into blur. One single cell is highlighted in solid
> acid-lime, sharply in focus, the rest fading to grey on near-black. No readable
> numbers or text. Abstract, graphic, almost a texture study — the selected cell as
> the entire subject.
>
> *+ shared style block*

---

## IMG-10 — Data Science card (homepage)
**Path:** `/public/photos/card-data-science.jpg` · **16:9 landscape, 1200×675**

> A dark screen filled with a dense field of small plotted points forming two or three
> loose clusters. Most points are dim grey; one cluster glows acid-lime. A faint
> hairline grid sits behind them. Photographed slightly off-axis so the screen surface
> catches a sliver of reflected light along one edge. No axes labels, no text.
> Abstract and quiet, closer to a star field than a chart.
>
> *+ shared style block*

---

## IMG-11 — SAP card (homepage)
**Path:** `/public/photos/card-sap.jpg` · **16:9 landscape, 1200×675**

> A tight crop of an enterprise interface: a vertical tree navigation of nested items,
> rendered as fine grey rules and small square markers on near-black, with one branch
> expanded and highlighted acid-lime. Shot straight on with a very slight tilt. The
> lines get progressively softer toward the frame edges. No readable text. Structural,
> hierarchical, cold — the visual signature of configuration rather than reporting.
>
> *+ shared style block*

---

## Open Graph images

Social share cards, exactly **1200×630**, saved in `/public/og/`. These *should*
carry text, unlike everything above.

**Shared recipe:** near-black background with a faint 64px hairline grid; the
Techtonic Lab wordmark small in the top-left; the page title set large in Bricolage
Grotesque, with one or two words wrapped in a solid `#EAFD56` block exactly like the
site's headline highlight; a single line of grey supporting text beneath; nothing
else. Generate these in a design tool rather than an image model — text rendering in
generated images is unreliable and a misspelled OG card is worse than none.

| File | Headline (highlight in **bold**) | Sub-line |
|---|---|---|
| `homepage.jpg` | IT courses in Nagpur to elevate your **tech career** | Data Analytics · Data Science · SAP · ₹50,000 |
| `data-analytics-course.jpg` | Data Analyst course in **Nagpur** | Excel, SQL, Python, Power BI, Tableau · 4 months |
| `data-science-course.jpg` | Data Science course in **Nagpur** | Python, statistics, machine learning · 4 months |
| `sap-course.jpg` | SAP course on live **S/4HANA** | FICO · MM · SD · PP/QM · 4 months |
| `fees.jpg` | One price. **Published.** | ₹50,000 for any course · EMI available |
| `batches.jpg` | Every **batch date**, published ahead | Classroom · Weekend · Live online |
| `placements.jpg` | Real names. **Real records.** | Named alumni, shared with consent |
| `faculty.jpg` | Meet the **faculty** | Six instructors · 72+ years combined |
| `about.jpg` | Three courses, **taught properly** | IT training institute in Nagpur |
| `contact.jpg` | Book a **free consultation** | 20 minutes · No sales script |
| `hire.jpg` | Hire from **Techtonic Lab** | No placement fee · Shortlist in 4 days |

---

## Logos

`/public/logos/<company>.svg` — employer logos for the "Companies our alumni work
at" section. **Do not generate these.** Use the company's official asset, and only
after a named alumnus is on file for that company (audit CRIT-5). The section
currently renders an explicit warning state for any employer without one, which is
the correct behaviour until you can back the claim.
