import _mock from '../_mock';
import { randomNumberRange, randomInArray } from '../utils';

// ----------------------------------------------------------------------

export const _userAbout = {
  id: _mock.id(1),
  cover: _mock.image.cover(1),
  role: 'UI Designer',
  follower: randomNumberRange(9, 30),
  following: randomNumberRange(9, 99),
  liderazgo: randomNumberRange(9.999, 99.999),
  quote:
    'Intereses en matemáticas y ciencias de la computación, ingeniería en Inteligencia Artificial en camino.',
  country: _mock.address.country(1),
  email: _mock.email(1),
  company: _mock.company(1),
  school: _mock.company(2),
  socialLinks: {
    facebookLink: `https://www.facebook.com/alguien`,
    instagramLink: `https://www.instagram.com/alguien`,
    linkedinLink: `https://www.linkedin.com/in/alguien`,
    twitterLink: `https://www.twitter.com/alguien`,
  },
};

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  country: _mock.address.country(index),
  isFollowed: _mock.boolean(index),
}));

export const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
}));

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.text.title(index),
  postAt: _mock.time(index),
  imageUrl: _mock.image.cover(index),
}));

export const _userDocs = [
  {
    id: 1,
    title: 'Acta de Nacimiento para Fines Escolares',
    postAt: new Date(),
    imageUrl: `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_2.jpg`,
  },
  {
    id: 2,
    title: 'Certificado Médico',
    postAt: new Date(),
    imageUrl: `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_2.jpg`,
  },
  {
    id: 3,
    title: 'Foto 2x2',
    postAt: new Date(),
    imageUrl: `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_2.jpg`,
  },
  {
    id: 4,
    title: 'Tarjeta de vacunas',
    postAt: new Date(),
    imageUrl: `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_2.jpg`,
  },
];

export const _userCerts = [
  {
    id: 1,
    title: 'Certificado de Modelo de Naciones Unidas de Centro Educativo',
    postAt: new Date(),
    imageUrl: `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_3.jpg`,
  },
  {
    id: 2,
    title: 'Certificado de Excelencia Académica',
    postAt: new Date(),
    imageUrl: `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_3.jpg`,
  },
  {
    id: 3,
    title: 'Certificado de Microsoft Office',
    postAt: new Date(),
    imageUrl: `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_3.jpg`,
  },
  {
    id: 4,
    title: 'Certificado de Primeros Auxilios',
    postAt: new Date(),
    imageUrl: `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_3.jpg`,
  },
  {
    id: 5,
    title: 'Certificado de Primer Lugar Olimpiada de Programación',
    postAt: new Date(),
    imageUrl: `https://api-dev-minimal-v4.vercel.app/assets/images/covers/cover_3.jpg`,
  },
];

export const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  author: {
    id: _mock.id(8),
    avatarUrl: _mock.image.avatar(1),
    name: _mock.name.fullName(index, ['Juan', 'Carlos', 'Ana', 'Maria', 'Luis']),
  },
  isLiked: true,
  createdAt: _mock.time(index),
  media: _mock.image.cover(index),
  message: _mock.text.sentence(index, [
    "La educación ha mejorado notablemente en los últimos años.",
    "El desarrollo de habilidades STEM está impactando positivamente a nuestros estudiantes.",
    "La inversión en educación está dando sus frutos en nuestra comunidad."
  ]),
  personLikes: [...Array(36)].map((__, personIndex) => ({
    name: _mock.name.fullName(personIndex, ['Pedro', 'Jose', 'Carmen', 'Rosa', 'Miguel']),
    avatarUrl: _mock.image.avatar(personIndex + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatarUrl: _mock.image.avatar(randomInArray([2, 3, 4, 5, 6]) || 2),
        name: _mock.name.fullName(index + 5, ['Andres', 'Julia', 'Ramon', 'Teresa', 'Diego']),
      },
      createdAt: _mock.time(2),
      message: 'Estoy impresionado con los avances en educación en nuestra región.',
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatarUrl: _mock.image.avatar(randomInArray([7, 8, 9, 10, 11]) || 7),
        name: _mock.name.fullName(index + 6, ['Antonio', 'Isabel', 'Hector', 'Carolina', 'Fernando']),
      },
      createdAt: _mock.time(3),
      message:
        'El enfoque en las habilidades de ciencia, tecnología, ingeniería y matemáticas realmente está preparando a nuestros estudiantes para el futuro.',
    },
  ],
}));

export const _userCards = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  cover: _mock.image.cover(index),
  name: _mock.name.fullName(index),
  follower: randomNumberRange(9, 30),
  following: randomNumberRange(9, 99),
  totalPosts: randomNumberRange(9.999, 99.999),
  role: _mock.role(index),
}));

export const _userPayment = [...Array(2)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['master_card', 'visa', 'master_card'][index],
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  phone: _mock.phoneNumber(index),
  country: _mock.address.country(index),
  state: 'New Hampshire',
  city: 'East Sambury',
  street: '41256 Kamille Turnpike',
  zipCode: '85807',
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  phoneNumber: _mock.phoneNumber(index),
  address: '908 Jack Locks',
  country: _mock.address.country(index),
  state: 'Virginia',
  city: 'Rancho Cordova',
  zipCode: '85807',
  company: _mock.company(index),
  isVerified: _mock.boolean(index),
  status: randomInArray(['active', 'banned']),
  role: _mock.role(index),
}));
