// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-news",
          title: "news",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/news/";
          },
        },{id: "nav-learning-log",
          title: "learning log",
          description: "Things I&#39;ve been reading and watching — papers, blog posts, books, and videos that connect to my work in ML and AI Safety. A way to document the learning process over time.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/learning/";
          },
        },{id: "nav-projects",
          title: "projects",
          description: "A selection from my personal and course projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-travel",
          title: "travel",
          description: "A collection of my travel adventures and experiences around the world.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/travel/";
          },
        },{id: "nav-cv",
          title: "cv",
          description: "My CV is embedded below. You can also use the PDF icon to open it in a new tab.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "post-reflecting-on-the-bluedot-impact-technical-ai-safety-course",
        
          title: "Reflecting on the BlueDot Impact Technical AI Safety Course",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/bluedot-technical-ai-safety/";
          
        },
      },{id: "books-the-godfather",
          title: 'The Godfather',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/the_godfather/";
            },},{id: "news-i-ran-8k-at-the-istanbul-marathon-️-️",
          title: 'I ran 8k at the Istanbul Marathon!🏃🏻‍♀️‍➡️',
          description: "",
          section: "News",},{id: "news-i-walked-over-50-km-along-the-lycian-way-among-4-days-with-an-amazing-view-️",
          title: 'I walked over 50 km along the Lycian Way among 4 days with...',
          description: "",
          section: "News",},{id: "news-i-completed-a-10-km-run-at-the-istanbul-half-marathon-️-️",
          title: 'I completed a 10 km run at the Istanbul Half Marathon!🏃🏻‍♀️‍➡️',
          description: "",
          section: "News",},{id: "news-i-hosted-the-closing-ceremony-of-the-mentorship-program-at-inzva",
          title: 'I hosted the closing ceremony of the Mentorship Program at inzva💖',
          description: "",
          section: "News",},{id: "news-i-started-my-internship-at-the-brussels-human-robotic-research-center-brubotics-of-the-vrije-universiteit-brussel-vub-in-belgium",
          title: 'I started my internship at The Brussels Human Robotic research center (BruBotics) of...',
          description: "",
          section: "News",},{id: "news-i-volunteered-at-the-istanbul-half-marathon",
          title: 'I volunteered at the Istanbul Half Marathon!📢',
          description: "",
          section: "News",},{id: "news-we-presented-our-bachelor-s-thesis-project-at-senior-design-day-of-koç-university",
          title: 'We presented our Bachelor’s thesis project at Senior Design Day of Koç University....',
          description: "",
          section: "News",},{id: "news-i-hosted-the-closing-ceremony-of-the-mentorship-program-at-inzva",
          title: 'I hosted the closing ceremony of the Mentorship Program at inzva🥰',
          description: "",
          section: "News",},{id: "news-i-graduated",
          title: 'I graduated!!!🎓',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/graduation/";
            },},{id: "news-i-volunteered-at-nesin-maths-village-for-two-weeks",
          title: 'I volunteered at Nesin Maths Village for two weeks!👩🏻‍🍳',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/nmk/";
            },},{id: "news-i-attended-the-olympos-sky-and-science-festival-exploring-astronomy-and-nature",
          title: 'I attended the Olympos Sky and Science Festival, exploring astronomy and nature🔭🌌',
          description: "",
          section: "News",},{id: "news-i-started-my-master-39-s-degree-at-beautiful-tübingen",
          title: 'I started my Master&amp;#39;s degree at beautiful Tübingen!',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/master/";
            },},{id: "news-i-started-working-as-student-assistant-at-ellis-institute-tübingen",
          title: 'I started working as Student Assistant at ELLIS Institute Tübingen.',
          description: "",
          section: "News",},{id: "news-i-completed-the-civis-bip-novel-research-and-ethics-from-neuroscience-to-ai-with-10-weeks-of-virtual-part-following-to-1-week-on-site-part-in-salzburg",
          title: 'I completed the CIVIS BIP “Novel Research and Ethics: From Neuroscience to AI”...',
          description: "",
          section: "News",},{id: "news-i-have-completed-intensive-technical-ai-safety-course-offered-by-bluedot-impact",
          title: 'I have completed Intensive Technical AI Safety Course offered by BlueDot Impact!!!',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{id: "travel-paris-france",
          title: 'Paris, France',
          description: "Exploring the iconic landmarks, art museums, and charming streets of Paris.",
          section: "Travel",handler: () => {
              window.location.href = "/travel/paris/";
            },},{id: "travel-barcelona-spain",
          title: 'Barcelona, Spain',
          description: "A 5-day trip to Barcelona between October 8 and October 12.",
          section: "Travel",handler: () => {
              window.location.href = "/travel/barcelona/";
            },},{id: "travel-vienna-austria",
          title: 'Vienna, Austria',
          description: "A 5-day trip to Vienna from December 20 to December 24, 2025.",
          section: "Travel",handler: () => {
              window.location.href = "/travel/vienna/";
            },},{id: "travel-north-italy",
          title: 'North Italy',
          description: "A 5-day trip across North Italy visiting Venice, Verona, and Milan.",
          section: "Travel",handler: () => {
              window.location.href = "/travel/north_italy/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%69%72%65%6D%6B%61%72%61%63%61%63%73@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/iremkrc", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/irem-karaca", "_blank");
        },
      },{
        id: 'social-youtube',
        title: 'YouTube',
        section: 'Socials',
        handler: () => {
          window.open("https://youtube.com/@irem.karaca", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
