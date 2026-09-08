/**
 * One heading style for every section on the site, so a change lands in all of
 * them. The dashed rule that used to sit under it is gone — at this weight it
 * read as a dotted line drawn across the page rather than as structure, and it
 * was the loudest thing in the section.
 */
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="section-heading text-2xl md:text-3xl">{children}</h2>
  );
}
