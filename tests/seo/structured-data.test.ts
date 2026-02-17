/**
 * Property-Based Tests for Structured Data Generation
 * 
 * Feature: portfolio-seo-enhancement
 * Tests Schema.org JSON-LD structured data generation for Person, WorkExperience,
 * CreativeWork, and EducationalOccupationalCredential schemas.
 */

import { describe, test, expect } from "vitest";
import fc from "fast-check";
import {
  generatePersonSchema,
  generateWorkExperienceSchema,
  generateCreativeWorkSchema,
  generateEducationSchema,
} from "../../src/seo/structured-data";
import type { PersonData, ExperienceData, ProjectData, EducationData } from "../../src/seo/types";

// ==================== Arbitraries (Generators) ====================

/**
 * Generate arbitrary PersonData for property testing
 */
const personDataArbitrary = fc.record({
  name: fc.string({ minLength: 1 }),
  jobTitle: fc.string({ minLength: 1 }),
  email: fc.emailAddress(),
  phone: fc.string({ minLength: 1 }),
  location: fc.record({
    city: fc.string({ minLength: 1 }),
    region: fc.string({ minLength: 1 }),
    country: fc.string({ minLength: 1 }),
  }),
  socialProfiles: fc.record({
    github: fc.webUrl(),
    linkedin: fc.webUrl(),
  }),
  image: fc.option(fc.webUrl(), { nil: undefined }),
  bio: fc.option(fc.string(), { nil: undefined }),
});

/**
 * Generate arbitrary ExperienceData for property testing
 */
const experienceDataArbitrary = fc.record({
  company: fc.string({ minLength: 1 }),
  role: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  startDate: fc.string({ minLength: 1 }),
  endDate: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
  location: fc.string({ minLength: 1 }),
  skills: fc.option(fc.array(fc.string({ minLength: 1 })), { nil: undefined }),
  companyUrl: fc.option(fc.webUrl(), { nil: undefined }),
});

/**
 * Generate arbitrary ProjectData for property testing
 */
const projectDataArbitrary = fc.record({
  name: fc.string({ minLength: 1 }),
  description: fc.string({ minLength: 1 }),
  url: fc.option(fc.webUrl(), { nil: undefined }),
  technologies: fc.array(fc.string({ minLength: 1 })),
  dateCreated: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
  datePublished: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
});

/**
 * Generate arbitrary EducationData for property testing
 */
const educationDataArbitrary = fc.record({
  institution: fc.string({ minLength: 1 }),
  degree: fc.string({ minLength: 1 }),
  field: fc.string({ minLength: 1 }),
  startDate: fc.string({ minLength: 1 }),
  endDate: fc.string({ minLength: 1 }),
  gpa: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
  location: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
});

// ==================== Property Tests ====================

