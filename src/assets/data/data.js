export const data = {
  bride: {
    L: {
      id: 1,
      name: "B. Achmad Zaky., S.Tr.Kom",
      nickname: "Zacky",
      child: "Putra ke 1",
      father: "Mustofa",
      mother: "Sri Nami",
      image: "./src/assets/images/zacky.webp",
    },
    P: {
      id: 2,
      name: "Farizka Shafa N., M.B.A",
      nickname: "Farizka",
      child: "Putri ke 3",
      father: "Lorem",
      mother: "Ipsum",
      image: "./src/assets/images/farizka.webp",
    },

    couple: "./src/assets/images/couple.webp",
  },

  time: {
    marriage: {
      year: "2026",
      month: "September",
      date: "26",
      day: "Sabtu",
      hours: {
        start: "08.00",
        finish: "Selesai",
      },
    },
    reception: {
      year: "2024",
      month: "September",
      date: "26",
      day: "Sabtu",
      hours: {
        start: "11.00",
        finish: "Selesai",
      },
    },
    address:
      "Dusun II Dukuh, Kemutug Lor, Baturaden, Banyumas Regency, Central Java 53151",
  },

  link: {
    calendar: "https://calendar.app.google/oSVLRMYC79GzuA4f9",
    map: "https://maps.app.goo.gl/GAsjz2Y148V9ui7H7",
    mapFrame:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15828.879521819283!2d109.2292008!3d-7.3291839!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6ff50a218f7af5%3A0x7c0089c198bda52f!2sPutri%20Gunung%20Restaurant!5e0!3m2!1sen!2sid!4v1738485841495!5m2!1sen!2sid",
  },

  galeri: [
    {
      id: 1,
      image: "./src/assets/images/1.png",
    },
    {
      id: 2,
      image: "./src/assets/images/2.png",
    },
    {
      id: 3,
      image: "./src/assets/images/3.png",
    },
    {
      id: 4,
      image: "./src/assets/images/4.png",
    },
    {
      id: 5,
      image: "./src/assets/images/5.png",
    },
  ],

  bank: [
    {
      id: 1,
      name: "Lorem Ipsum",
      icon: "./src/assets/images/bca.png",
      rekening: "12345678",
    },
    {
      id: 2,
      name: "Ipsum Lorem",
      icon: "./src/assets/images/bri.png",
      rekening: "12345678",
    },
  ],

  audio: {
    autoPlay: true,
    source: "./src/assets/audio/wedding.mp3",
    pauseTimeout: 2500,
  },

  api: "https://script.google.com/macros/s/AKfycbw0hUub4HTqs9oPWc4e4YEs5EwKUDNYmM2pHJVh4mhqIEM-Vay7gvAYa5L2p3h9oWxvrw/exec",

  navbar: [
    {
      id: 1,
      teks: "Home",
      icon: "bx bxs-home-heart",
      path: "#home",
    },
    {
      id: 2,
      teks: "Mempelai",
      icon: "bx bxs-group",
      path: "#bride",
    },
    {
      id: 3,
      teks: "Tanggal",
      icon: "bx bxs-calendar-check",
      path: "#time",
    },
    {
      id: 4,
      teks: "Galeri",
      icon: "bx bxs-photo-album",
      path: "#galeri",
    },
    {
      id: 5,
      teks: "Ucapan",
      icon: "bx bxs-message-rounded-dots",
      path: "#wishas",
    },
  ],
};
