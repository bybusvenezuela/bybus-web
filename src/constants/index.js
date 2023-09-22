import * as All from "@/public";

export const navbar = {
  // logo: `https://d3ii53iqsdavsa.cloudfront.net/public/logo.png`,
  logo: All.Logo,
  menu: [
    {
      id: "home",
      title: "Inicio",
    },
    {
      id: "advantages",
      title: "Nosotros",
    },
    {
      id: "questions",
      title: "Preguntas",
    },
    {
      id: "contact-us",
      title: "Contáctanos",
    },
  ],
  button: {
    id: "donwload",
    logo: All.Google,
    apple: All.Apple,
    title: "Descárgalo",
  },
};

export const home = {
  mainImage: All.Fondo,
  stickImage: `https://d3ii53iqsdavsa.cloudfront.net/public/home-stick.png`,
  title: "Viaja con ByBus",
  titleSecond: "por toda Venezuela",
  subtitle:
    '¡Con nuestra emocionante nueva app de transporte en Venezuela, descubre una forma más fácil y conveniente de moverte! Olvídate de las largas horas de espera y los viajes incómodos. ¡Descarga ByBus y disfruta de nuevas experiencias de viajes que traemos para ti!',
  buttons: {
    one: {
      id: "one-btn",
      title: "Descargala ahora",
      link: "/",
      icon: "bx bxs-chevrons-right",
    },
    two: {
      id: "two-btn",
      title: "Tutorial",
      link: "https://youtu.be/lI3xbzsdD3k",
      icon: "bx bx-play-circle",
    },
  },
};

export const advantages = {
  mainImage: All.Advantages,
  title: "Ventajas",
  question: "¿Por qué escoger ByBus?",
  icon: "bx bx-bell",
  subtitle: "viaja tranquilo",
  paragraph: `Elige ByBus, la primera y única aplicación de venta de pasajes en Venezuela, para disfrutar de un viaje en autobús sin complicaciones. Con ByBus, podrás acceder a reservas rápidas y seguras, una amplia gama de rutas y opciones de pago flexibles. Simplifique su experiencia de viaje y deje de hacer largas colas. Descargue ByBus ahora mismo y descubra una manera cómoda y moderna para viajar por todo el país. ¡Su próximo destino se encuentra a solo un par de clics con ByBus!`,
};

export const customizable = {
  mainImage: All.About,
  icon: "bx bx-star",
  title: "Viaja mas fácil",
  paragraph: `ByBus, la aplicación de venta de pasajes en Venezuela, es intuitiva y fácil de usar. Con una interfaz simple, usted será capaz de buscar y comprar boletos para diferentes destinos, fechas y horarios. Además, ofrece una gran variedad de formas de pago. Viajar nunca ha sido tan fácil: descarga ByBus y reserva tus viajes en pocos pasos.`,
};

export const aboutus = {
  mainImage: `https://d3ii53iqsdavsa.cloudfront.net/public/about.png`,
  title: "Testimonios",
  question: "Qué dicen los usuarios sobre nosotros",
  subtitle:
    "¡Estoy muy contento por la experiencia que he tenido usando ByBus. La aplicación es increíblemente intuitiva y me ha hecho más fácil comprar boletos para mis viajes en bus. Puedo buscar diferentes destinos, escoger fechas y horas convenientes, y hacer el pago de forma segura. Recomendaría ByBus a todos los viajeros en Venezuela que están buscando comodidad y eficiencia en sus viajes!",
  usersImage: `https://d3ii53iqsdavsa.cloudfront.net/public/users.png`,
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
      question:
        "¿Es posible realizar cambios en la reserva después de la compra?",
      answer: `Sí, en algunos casos puedes solicitar cambios en tu reserva, como modificar la fecha o el horario del viaje. Te recomendamos consultar nuestras políticas y contactar a nuestro equipo de atención al cliente para obtener más información sobre las opciones disponibles.`,
      status: "white",
    },
    {
      id: "question-4",
      question:
        "¿Cómo puedo obtener mi boleto una vez que lo haya comprado a través de la aplicación?",
      answer: `Una vez completada la compra, recibirás un boleto electrónico en la aplicación. Este boleto estará disponible en tu cuenta y podrás acceder a él en cualquier momento.`,
      status: "yellow",
    },
    {
      id: "question-5",
      question:
        "¿La aplicación ofrece información actualizada sobre horarios y rutas de los autobuses?",
      answer: `Sí, la aplicación se mantiene actualizada con la información más reciente sobre horarios y rutas de los autobuses. Podrás obtener detalles precisos sobre salidas, llegadas y cualquier cambio en los horarios programados.`,
      status: "yellow",
    },
    {
      id: "question-6",
      question:
        "¿Qué sucede si surge un problema durante el proceso de reserva o durante el viaje?",
      answer: `Contamos con un equipo de atención al cliente disponible para ayudarte en caso de cualquier problema o consulta que puedas tener. Puedes comunicarte con nosotros a través de la aplicación o de nuestros canales de contacto proporcionados.`,
      status: "white",
    },
  ],
};

