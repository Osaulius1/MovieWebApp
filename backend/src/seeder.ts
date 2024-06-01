import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class Seeder implements OnModuleInit {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const movies: Movie[] = [
      {
        id:0,
        title: "Fight Club",
        director: "David Fincher",
        rating: "IMDb 8.8/10",
        description: "Unhappy with his capitalistic lifestyle, a white-collared insomniac forms an underground fight club with Tyler, a careless soap salesman. Soon, their venture spirals down into something sinister.",
        posterUrl: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        imdbUrl: "https://www.imdb.com/title/tt0137523/?ref_=fn_al_tt_1",
      },
      {
        id:1,
        title: "Steve Jobs",
        director: "Danny Boyle",
        rating: "IMDb 7.2/10",
        description: "Steve Jobs takes us behind the scenes of the digital revolution, to paint a portrait of the man at its epicenter. The story unfolds backstage at three iconic product launches, ending in 1998 with the unveiling of the iMac.",
        posterUrl: "https://www.originalfilmart.com/cdn/shop/products/steve_jobs_2005_original_film_art_5000x.jpg?v=1621019784",
        imdbUrl: "https://www.imdb.com/title/tt2080374/?ref_=fn_al_tt_1",
      },
      {
        id:2,
        title: "Transcendence",
        director: "Wally Pfister",
        rating: "IMDb 6.2/10",
        description: "A scientist's drive for artificial intelligence takes on dangerous implications when his own consciousness is uploaded into one such program.",
        posterUrl: "https://m.media-amazon.com/images/M/MV5BMTc1MjQ3ODAyOV5BMl5BanBnXkFtZTgwNjI1NDQ0MTE@._V1_FMjpg_UX1000_.jpg",
        imdbUrl: "https://www.imdb.com/title/tt2209764/?ref_=tt_mv_close",
      },
      {
        id:3,
        title: "The Matrix",
        director: "Lana Wachowski, Lilly Wachowski",
        rating: "IMDb 8.7/10",
        description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
        posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        imdbUrl: "https://www.imdb.com/title/tt0133093/",
      },
      {
        id:4,
        title: "The Invention of Lying",
        director: "Ricky Gervais, Matthew Robinson",
        rating: "IMDb 6.4/10",
        description: "A comedy set in a world where no one has ever lied, until a writer seizes the opportunity for personal gain.",
        posterUrl: "https://upload.wikimedia.org/wikipedia/en/2/2b/Invention_of_lying_ver2.jpg",
        imdbUrl: "https://www.imdb.com/title/tt1058017/?ref_=tt_mv_close",
      },
      {
        id:5,
        title: "Shrek",
        director: "Andrew Adamson, Vicky Jenson",
        rating: "IMDb 7.9/10",
        description: "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a princess for the lord in order to get his land back.",
        posterUrl: "https://filmartgallery.com/cdn/shop/products/Shrek-Vintage-Movie-Poster-Original-1-Sheet-27x41_3139x.jpg?v=1665732097",
        imdbUrl: "https://www.imdb.com/title/tt0126029/?ref_=fn_al_tt_1",
      },
    ];

    for (const movie of movies) {
      const movieExists = await this.movieRepository.findOne({ where: { title: movie.title } });
      if (!movieExists) {
        await this.movieRepository.save(movie);
      }
    }

    console.log('Seeding complete!');
  }
}

