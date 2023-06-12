import * as All from "../../public";

export const navbar = {
  logo: All.Logo,
  menu: [
    {
      id: "home",
      title: "Home",
    },
    {
      id: "about-us",
      title: "About us",
    },
    {
      id: "pricing",
      title: "Pricing",
    },
    {
      id: "contact-us",
      title: "Contact us",
    },
  ],
  button: {
    id: "donwload",
    logo: All.Google,
    title: "Donwload",
  },
};

export const home = {
  mainImage: All.HomeMain,
  stickImage: All.HomeStick,
  title: "make the best decisions for your trip",
  subtitle:
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u”',
  buttons: {
    one: {
      id: "one-btn",
      title: "get started",
      link: "/",
      icon: "bx bxs-chevrons-right",
    },
    two: {
      id: "two-btn",
      title: "watch video",
      link: "/",
      icon: "bx bx-play-circle",
    },
  },
};

export const advantages = {
  mainImage: All.Advantages,
  title: "advantages",
  question: "why choose ByBus?",
  icon: "bx bx-bell",
  subtitle: "Smart Travel",
  paragraph: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum."`,
};

export const customizable = {
  mainImage: All.Customizable,
  icon: "bx bx-star",
  title: "fully customizable",
  paragraph: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
  ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  aliquip ex ea commodo consequat. Duis aute irure dolor in
  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  culpa qui officia deserunt mollit anim id est laborum."`,
};

export const aboutus = {
  mainImage: All.About,
  title: "testimonial",
  question: "what our users say about us?",
  subtitle: "the best Travel Trip app ever!",
  paragraph: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute."`,
  usersImage: All.Users,
  userText: "Christopher Alvarez",
};

export const faq = {
  title: "faq",
  subtitle: "Frequently asked questions",
  questions: [
    {
      id: "question-1",
      question: "Question One?",
      answer: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”`,
      status: "yellow",
    },
    {
      id: "question-2",
      question: "Question Two?",
      answer: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”`,
      status: "white",
    },
    {
      id: "question-3",
      question: "Question Three?",
      answer: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”`,
      status: "white",
    },
    {
      id: "question-4",
      question: "Question Four?",
      answer: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”`,
      status: "yellow",
    },
    {
      id: "question-5",
      question: "Question Five?",
      answer: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”`,
      status: "yellow",
    },
    {
      id: "question-6",
      question: "Question Six?",
      answer: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”`,
      status: "white",
    },
  ],
};

export const download = {
  mainImage: All.Download,
  backgroundImage: All.Background,
  title: "ready to get started?",
  subtitle: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u”`,
  button: {
    title: "download app",
    image: All.Google,
  },
};

export const footer = {
  contact: {
    logo: All.FooterLogo,
    info: [
      {
        id: "info-1",
        icon: "bx bxs-envelope",
        text: "soporte@bybusvenezuela.com",
      },
      {
        id: "info-2",
        icon: "bx bxs-phone",
        text: "+58 00000 00",
      },
    ],
  },
  links: {
    title: "links",
    pages: [
      {
        id: "pages-1",
        title: "home",
        link: "/",
      },
      {
        id: "pages-2",
        title: "about us",
        link: "/",
      },
      {
        id: "pages-3",
        title: "bookings",
        link: "/",
      },
      {
        id: "pages-4",
        title: "blog",
        link: "/",
      },
    ],
  },
  legal: {
    title: "legal",
    pages: [
      {
        id: "pages-1",
        title: "terms of use",
        link: "/",
      },
      {
        id: "pages-2",
        title: "privacy policy",
        link: "/",
      },
      {
        id: "pages-3",
        title: "cookie policy",
        link: "/",
      },
    ],
  },
  newsletter: {
    title: "newsletter",
    subtitle: "Stay up to date",
    placeholder: "Your email",
    button: "subscribe",
  },
  copy: 'Copyright 2023 ByBus all rights reserved'
};

export const baseContact = {
  title: 'Get in touch',
  subtitle: 'Contact Me',
  contactTitle: 'Talk to me',
  contactSubtitle: 'Write me',
  name: 'name',
  email: 'email',
  message: 'message'
}

export const cardContact = [
  {
      id: 'card-1',
      title: 'Email',
      data: 'bybus@gmail.com',
      icon: 'bx bx-mail-send',
  },
  {
      id: 'card-2',
      title: 'WhatsApp',
      data: '+ 58 000 000 000',
      icon: 'bx bxl-whatsapp',
  },
  {
      id: 'card-3',
      title: 'Twitter',
      data: '@bybus',
      icon: 'bx bxl-twitter',
  },
]