export const download = {
  mainImage: All.Welcome,
  secondImage: All.Profile,
  title: "¿Listo para comenzar?",
  subtitle: `Descargue ahora y reserve sus boletos de autobús de forma instantánea. Tu próximo viaje está a solo un clic de distancia.`,
  button: {
    title: "Descarga",
    image: `https://d3ii53iqsdavsa.cloudfront.net/public/google.png`,
    apple: All.Apple,
  },
};

export const footer = {
  contact: {
    // logo: `https://d3ii53iqsdavsa.cloudfront.net/public/footerLogo.png`,
    logo: All.Logo,
    info: [
      {
        id: "info-1",
        icon: "bx bxs-envelope",
        text: "soporte@bybusvenezuela.com",
      },
      {
        id: "info-2",
        icon: "bx bxs-phone",
        text: "+ 58 426-5523463",
      },
    ],
  },
  links: {
    title: "Enlaces",
    pages: [
      {
        id: "home",
        title: "Inicio",
      },
      {
        id: "advantages",
        title: "Nosotros",
      },
      {
        id: "questions",
        title: "Preguntas Frecuentes",
      },
      {
        id: "contact-us",
        title: "Contáctanos",
      },
    ],
  },
  legal: {
    title: "Políticas",
    pages: [
      {
        id: "pages-1",
        title: "Términos de uso",
        link: "/terms",
      },
      {
        id: "pages-2",
        title: "Política de privacidad",
        link: "/politics",
      },
    ],
  },
  newsletter: {
    title: "Información",
    subtitle: "Mantente informado",
    placeholder: "Tu correo electrónico",
    button: "Suscríbete",
  },
  copy: "Copyright 2023 - ByBus conserva todos los derechos",
};

export const baseContact = {
  title: "Get in touch",
  subtitle: "Contact Me",
  contactTitle: "Talk to me",
  contactSubtitle: "Write me",
  name: "name",
  email: "email",
  message: "message",
};

export const cardContact = [
  {
    id: "card-1",
    title: "Email",
    data: "soporte@bybusvenezuela.com",
    icon: "bx bx-mail-send",
  },
  {
    id: "card-2",
    title: "WhatsApp",
    data: "+ 58 426-5523463",
    icon: "bx bxl-whatsapp",
  },
  {
    id: "card-3",
    title: "Instagram",
    data: "@bybusvenezuela",
    icon: "bx bxl-instagram",
  },
];

