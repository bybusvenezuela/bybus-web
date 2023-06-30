import * as All from "@/public";

export const navbar = {
  logo: `https://bybuss3180655-dev.s3.amazonaws.com/public/logo.png`,
  menu: [
    {
      id: "home",
      title: "Inicio",
    },
    {
      id: "about-us",
      title: "Nosotros",
    },
    {
      id: "pricing",
      title: "Precios",
    },
    {
      id: "contact-us",
      title: "Contáctanos",
    },
  ],
  button: {
    id: "donwload",
    logo: All.Google,
    title: "Descárgalo",
  },
};

export const home = {
  mainImage: `https://bybuss3180655-dev.s3.amazonaws.com/public/home-main.png`,
  stickImage: `https://bybuss3180655-dev.s3.amazonaws.com/public/home-stick.png`,
  title: "make the best decisions for your trip",
  subtitle:
    '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt u”',
  buttons: {
    one: {
      id: "one-btn",
      title: "Empieza ya",
      link: "/",
      icon: "bx bxs-chevrons-right",
    },
    two: {
      id: "two-btn",
      title: "Tutorial",
      link: "/",
      icon: "bx bx-play-circle",
    },
  },
};

export const advantages = {
  mainImage: `https://bybuss3180655-dev.s3.amazonaws.com/public/advantages.png`,
  title: "Ventajas",
  question: "¿Por qué escoger ByBus?",
  icon: "bx bx-bell",
  subtitle: "viaja tranquilo",
  paragraph: `Elige ByBus, la primera y única aplicación de venta de pasajes en Venezuela, para disfrutar de un viaje en autobús sin complicaciones. Con ByBus, podrás acceder a reservas rápidas y seguras, una amplia gama de rutas y opciones de pago flexibles. Simplifique su experiencia de viaje y deje de hacer largas colas. Descargue ByBus ahora mismo y descubra una manera cómoda y moderna para viajar por todo el país. ¡Su próximo destino se encuentra a solo un par de clics con ByBus!`,
};

export const customizable = {
  mainImage: `https://bybuss3180655-dev.s3.amazonaws.com/public/customizable.png`,
  icon: "bx bx-star",
  title: "Viaja mas fácil",
  paragraph: `ByBus, la aplicación de venta de pasajes en Venezuela, es intuitiva y fácil de usar. Con una interfaz simple, usted será capaz de buscar y comprar boletos para diferentes destinos, fechas y horarios. Además, ofrece una gran variedad de formas de pago. Viajar nunca ha sido más fácil: descarga ByBus y reserva tus viajes en pocos pasos.`,
};

export const aboutus = {
  mainImage: `https://bybuss3180655-dev.s3.amazonaws.com/public/about.png`,
  title: "Testimonios",
  question: "Qué dicen los usuarios sobre nosotros",
  subtitle: "¡Estoy muy contento por la experiencia que he tenido usando ByBus. La aplicación es increíblemente intuitiva y me ha hecho más fácil comprar boletos para mis viajes en bus. Puedo buscar diferentes destinos, escoger fechas y horas convenientes, y hacer el pago de forma segura. Recomendaría ByBus a todos los viajeros en Venezuela que están buscando comodidad y eficiencia en sus viajes!",
  usersImage: `https://bybuss3180655-dev.s3.amazonaws.com/public/users.png`,
  userText: "Christopher Alvarez",
};

export const faq = {
  title: "faq",
  subtitle: "Pregúntas frecuentes",
  questions: [
    {
      id: "question-1",
      question: "¿Cómo funciona la aplicación de ventas de pasajes de ByBus?",
      answer: `Nuestra aplicación le permite encontrar y reservar billetes de autobús con rapidez y comodidad. Simplemente introduzca los detalles de viaje y la aplicación mostrará las opciones disponibles para que pueda seleccionar la más conveniente.`,
      status: "yellow",
    },
    {
      id: "question-2",
      question: "¿Qué métodos de pago acepta la aplicación?",
      answer: `Aceptamos diversos métodos de pago, como tarjetas de crédito, débito y opciones de pago en línea. Esto te brinda flexibilidad al momento de realizar tus compras de boletos.”`,
      status: "white",
    },
    {
      id: "question-3",
      question: "¿Es posible realizar cambios en la reserva después de la compra?",
      answer: `Sí, en algunos casos puedes solicitar cambios en tu reserva, como modificar la fecha o el horario del viaje. Te recomendamos consultar nuestras políticas y contactar a nuestro equipo de atención al cliente para obtener más información sobre las opciones disponibles.`,
      status: "white",
    },
    {
      id: "question-4",
      question: "¿Cómo puedo obtener mi boleto una vez que lo haya comprado a través de la aplicación?",
      answer: `Una vez completada la compra, recibirás un boleto electrónico en la aplicación. Este boleto estará disponible en tu cuenta y podrás acceder a él en cualquier momento.`,
      status: "yellow",
    },
    {
      id: "question-5",
      question: "¿La aplicación ofrece información actualizada sobre horarios y rutas de los autobuses?",
      answer: `Sí, la aplicación se mantiene actualizada con la información más reciente sobre horarios y rutas de los autobuses. Podrás obtener detalles precisos sobre salidas, llegadas y cualquier cambio en los horarios programados.`,
      status: "yellow",
    },
    {
      id: "question-6",
      question: "¿Qué sucede si surge un problema durante el proceso de reserva o durante el viaje?",
      answer: `Contamos con un equipo de atención al cliente disponible para ayudarte en caso de cualquier problema o consulta que puedas tener. Puedes comunicarte con nosotros a través de la aplicación o de nuestros canales de contacto proporcionados.`,
      status: "white",
    },
  ],
};

export const download = {
  mainImage: `https://bybuss3180655-dev.s3.amazonaws.com/public/download.png`,
  backgroundImage: `https://bybuss3180655-dev.s3.amazonaws.com/public/background.png`,
  title: "¿Listo para comenzar?",
  subtitle: `Descargue ahora y reserve sus boletos de autobús de forma instantánea. Tu próximo viaje está a solo un clic de distancia.`,
  button: {
    title: "Descarga",
    image: `https://bybuss3180655-dev.s3.amazonaws.com/public/google.png`,
  },
};

export const footer = {
  contact: {
    logo: `https://bybuss3180655-dev.s3.amazonaws.com/public/footerLogo.png`,
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
    title: "Enlaces",
    pages: [
      {
        id: "pages-1",
        title: "Inicio",
        link: "/",
      },
      {
        id: "pages-2",
        title: "Nosotros",
        link: "/",
      },
      {
        id: "pages-3",
        title: "Precios",
        link: "/",
      },
      {
        id: "pages-4",
        title: "Contáctanos",
        link: "/",
      },
    ],
  },
  legal: {
    title: "Políticas",
    pages: [
      {
        id: "pages-1",
        title: "Términos de uso",
        link: "/",
      },
      {
        id: "pages-2",
        title: "Política de privacidad",
        link: "/",
      },
      {
        id: "pages-3",
        title: "Cookies",
        link: "/",
      },
    ],
  },
  newsletter: {
    title: "Información",
    subtitle: "Mantente informado",
    placeholder: "Tu correo electrónico",
    button: "Suscríbete",
  },
  copy: 'Copyright 2023 - ByBus conserva todos los derechos'
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