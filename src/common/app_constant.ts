
enum Genre {
  FICTION = 'Fiction',
  NON_FICTION = 'Non-Fiction',
  SCIENCE_FICTION = 'Science Fiction',
  FANTASY = 'Fantasy',
  MYSTERY = 'Mystery',
  BIOGRAPHY = 'Biography',
  ROMANCE = 'Romance',
  HISTORY = 'History',
  OTHER = 'Other',
}

const GenreMap: { [key: string]: string } = {
    'FICTION': 'Fiction',
    'NON_FICTION': 'Non-Fiction',
    'SCIENCE_FICTION': 'Science Fiction',
    'FANTASY': 'Fantasy',
    'MYSTERY': 'Mystery',
    'BIOGRAPHY': 'Biography',
    'ROMANCE': 'Romance',
    'HISTORY': 'History',
    'OTHER': 'Other'
};

const defaultLimit = 10;

export {
      defaultLimit,
      Genre,
      GenreMap
}