export const terms = {
  title: 'Términos y Condiciones de ByBus',
  content: `

  1. Introducción Estos Términos y Condiciones rigen el uso de la aplicación ByBus y el servicio de venta de boletos de viaje terrestre proporcionado por nuestra empresa. Al utilizar nuestra aplicación, usted acepta estos Términos y Condiciones en su totalidad. Si no está de acuerdo con estos Términos y Condiciones o cualquier parte de ellos, no debe utilizar nuestra aplicación.
  
  2. Licencia para usar la aplicación Le otorgamos una licencia no exclusiva, intransferible y revocable para utilizar nuestra aplicación en cualquier dispositivo que posea o controle, sujeto a estos Términos y Condiciones. No puede copiar, modificar, distribuir, vender ni transferir ninguna parte de nuestra aplicación ni su contenido sin nuestro consentimiento previo por escrito.
  
  3. Registro y Cuenta Para utilizar algunas funciones de nuestra aplicación, como comprar boletos, debe registrarse y crear una cuenta. Al registrarse, debe proporcionar información precisa y completa y mantenerla actualizada en todo momento. Es responsable de mantener la confidencialidad de su contraseña y cualquier actividad que ocurra en su cuenta. Si sospecha que alguien ha accedido a su cuenta sin autorización, debe notificarnos inmediatamente.
  
  4. Servicio de venta de boletos Nuestra aplicación le permite comprar boletos para viajes terrestres a través de nuestro servicio de venta de boletos. Al comprar un boleto a través de nuestra aplicación, usted acepta pagar el precio del boleto y cualquier cargo adicional que pueda aplicarse. Los boletos comprados a través de nuestra aplicación son no reembolsables, excepto en los casos en que se cancele el viaje o se produzca un retraso significativo.
  
  5. Conducta del usuario Al utilizar nuestra aplicación, usted acepta cumplir con todas las leyes aplicables y no utilizar nuestra aplicación para ningún propósito ilegal o prohibido por estos Términos y Condiciones. No puede utilizar nuestra aplicación para acosar, amenazar, difamar o invadir la privacidad de otros usuarios o terceros. No puede utilizar nuestra aplicación para transmitir virus u otro código malicioso.
  
  6. Contenido del usuario Nuestra aplicación puede permitirle enviar contenido, como comentarios o reseñas. Al enviar contenido a través de nuestra aplicación, usted otorga a nuestra empresa una licencia no exclusiva, transferible, sublicenciable y libre de regalías para usar, copiar, modificar, crear obras derivadas, distribuir y mostrar públicamente dicho contenido en relación con nuestro servicio. Usted declara y garantiza que tiene todos los derechos necesarios para otorgar esta licencia y que el contenido enviado no infringe los derechos de propiedad intelectual o cualquier otro derecho de terceros.
  
  7. Propiedad intelectual Nuestra aplicación y su contenido son propiedad exclusiva de nuestra empresa o sus licenciantes. Todos los derechos están reservados. Nada en estos Términos y Condiciones le otorga ningún derecho sobre nuestra propiedad intelectual o el contenido protegido por derechos de autor u otros derechos de propiedad intelectual.
  
  8. Responsabilidad No seremos responsables por ningún daño directo, indirecto, incidental, especial o consecuente que surja del uso o la imposibilidad de usar nuestra aplicación o nuestro servicio de venta de boletos, incluso si hemos sido informados de la posibilidad de tales daños.
  
  9. Indemnización Usted acepta indemnizar y mantener indemne a nuestra empresa y sus afiliados, directores, empleados y agentes contra cualquier reclamo, demanda o acción legal que surja o esté relacionada con su uso de nuestra aplicación o su violación de estos Términos y Condiciones.
  
  10. Cambios en los Términos y Condiciones Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento sin previo aviso. Al continuar utilizando nuestra aplicación después de que se hayan realizado cambios en estos Términos y Condiciones, usted acepta estar sujeto a los Términos y Condiciones modificados.
  
  11. Terminación Podemos terminar su acceso a nuestra aplicación en cualquier momento sin previo aviso si consideramos que ha violado estos Términos y Condiciones o cualquier ley aplicable. En caso de terminación, debe dejar de utilizar nuestra aplicación y destruir cualquier copia de ella.
  
  12. Privacidad Al utilizar nuestra aplicación, usted acepta que podemos recopilar, almacenar y utilizar su información personal de acuerdo con nuestra Política de Privacidad. Le recomendamos que lea nuestra Política de Privacidad antes de utilizar nuestra aplicación.
  
  13. Comunicaciones Al proporcionarnos su dirección de correo electrónico o número de teléfono, usted acepta recibir comunicaciones electrónicas o telefónicas de nuestra parte relacionadas con nuestro servicio. Puede optar por no recibir estas comunicaciones en cualquier momento siguiendo las instrucciones proporcionadas en cada comunicación.
  
  14. Disputas Cualquier disputa relacionada con estos Términos y Condiciones o nuestro servicio se resolverá mediante arbitraje vinculante administrado por una organización de arbitraje reconocida en el lugar donde se encuentra nuestra empresa. El laudo arbitral será vinculante y podrá ser presentado como una sentencia en cualquier tribunal competente.
  
  15. Ley aplicable Estos Términos y Condiciones se regirán e interpretarán de acuerdo con las leyes del lugar donde se encuentra nuestra empresa, sin dar efecto a sus principios de conflicto de leyes.
  
  16. Renuncia Ninguna renuncia a cualquier disposición de estos Términos y Condiciones se considerará una renuncia adicional o continua a dicha disposición o cualquier otra disposición.
  
  17. Divisibilidad Si alguna disposición de estos Términos y Condiciones es considerada inválida o inaplicable por un tribunal competente, las demás disposiciones seguirán siendo válidas y aplicables.
  
  18. Cesión No puede ceder ni transferir sus derechos u obligaciones bajo estos Términos y Condiciones sin nuestro consentimiento previo por escrito.
  
  19. Relación entre las partes Nada en estos Términos y Condiciones crea una relación de agencia, sociedad, empresa conjunta o empleo entre usted y nuestra empresa.
  
  20. Contacto Si tiene alguna pregunta o comentario sobre estos Términos y Condiciones, puede contactarnos a través de la información de contacto proporcionada en nuestra aplicación.`
}

