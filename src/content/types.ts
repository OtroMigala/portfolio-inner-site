// Content model for the portfolio. One `PortfolioContent` document per locale.
// The same shape is produced by every content source (local snapshot or CMS),
// so renderers never depend on a specific provider.
//
// Inline text fields accept a small markdown subset: [label](url) and **bold**.
// Links that start with `#` point to a section id (about, experience, projects,
// contact) and are resolved by each renderer.

export type Locale = 'es' | 'en';

export const LOCALES: Locale[] = ['es', 'en'];

export interface PortfolioContent {
    locale: Locale;
    profile: Profile;
    about: AboutSection[];
    experience: Experience[];
    projectCategories: ProjectCategory[];
    awards: Award[];
    languages: LanguageSkill[];
    contact: Contact;
}

export interface Profile {
    fullName: string;
    firstName: string;
    lastName: string;
    role: string;
    tagline: string;
    location: string;
    /** Opening paragraphs shown before the about sections. */
    summary: string[];
    /** Closing paragraphs of the about page. */
    closing: string[];
    /** Photo shown next to awards and languages. */
    portrait?: Media;
    /** Résumé file (PDF). */
    resume?: Media;
}

export interface Contact {
    intro: string;
    email: string;
    phoneDisplay: string;
    whatsappUrl: string;
    links: Link[];
}

export interface Link {
    label: string;
    url: string;
    kind: 'github' | 'linkedin' | 'instagram' | 'website' | 'repository';
}

// `url` is either `asset:<path>` (a file in the inner site's src/assets,
// bundled at build time) or an absolute URL served by the CMS.
export interface Media {
    url: string;
    /** Required. Empty string only for purely decorative images. */
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
}

export interface AboutSection {
    id: string;
    heading: string;
    body: string[];
    logo?: Media;
    image?: Media;
    /** Number of body paragraphs shown before the image (default: all). */
    imageAfter?: number;
}

export interface Experience {
    id: string;
    organization: string;
    role: string;
    /** `YYYY` or `YYYY-MM`. Omitted when the work has no fixed dates. */
    start?: string;
    /** `YYYY` or `YYYY-MM`; `null` means "present". */
    end?: string | null;
    /** Replaces the formatted date range, e.g. "Independent". */
    dateLabel?: string;
    website?: Link;
    logo?: Media;
    summary?: string;
    highlights: string[];
    images: Media[];
}

export interface ProjectCategory {
    id: 'software' | 'aerospace';
    title: string;
    subtitle: string;
    intro: string;
    /** Small picture on the category card. */
    icon?: Media;
    /** Organisation logo shown at the top of the category page. */
    logo?: Media;
    projects: Project[];
}

export interface Project {
    id: string;
    title: string;
    /** Event, client or programme the project belongs to. */
    context?: string;
    description: string[];
    highlights: string[];
    links: Link[];
    logo?: Media;
    images: Media[];
}

export interface Award {
    id: string;
    text: string;
}

export interface LanguageSkill {
    language: string;
    level: string;
}
