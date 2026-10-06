import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "Discover The": "Discover The",
            "Blue Fire": "Blue Fire",
            "of Ijen": "of Ijen",
            "HeroDescription": "Unforgettable adventures across East Java. Witness the magical blue flames of Mount Ijen, the majestic sunrise over Bromo, and the thundering Tumpak Sewu waterfall.",
            "Explore Packages": "Explore Packages",
            "Chat via WhatsApp": "Chat via WhatsApp",
            "Our Destinations": "Our Destinations",
            "Explore East Java": "Explore East Java",
            "What Travelers Say": "What Travelers Say",
            "Real reviews": "Real reviews from our amazing customers across the globe.",
            "View All Reviews": "View All Reviews",
            "Artikel Blog": "Blog Articles"
        }
    },
    id: {
        translation: {
            "Discover The": "Jelajahi",
            "Blue Fire": "Api Biru",
            "of Ijen": "Ijen",
            "HeroDescription": "Petualangan tak terlupakan di Jawa Timur. Saksikan api biru magis Kawah Ijen, matahari terbit megah di Bromo, dan air terjun Tumpak Sewu yang menakjubkan.",
            "Explore Packages": "Lihat Paket",
            "Chat via WhatsApp": "Pesan via WhatsApp",
            "Our Destinations": "Destinasi Kami",
            "Explore East Java": "Jelajahi Jawa Timur",
            "What Travelers Say": "Ulasan Wisatawan",
            "Real reviews": "Ulasan dan pengalaman nyata dari pelanggan luar biasa kami di seluruh dunia.",
            "View All Reviews": "Lihat Semua Ulasan",
            "Artikel Blog": "Artikel Blog"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
