/**
 * Structured Data (JSON-LD) Generation Module
 * 
 * Generates Schema.org compliant JSON-LD structured data for SEO enhancement.
 * Supports Person, WorkExperience, CreativeWork, and EducationalOccupationalCredential schemas.
 */

import type {
  PersonSchema,
  WorkExperienceSchema,
  CreativeWorkSchema,
  EducationSchema,
  PersonData,
  ExperienceData,
  ProjectData,
  EducationData,
} from "./types";

// ==================== Person Schema Generator ====================

/**
 * Generate Schema.org Person structured data
 * 
 * @param data - Person data including name, job title, contact info, and social profiles
 * @returns JSON-LD Person schema as a string
 * 
 * @example
 * const personSchema = generatePersonSchema({
 *   name: "Sandeep Kommineni",
 *   jobTitle: "AI/ML Engineer",
 *   email: "sandeep@example.com",
 *   phone: "+919573456001",
 *   location: { city: "Guntur", region: "Andhra Pradesh", country: "India" },
 *   socialProfiles: { github: "https://github.com/...", linkedin: "https://linkedin.com/..." }
 * });
 */
export function generatePersonSchema(data: PersonData, siteUrl: string): string {
  const schema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    jobTitle: data.jobTitle,
    url: siteUrl,
    email: data.email,
    telephone: data.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: data.location.city,
      addressRegion: data.location.region,
      addressCountry: data.location.country,
    },
    sameAs: [
      data.socialProfiles.github,
      data.socialProfiles.linkedin,
    ],
  };

  // Add optional fields if present
  if (data.image) {
    schema.image = data.image;
  }

  if (data.bio) {
    schema.description = data.bio;
  }

  return JSON.stringify(schema, null, 2);
}

// ==================== WorkExperience Schema Generator ====================

/**
 * Generate Schema.org WorkExperience structured data
 * 
 * @param experiences - Array of work experience data
 * @returns JSON-LD WorkExperience schema as a string
 * 
 * @example
 * const workSchema = generateWorkExperienceSchema([
 *   {
 *     company: "Truviz.AI",
 *     role: "AI/ML Engineer",
 *     description: "Built AI platforms...",
 *     startDate: "2026-01",
 *     location: "Remote",
 *     companyUrl: "https://trugen.ai"
 *   }
 * ]);
 */
export function generateWorkExperienceSchema(experiences: ExperienceData[]): string {
  const schemas: WorkExperienceSchema[] = experiences.map((exp) => {
    const schema: WorkExperienceSchema = {
      "@context": "https://schema.org",
      "@type": "WorkExperience",
      name: exp.role,
      description: exp.description,
      startDate: exp.startDate,
      employer: {
        "@type": "Organization",
        name: exp.company,
      },
    };

    // Add optional fields if present
    if (exp.endDate) {
      schema.endDate = exp.endDate;
    }

    if (exp.companyUrl) {
      schema.employer.url = exp.companyUrl;
    }

    if (exp.location) {
      schema.location = exp.location;
    }

    if (exp.skills && exp.skills.length > 0) {
      schema.skills = exp.skills;
    }

    return schema;
  });

  return JSON.stringify(schemas, null, 2);
}

// ==================== CreativeWork Schema Generator ====================

/**
 * Generate Schema.org CreativeWork structured data for projects
 * 
 * @param projects - Array of project data
 * @param authorName - Name of the project author
 * @returns JSON-LD CreativeWork schema as a string
 * 
 * @example
 * const projectSchema = generateCreativeWorkSchema([
 *   {
 *     name: "TruGen.AI",
 *     description: "Multimodal AI Platform",
 *     url: "https://trugen.ai",
 *     technologies: ["LiveKit", "OpenAI"],
 *     dateCreated: "2026-01"
 *   }
 * ], "Sandeep Kommineni");
 */
export function generateCreativeWorkSchema(projects: ProjectData[], authorName: string): string {
  const schemas: CreativeWorkSchema[] = projects.map((project) => {
    const schema: CreativeWorkSchema = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      description: project.description,
      author: {
        "@type": "Person",
        name: authorName,
      },
    };

    // Add optional fields if present
    if (project.url) {
      schema.url = project.url;
    }

    if (project.dateCreated) {
      schema.dateCreated = project.dateCreated;
    }

    if (project.datePublished) {
      schema.datePublished = project.datePublished;
    }

    if (project.technologies && project.technologies.length > 0) {
      schema.keywords = project.technologies;
    }

    return schema;
  });

  return JSON.stringify(schemas, null, 2);
}

// ==================== Education Schema Generator ====================

/**
 * Generate Schema.org EducationalOccupationalCredential structured data
 * 
 * @param education - Array of education data
 * @returns JSON-LD EducationalOccupationalCredential schema as a string
 * 
 * @example
 * const educationSchema = generateEducationSchema([
 *   {
 *     institution: "KL University",
 *     degree: "Bachelor of Technology",
 *     field: "Computer Science & Engineering (AI & ML)",
 *     startDate: "2022-03",
 *     endDate: "2026-03",
 *     gpa: "9.0",
 *     location: "Vaddeswaram, India"
 *   }
 * ]);
 */
export function generateEducationSchema(education: EducationData[]): string {
  const schemas: EducationSchema[] = education.map((edu) => {
    const schema: EducationSchema = {
      "@context": "https://schema.org",
      "@type": "EducationalOccupationalCredential",
      name: `${edu.degree} in ${edu.field}`,
      recognizedBy: {
        "@type": "Organization",
        name: edu.institution,
      },
    };

    // Add optional fields if present
    if (edu.degree) {
      schema.educationalLevel = edu.degree;
      schema.credentialCategory = edu.field;
    }

    if (edu.startDate) {
      schema.startDate = edu.startDate;
    }

    if (edu.endDate) {
      schema.endDate = edu.endDate;
    }

    if (edu.gpa) {
      schema.grade = edu.gpa;
    }

    // Add description with institution and location
    const descriptionParts: string[] = [];
    if (edu.degree && edu.field) {
      descriptionParts.push(`${edu.degree} in ${edu.field}`);
    }
    if (edu.institution) {
      descriptionParts.push(`from ${edu.institution}`);
    }
    if (edu.location) {
      descriptionParts.push(`(${edu.location})`);
    }
    if (descriptionParts.length > 0) {
      schema.description = descriptionParts.join(" ");
    }

    return schema;
  });

  return JSON.stringify(schemas, null, 2);
}