describe("Structured Data Property Tests", () => {
  /**
   * Property 5: Person schema validity
   * Feature: portfolio-seo-enhancement, Property 5: Person schema validity
   * 
   * For any page output, the JSON-LD Person schema should be valid and include
   * all required fields: @context, @type, name, jobTitle, url, email, telephone,
   * address (with locality, region, country), and sameAs array.
   * 
   * Validates: Requirements 3.1, 11.1, 11.3
   */
  test("Property 5: Person schema validity - all required fields present", () => {
    fc.assert(
      fc.property(
        personDataArbitrary,
        fc.webUrl(),
        (personData, siteUrl) => {
          const schemaJson = generatePersonSchema(personData, siteUrl);
          const schema = JSON.parse(schemaJson);

          // Verify @context and @type
          expect(schema["@context"]).toBe("https://schema.org");
          expect(schema["@type"]).toBe("Person");

          // Verify all required fields are present
          expect(schema.name).toBe(personData.name);
          expect(schema.jobTitle).toBe(personData.jobTitle);
          expect(schema.url).toBe(siteUrl);
          expect(schema.email).toBe(personData.email);
          expect(schema.telephone).toBe(personData.phone);

          // Verify address structure
          expect(schema.address).toBeDefined();
          expect(schema.address["@type"]).toBe("PostalAddress");
          expect(schema.address.addressLocality).toBe(personData.location.city);
          expect(schema.address.addressRegion).toBe(personData.location.region);
          expect(schema.address.addressCountry).toBe(personData.location.country);

          // Verify sameAs array
          expect(Array.isArray(schema.sameAs)).toBe(true);
          expect(schema.sameAs).toContain(personData.socialProfiles.github);
          expect(schema.sameAs).toContain(personData.socialProfiles.linkedin);
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 6: Work experience schema validity
   * Feature: portfolio-seo-enhancement, Property 6: Work experience schema validity
   * 
   * For any work experience data, the generated JSON-LD WorkExperience schema
   * should be valid and include required fields: @context, @type, name,
   * description, startDate, and employer organization.
   * 
   * Validates: Requirements 3.2
   */
  test("Property 6: Work experience schema validity - all required fields present", () => {
    fc.assert(
      fc.property(
        fc.array(experienceDataArbitrary, { minLength: 1 }),
        (experiences) => {
          const schemaJson = generateWorkExperienceSchema(experiences);
          const schemas = JSON.parse(schemaJson);

          expect(Array.isArray(schemas)).toBe(true);
          expect(schemas.length).toBe(experiences.length);

          schemas.forEach((schema: any, index: number) => {
            const exp = experiences[index];

            // Verify @context and @type
            expect(schema["@context"]).toBe("https://schema.org");
            expect(schema["@type"]).toBe("WorkExperience");

            // Verify required fields
            expect(schema.name).toBe(exp.role);
            expect(schema.description).toBe(exp.description);
            expect(schema.startDate).toBe(exp.startDate);

            // Verify employer organization
            expect(schema.employer).toBeDefined();
            expect(schema.employer["@type"]).toBe("Organization");
            expect(schema.employer.name).toBe(exp.company);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 7: Creative work schema validity
   * Feature: portfolio-seo-enhancement, Property 7: Creative work schema validity
   * 
   * For any project data, the generated JSON-LD CreativeWork schema should be
   * valid and include required fields: @context, @type, name, and description.
   * 
   * Validates: Requirements 3.3
   */
  test("Property 7: Creative work schema validity - all required fields present", () => {
    fc.assert(
      fc.property(
        fc.array(projectDataArbitrary, { minLength: 1 }),
        fc.string({ minLength: 1 }),
        (projects, authorName) => {
          const schemaJson = generateCreativeWorkSchema(projects, authorName);
          const schemas = JSON.parse(schemaJson);

          expect(Array.isArray(schemas)).toBe(true);
          expect(schemas.length).toBe(projects.length);

          schemas.forEach((schema: any, index: number) => {
            const project = projects[index];

            // Verify @context and @type
            expect(schema["@context"]).toBe("https://schema.org");
            expect(schema["@type"]).toBe("CreativeWork");

            // Verify required fields
            expect(schema.name).toBe(project.name);
            expect(schema.description).toBe(project.description);

            // Verify author
            expect(schema.author).toBeDefined();
            expect(schema.author["@type"]).toBe("Person");
            expect(schema.author.name).toBe(authorName);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 8: Education schema validity
   * Feature: portfolio-seo-enhancement, Property 8: Education schema validity
   * 
   * For any education data, the generated JSON-LD EducationalOccupationalCredential
   * schema should be valid and include required fields: @context, @type, name,
   * and description.
   * 
   * Validates: Requirements 3.4
   */
  test("Property 8: Education schema validity - all required fields present", () => {
    fc.assert(
      fc.property(
        fc.array(educationDataArbitrary, { minLength: 1 }),
        (education) => {
          const schemaJson = generateEducationSchema(education);
          const schemas = JSON.parse(schemaJson);

          expect(Array.isArray(schemas)).toBe(true);
          expect(schemas.length).toBe(education.length);

          schemas.forEach((schema: any, index: number) => {
            const edu = education[index];

            // Verify @context and @type
            expect(schema["@context"]).toBe("https://schema.org");
            expect(schema["@type"]).toBe("EducationalOccupationalCredential");

            // Verify required fields
            expect(schema.name).toBe(`${edu.degree} in ${edu.field}`);
            expect(schema.description).toBeDefined();

            // Verify recognizedBy organization
            expect(schema.recognizedBy).toBeDefined();
            expect(schema.recognizedBy["@type"]).toBe("Organization");
            expect(schema.recognizedBy.name).toBe(edu.institution);
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  /**
   * Property 9: Schema.org vocabulary compliance
   * Feature: portfolio-seo-enhancement, Property 9: Schema.org vocabulary compliance
   * 
   * For any generated JSON-LD structured data, the schema should use valid
   * Schema.org vocabulary with correct @type values and required properties
   * for each type.
   * 
   * Validates: Requirements 10.6
   */
  test("Property 9: Schema.org vocabulary compliance - valid @context and @type", () => {
    fc.assert(
      fc.property(
        fc.oneof(
          fc.tuple(fc.constant("person"), personDataArbitrary, fc.webUrl()),
          fc.tuple(fc.constant("experience"), fc.array(experienceDataArbitrary, { minLength: 1 })),
          fc.tuple(fc.constant("project"), fc.array(projectDataArbitrary, { minLength: 1 }), fc.string({ minLength: 1 })),
          fc.tuple(fc.constant("education"), fc.array(educationDataArbitrary, { minLength: 1 }))
        ),
        (testCase) => {
          let schemaJson: string;
          let schemas: any;

          if (testCase[0] === "person") {
            schemaJson = generatePersonSchema(testCase[1] as PersonData, testCase[2] as string);
            schemas = [JSON.parse(schemaJson)];
          } else if (testCase[0] === "experience") {
            schemaJson = generateWorkExperienceSchema(testCase[1] as ExperienceData[]);
            schemas = JSON.parse(schemaJson);
          } else if (testCase[0] === "project") {
            schemaJson = generateCreativeWorkSchema(testCase[1] as ProjectData[], testCase[2] as string);
            schemas = JSON.parse(schemaJson);
          } else {
            schemaJson = generateEducationSchema(testCase[1] as EducationData[]);
            schemas = JSON.parse(schemaJson);
          }

          // Ensure schemas is an array
          if (!Array.isArray(schemas)) {
            schemas = [schemas];
          }

          // Verify each schema has valid @context and @type
          schemas.forEach((schema: any) => {
            expect(schema["@context"]).toBe("https://schema.org");
            expect(schema["@type"]).toBeDefined();
            expect(typeof schema["@type"]).toBe("string");
            expect(schema["@type"].length).toBeGreaterThan(0);

            // Verify @type is one of the valid Schema.org types
            const validTypes = ["Person", "WorkExperience", "CreativeWork", "EducationalOccupationalCredential"];
            expect(validTypes).toContain(schema["@type"]);
          });
        }
      ),
      { numRuns: 100 }
    );
  });
});


// ==================== Unit Tests ====================

describe("Structured Data Unit Tests", () => {
  describe("generatePersonSchema", () => {
    test("generates valid Person schema with all required fields", () => {
      const personData: PersonData = {
        name: "Sandeep Kommineni",
        jobTitle: "AI/ML Engineer",
        email: "sandeep@example.com",
        phone: "+919573456001",
        location: {
          city: "Guntur",
          region: "Andhra Pradesh",
          country: "India",
        },
        socialProfiles: {
          github: "https://github.com/sandeep",
          linkedin: "https://linkedin.com/in/sandeep",
        },
      };

      const siteUrl = "https://sandeepkommineni.me";
      const schemaJson = generatePersonSchema(personData, siteUrl);
      const schema = JSON.parse(schemaJson);

      expect(schema["@context"]).toBe("https://schema.org");
      expect(schema["@type"]).toBe("Person");
      expect(schema.name).toBe("Sandeep Kommineni");
      expect(schema.jobTitle).toBe("AI/ML Engineer");
      expect(schema.email).toBe("sandeep@example.com");
      expect(schema.telephone).toBe("+919573456001");
      expect(schema.url).toBe(siteUrl);
      expect(schema.address.addressLocality).toBe("Guntur");
      expect(schema.address.addressRegion).toBe("Andhra Pradesh");
      expect(schema.address.addressCountry).toBe("India");
      expect(schema.sameAs).toEqual([
        "https://github.com/sandeep",
        "https://linkedin.com/in/sandeep",
      ]);
    });

    test("includes optional image and bio fields when provided", () => {
      const personData: PersonData = {
        name: "John Doe",
        jobTitle: "Developer",
        email: "john@example.com",
        phone: "+1234567890",
        location: {
          city: "City",
          region: "Region",
          country: "Country",
        },
        socialProfiles: {
          github: "https://github.com/john",
          linkedin: "https://linkedin.com/in/john",
        },
        image: "https://example.com/profile.jpg",
        bio: "Experienced developer with expertise in AI/ML",
      };

      const schemaJson = generatePersonSchema(personData, "https://example.com");
      const schema = JSON.parse(schemaJson);

      expect(schema.image).toBe("https://example.com/profile.jpg");
      expect(schema.description).toBe("Experienced developer with expertise in AI/ML");
    });

    test("omits optional fields when not provided", () => {
      const personData: PersonData = {
        name: "Jane Doe",
        jobTitle: "Engineer",
        email: "jane@example.com",
        phone: "+9876543210",
        location: {
          city: "City",
          region: "Region",
          country: "Country",
        },
        socialProfiles: {
          github: "https://github.com/jane",
          linkedin: "https://linkedin.com/in/jane",
        },
      };

      const schemaJson = generatePersonSchema(personData, "https://example.com");
      const schema = JSON.parse(schemaJson);

      expect(schema.image).toBeUndefined();
      expect(schema.description).toBeUndefined();
    });
  });

  describe("generateWorkExperienceSchema", () => {
    test("generates valid WorkExperience schema with required fields", () => {
      const experiences: ExperienceData[] = [
        {
          company: "Truviz.AI",
          role: "AI/ML Engineer",
          description: "Built AI platforms",
          startDate: "2026-01",
          location: "Remote",
        },
      ];

      const schemaJson = generateWorkExperienceSchema(experiences);
      const schemas = JSON.parse(schemaJson);

      expect(Array.isArray(schemas)).toBe(true);
      expect(schemas.length).toBe(1);
      expect(schemas[0]["@context"]).toBe("https://schema.org");
      expect(schemas[0]["@type"]).toBe("WorkExperience");
      expect(schemas[0].name).toBe("AI/ML Engineer");
      expect(schemas[0].description).toBe("Built AI platforms");
      expect(schemas[0].startDate).toBe("2026-01");
      expect(schemas[0].employer.name).toBe("Truviz.AI");
      expect(schemas[0].location).toBe("Remote");
    });

    test("includes optional endDate, companyUrl, and skills when provided", () => {
      const experiences: ExperienceData[] = [
        {
          company: "Tech Corp",
          role: "Developer",
          description: "Developed software",
          startDate: "2020-01",
          endDate: "2022-12",
          location: "New York",
          companyUrl: "https://techcorp.com",
          skills: ["React", "Node.js", "TypeScript"],
        },
      ];

      const schemaJson = generateWorkExperienceSchema(experiences);
      const schemas = JSON.parse(schemaJson);

      expect(schemas[0].endDate).toBe("2022-12");
      expect(schemas[0].employer.url).toBe("https://techcorp.com");
      expect(schemas[0].skills).toEqual(["React", "Node.js", "TypeScript"]);
    });

    test("handles multiple work experiences", () => {
      const experiences: ExperienceData[] = [
        {
          company: "Company A",
          role: "Role A",
          description: "Description A",
          startDate: "2020-01",
          location: "Location A",
        },
        {
          company: "Company B",
          role: "Role B",
          description: "Description B",
          startDate: "2022-01",
          location: "Location B",
        },
      ];

      const schemaJson = generateWorkExperienceSchema(experiences);
      const schemas = JSON.parse(schemaJson);

      expect(schemas.length).toBe(2);
      expect(schemas[0].employer.name).toBe("Company A");
      expect(schemas[1].employer.name).toBe("Company B");
    });
  });

  describe("generateCreativeWorkSchema", () => {
    test("generates valid CreativeWork schema with required fields", () => {
      const projects: ProjectData[] = [
        {
          name: "TruGen.AI",
          description: "Multimodal AI Platform",
          technologies: ["LiveKit", "OpenAI"],
        },
      ];

      const schemaJson = generateCreativeWorkSchema(projects, "Sandeep Kommineni");
      const schemas = JSON.parse(schemaJson);

      expect(Array.isArray(schemas)).toBe(true);
      expect(schemas.length).toBe(1);
      expect(schemas[0]["@context"]).toBe("https://schema.org");
      expect(schemas[0]["@type"]).toBe("CreativeWork");
      expect(schemas[0].name).toBe("TruGen.AI");
      expect(schemas[0].description).toBe("Multimodal AI Platform");
      expect(schemas[0].author.name).toBe("Sandeep Kommineni");
      expect(schemas[0].keywords).toEqual(["LiveKit", "OpenAI"]);
    });

    test("includes optional url, dateCreated, and datePublished when provided", () => {
      const projects: ProjectData[] = [
        {
          name: "Project X",
          description: "A great project",
          url: "https://projectx.com",
          technologies: ["React"],
          dateCreated: "2024-01",
          datePublished: "2024-06",
        },
      ];

      const schemaJson = generateCreativeWorkSchema(projects, "Author Name");
      const schemas = JSON.parse(schemaJson);

      expect(schemas[0].url).toBe("https://projectx.com");
      expect(schemas[0].dateCreated).toBe("2024-01");
      expect(schemas[0].datePublished).toBe("2024-06");
    });

    test("handles multiple projects", () => {
      const projects: ProjectData[] = [
        {
          name: "Project 1",
          description: "Description 1",
          technologies: ["Tech1"],
        },
        {
          name: "Project 2",
          description: "Description 2",
          technologies: ["Tech2"],
        },
      ];

      const schemaJson = generateCreativeWorkSchema(projects, "Author");
      const schemas = JSON.parse(schemaJson);

      expect(schemas.length).toBe(2);
      expect(schemas[0].name).toBe("Project 1");
      expect(schemas[1].name).toBe("Project 2");
    });
  });

  describe("generateEducationSchema", () => {
    test("generates valid EducationalOccupationalCredential schema with required fields", () => {
      const education: EducationData[] = [
        {
          institution: "KL University",
          degree: "Bachelor of Technology",
          field: "Computer Science",
          startDate: "2022-03",
          endDate: "2026-03",
        },
      ];

      const schemaJson = generateEducationSchema(education);
      const schemas = JSON.parse(schemaJson);

      expect(Array.isArray(schemas)).toBe(true);
      expect(schemas.length).toBe(1);
      expect(schemas[0]["@context"]).toBe("https://schema.org");
      expect(schemas[0]["@type"]).toBe("EducationalOccupationalCredential");
      expect(schemas[0].name).toBe("Bachelor of Technology in Computer Science");
      expect(schemas[0].recognizedBy.name).toBe("KL University");
      expect(schemas[0].startDate).toBe("2022-03");
      expect(schemas[0].endDate).toBe("2026-03");
    });

    test("includes optional gpa and location in description", () => {
      const education: EducationData[] = [
        {
          institution: "University",
          degree: "Master's",
          field: "AI",
          startDate: "2020",
          endDate: "2022",
          gpa: "9.5",
          location: "City, Country",
        },
      ];

      const schemaJson = generateEducationSchema(education);
      const schemas = JSON.parse(schemaJson);

      expect(schemas[0].grade).toBe("9.5");
      expect(schemas[0].description).toContain("University");
      expect(schemas[0].description).toContain("City, Country");
    });

    test("handles multiple education entries", () => {
      const education: EducationData[] = [
        {
          institution: "University A",
          degree: "Bachelor's",
          field: "CS",
          startDate: "2018",
          endDate: "2022",
        },
        {
          institution: "University B",
          degree: "Master's",
          field: "AI",
          startDate: "2022",
          endDate: "2024",
        },
      ];

      const schemaJson = generateEducationSchema(education);
      const schemas = JSON.parse(schemaJson);

      expect(schemas.length).toBe(2);
      expect(schemas[0].recognizedBy.name).toBe("University A");
      expect(schemas[1].recognizedBy.name).toBe("University B");
    });

    test("formats date strings correctly", () => {
      const education: EducationData[] = [
        {
          institution: "Test University",
          degree: "PhD",
          field: "Machine Learning",
          startDate: "2024-01-15",
          endDate: "2028-12-31",
        },
      ];

      const schemaJson = generateEducationSchema(education);
      const schemas = JSON.parse(schemaJson);

      expect(schemas[0].startDate).toBe("2024-01-15");
      expect(schemas[0].endDate).toBe("2028-12-31");
    });
  });

  describe("JSON-LD parsing and validation", () => {
    test("all schemas produce valid JSON", () => {
      const personData: PersonData = {
        name: "Test",
        jobTitle: "Developer",
        email: "test@example.com",
        phone: "+1234567890",
        location: { city: "City", region: "Region", country: "Country" },
        socialProfiles: { github: "https://github.com/test", linkedin: "https://linkedin.com/in/test" },
      };

      const experiences: ExperienceData[] = [
        { company: "Co", role: "Role", description: "Desc", startDate: "2020", location: "Loc" },
      ];

      const projects: ProjectData[] = [
        { name: "Proj", description: "Desc", technologies: ["Tech"] },
      ];

      const education: EducationData[] = [
        { institution: "Uni", degree: "Deg", field: "Field", startDate: "2020", endDate: "2024" },
      ];

      // All should parse without throwing
      expect(() => JSON.parse(generatePersonSchema(personData, "https://example.com"))).not.toThrow();
      expect(() => JSON.parse(generateWorkExperienceSchema(experiences))).not.toThrow();
      expect(() => JSON.parse(generateCreativeWorkSchema(projects, "Author"))).not.toThrow();
      expect(() => JSON.parse(generateEducationSchema(education))).not.toThrow();
    });
  });
});
