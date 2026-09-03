const API_BASE_URL = "http://localhost:3000/api";

const fallbackCategories = [
  {
    id: 1,
    name: "Culture Générale",
    slug: "culture",
    icon: "🌍",
    color: "#FF7A2F",
    bgColor: "#FFF3EB",
    questionsCount: 5
  },
  {
    id: 2,
    name: "Logique",
    slug: "logique",
    icon: "🧠",
    color: "#2BA169",
    bgColor: "#EBF8F1",
    questionsCount: 5
  },
  {
    id: 3,
    name: "Divertissement",
    slug: "divertissement",
    icon: "🍿",
    color: "#6C5CE7",
    bgColor: "#F1EFFF",
    questionsCount: 5
  }
];

const fallbackQuestions = {
  culture: [
    {
      id: 1,
      category: "culture",
      question: "Quelle est la capitale de l'Australie ?",
      options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
      correctAnswer: "Canberra"
    },
    {
      id: 2,
      category: "culture",
      question: "Quelle est la planète la plus proche du Soleil ?",
      options: ["Vénus", "Mercure", "Mars", "Jupiter"],
      correctAnswer: "Mercure"
    },
    {
      id: 3,
      category: "culture",
      question: "Qui a peint la Joconde ?",
      options: ["Léonard de Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
      correctAnswer: "Léonard de Vinci"
    },
    {
      id: 4,
      category: "culture",
      question: "Quel est le plus grand océan du monde ?",
      options: ["Océan Atlantique", "Océan Indien", "Océan Arctique", "Océan Pacifique"],
      correctAnswer: "Océan Pacifique"
    },
    {
      id: 5,
      category: "culture",
      question: "En quelle année l'homme a-t-il marché sur la Lune ?",
      options: ["1965", "1969", "1972", "1959"],
      correctAnswer: "1969"
    }
  ],
  logique: [
    {
      id: 6,
      category: "logique",
      question: "Si 3 chats attrapent 3 souris en 3 minutes, combien de temps faut-il à 100 chats pour attraper 100 souris ?",
      options: ["100 minutes", "3 minutes", "30 minutes", "1 minute"],
      correctAnswer: "3 minutes"
    },
    {
      id: 7,
      category: "logique",
      question: "Complétez la suite : 2, 4, 8, 16, ... ?",
      options: ["24", "30", "32", "64"],
      correctAnswer: "32"
    },
    {
      id: 8,
      category: "logique",
      question: "Quel mot continue la série : Janvier, Février, Mars, Avril, ... ?",
      options: ["Juin", "Mai", "Juillet", "Août"],
      correctAnswer: "Mai"
    },
    {
      id: 9,
      category: "logique",
      question: "Combien de mois dans l'année ont 28 jours ?",
      options: ["1 seul", "2", "6", "Tous les 12"],
      correctAnswer: "Tous les 12"
    },
    {
      id: 10,
      category: "logique",
      question: "Un père et son fils ont 36 ans à eux deux. Le père a 30 ans de plus que le fils. Quel âge a le fils ?",
      options: ["6 ans", "3 ans", "5 ans", "2 ans"],
      correctAnswer: "3 ans"
    }
  ],
  divertissement: [
    {
      id: 11,
      category: "divertissement",
      question: "Quel est le nom du sorcier ennemi juré de Harry Potter ?",
      options: ["Voldemort", "Grindelwald", "Snape", "Malefoy"],
      correctAnswer: "Voldemort"
    },
    {
      id: 12,
      category: "divertissement",
      question: "Quel jeu vidéo culte met en scène Mario et Luigi ?",
      options: ["Sonic", "Super Mario", "Zelda", "Donkey Kong"],
      correctAnswer: "Super Mario"
    },
    {
      id: 13,
      category: "divertissement",
      question: "Dans le Roi Lion, comment s'appelle le singe sage et chaman ?",
      options: ["Timon", "Pumbaa", "Rafiki", "Zazu"],
      correctAnswer: "Rafiki"
    },
    {
      id: 14,
      category: "divertissement",
      question: "Combien y a-t-il de joueurs sur le terrain dans une équipe de football classique ?",
      options: ["9", "10", "11", "12"],
      correctAnswer: "11"
    },
    {
      id: 15,
      category: "divertissement",
      question: "Quelle maison a pour emblème un loup géant dans Game of Thrones ?",
      options: ["Lannister", "Targaryen", "Stark", "Baratheon"],
      correctAnswer: "Stark"
    }
  ]
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error("Erreur de chargement des catégories");
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return fallbackCategories;
  } catch (error) {
    return fallbackCategories;
  }
};

export const getQuestionsByCategory = async (categorySlug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/questions/category/${categorySlug}`);
    if (!response.ok) {
      throw new Error("Erreur de chargement des questions");
    }
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return fallbackQuestions[categorySlug] || [];
  } catch (error) {
    return fallbackQuestions[categorySlug] || [];
  }
};
