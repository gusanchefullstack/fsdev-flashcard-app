# Planning
- Create a plan for the project, list activitoes and allow me to validate it. 
- Use the content of the body in @index-source.html as source text
- Use the @data.json (if exist) as source of data for info displayed.
- Split the implementation tasks/parts of the project in separated commits.

# Design
- Consider the figma-design file (*.fig) as source or truth for css styles, spacing, fonts, responsive designs. 
- Use pages Design and Design Systems in figma file for getting all styling details. 
- Also use the images contained in this file like svgs if not found them in the /assets or /images folder.
- The designs inside @design page in figma file reflect the expected output for the several screens: mobile, desktop and tablet. Apply the best responsive design practices for each layout but always keep the specs defined in figma.

# Architecture
- Implement the project using HTML/CSS and Reactjs 19 with Typescript if needed.
- Use vite as deploying server for frontend
- The source code should be in src/ folder under the project root. CSS styles and Typescript files should inside corresponding subfolders. Use logical reactjs components created in a /componentes folder
- Use vitest for testing use case and componentes key for properly operation of app.
- Use best practices for frontend development naming convention, semantic html among others.
- Use best practices for frontend react applications
- Use semantic HTML (header, nav, main, aside, footer, article, section) consistently — it clarifies structure for users and assistive tech and reduces the need for extra ARIA. 
- One main per page is a simple, high-impact rule to remember. 
- Wrap the primary page content in a single <main> element (and remove any other main roles/elements). 
- If you have multiple sections that look “main-like,” choose one principal area and mark others with appropriate semantics (section, aside, nav).
- Only one h1 element should exist in html
- Avoid to use Multiple links with identical text, which makes it hard to determine each link's purpose when list of links is read out of surrounding context by assistive technology. This causes screen reader users and anyone scanning links quickly to be unsure which plan each action applies to, increasing cognitive load and risking mistaken clicks. Consider using best practices of WCAG.
- If the project includes backend/api and frontend, implement a monorepo.

# Styling and Fomatting
- Use css classes in css modules.
- Follow the style guidelines / css specs defined in in the design page in figma file.
- Colors, gradients, typography should be parameterized in the project to allow further changes and this variables should be included in a separate file.

# Versioning
- Initialize local git repo if not initialized. 
- Create a repo in github previous to vercel deployment. 
- Create a branch in git for the development of each responsive design layout: desktop, tablet, mobile in order to isolate possible issues.
- If the project includes backend/api and frontend create separate branches for backend.
- Avoid that figma designs be pushed to github (using .gitignore file).
- Github repo must be created with a prefix "fsdev-" to identify later the repos created.

# Testing
- Use vitest as testing framework
- Test implementation with browser screen at 375px (mobile), 768px (tablet) and 1440px (desktop) screens.
- Use test to validate functionality/features after important changes.

# Documentation
- Create a README.md following README-template.md but also considering skill /create-readme once the project is finished
- Update the Author section in README with the following contact info. Add badges to each related link address. Arrange them in inline row.
    https://www.linkedin.com/in/gustavosanchezgalarza/
    https://github.com/gusanchefullstack
    https://hashnode.com/@gusanchedev
    https://x.com/gusanchedev
    https://bsky.app/profile/gusanchedev.bsky.social
    https://www.freecodecamp.org/gusanchedev
    https://www.frontendmentor.io/profile/gusanchefullstack
- Once finished implementation, take screenshots for 375px strictly and 1440px strictly viewport (responsive view) and add them first to the /screenshots folder in root and them insert from here to the readme in the screenshots section.
- Screenshots to include in README.md for 375px should be 40% width of 1440px shots.

# Deployment
- Once I confirm the project is done and the github repo was created, deploy the project to vercel under my account (gustavosanchezgalarza@gmail.com)

# Update my landing page
- Use @landing-page-portfolio-updater to update my portafolio with this project.

# Submit project to frontendmentor.io
@frontendmentor-submitter Submit the project

# Fixing issues of FrontendMentor.io
@frontend-mentor-issue-fixer