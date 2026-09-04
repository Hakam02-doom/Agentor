import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agentor — Deploy agents that do the actual work',
  description:
    'Build, orchestrate, and scale intelligent agents that handle complex workflows.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <template
          data-impeccable-contract="agentor-reference-lock"
          dangerouslySetInnerHTML={{
            __html: `<!--
THESIS: A faithful implementation of the approved Agentor reference; it refuses generic reinterpretation.
OWN-WORLD: Frosted white surfaces, #427EF6 blue, cloudlike cyan fields, fine dotted textures, and Urbanist typography.
STORY: Visitors understand the agent platform, see it working, review evidence and pricing, then choose See Demo.
FIRST VIEWPORT: Full-width navigation over a 980px atmospheric hero, centered 72px headline and actions, with the research-agent console rising from below.
FORM: Reference reproduction, position 1, seed agentor-reference-lock.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