export const politics = {
  title: 'Política de Privacidad de ByBus',
  content: `
  1. Introducción: ByBus respeta la privacidad de sus usuarios y se compromete a protegerla.
  
  2. Definiciones: En esta política, "información personal" se refiere a cualquier información que pueda ser utilizada para identificar a un individuo.
  
  3. Consentimiento: Al utilizar nuestros servicios, aceptas la recopilación y uso de tu información personal como se describe en esta política.
  
  4. Recopilación de Información: Recopilamos información personal que nos proporcionas al registrarte en nuestro sitio web, al comprar boletos o al utilizar nuestros servicios.
  
  5. Información que Recopilamos: Esta información puede incluir tu nombre, dirección, número de teléfono, dirección de correo electrónico y detalles de la tarjeta de crédito.
  
  6. Uso de la Información: Utilizamos tu información personal para procesar tus compras, enviar confirmaciones de boletos, responder a tus consultas y proporcionarte actualizaciones sobre nuestros servicios.
  
  7. Divulgación a Terceros: No vendemos ni compartimos tu información personal con terceros para fines comerciales sin tu consentimiento explícito.
  
  8. Seguridad: Implementamos medidas de seguridad adecuadas para proteger tu información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción.
  
  9. Acceso a la Información: Puedes acceder y actualizar tu información personal en cualquier momento a través de tu cuenta en nuestro sitio web.
  
  10. Cookies: Utilizamos cookies para mejorar tu experiencia en nuestro sitio web.
  
  11. Enlaces a Otros Sitios Web: Nuestro sitio web puede contener enlaces a otros sitios web que no son operados por nosotros. No somos responsables por las prácticas de privacidad de estos sitios web.
  
  12. Menores: Nuestros servicios no están destinados a menores y no recopilamos intencionalmente información personal de menores.
  
  13. Cambios en la Política de Privacidad: Podemos actualizar esta Política de Privacidad en cualquier momento.
  
  14. Notificación de Cambios: Te notificaremos sobre cualquier cambio publicando la nueva Política de Privacidad en esta página.
  
  15. Fecha Efectiva: La fecha efectiva de esta Política de Privacidad es la fecha en que fue última vez actualizada, como se indica al final de esta política.
  
  16. Aceptación de la Política: Al utilizar nuestros servicios, aceptas esta Política de Privacidad.
  
  17. Derechos del Usuario: Según las leyes aplicables, puedes tener derecho a acceder, corregir, eliminar o limitar el uso que hacemos de tu información personal.
  
  18. Contacto: Si tienes alguna pregunta sobre esta Política de Privacidad, puedes contactarnos a través del formulario de contacto en nuestro sitio web.
  
  19. Jurisdicción Legal: Esta política se rige por las leyes del país en el que operamos.
  
  20. Quejas: Si tienes alguna queja sobre cómo manejamos tu información personal, por favor contáctanos.
  `
}