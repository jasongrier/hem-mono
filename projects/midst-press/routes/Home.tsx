import React, { ReactElement } from 'react'
import { Helmet } from 'react-helmet'
import { BASE_SITE_TITLE } from '../config'

const randomNames = [
  'Carylon Huie',
  'Hedwig Lloyd',
  'Apolonia Joye',
  'David Pittsley',
  'Edwina Eppler',
  'Maricruz Swanberg',
  'Jeannie Balbuena',
  'Adolph Riendeau',
  'Mabelle Bugarin',
  'Sophie Zumwalt',
  'Benita Cowles',
  'Domenica Reif',
  'Virgie Crass',
  'Cherry Dobrowolski',
  'Bennett Funston',
  'Alyse Mortellaro',
  'Luise Snipes',
  'Charlyn Mance',
  'Yuki Shea',
  'Shannan Gholston',
  'Lilly Barrios',
  'Fredericka Yip',
  'Kurtis Dezern',
  'Julissa Demeo',
  'Hortensia Sansbury',
  'Eleanore Muldowney',
  'Amberly Cosner',
  'Tawanda Trumbauer',
  'Waneta Obregon',
  'Loura Round',
  'Michelle Govan',
  'Marx Schwartzkopf',
  'Blossom Evert',
  'Ardelia Murphy',
  'Awilda Pan',
  'Venetta Sung',
  'Christin Ayres',
  'Caren Clement',
  'Dario Walworth',
  'Kristel Mendelson',
  'Chandra Salvatore',
  'Lyman Moretti',
  'Ronna Spadaro',
  'Sima Wrona',
  'Vickey Somers',
  'Antwan Goyette',
  'Nicholle Collett',
  'Tanna Bax',
  'Marlena Yan',
  'Jetta Eakin',
]

function Home(): ReactElement {
  return (
    <div className="home-page">
      <Helmet>
        <title>{BASE_SITE_TITLE}</title>
        <meta name="description" content="" />
      </Helmet>

      <section className="heroine">
        <p className="first">
          What if you could watch your favorite poet write?
        </p>

        <p style={{ paddingTop: '20px' }}>
          Midst is a new digital journal publishing poems in the form of interactive timelapses. You’ll see the finished text by default, but then you can rewind it to see exactly how it was written: start to finish, blank page to final draft, and every edit in between.
        </p>

        <p style={{ paddingTop: '10px' }} />

        <div className="donor-wall">
          <h2>With special thanks to:</h2>
          <ul>
            {randomNames.map(name => (
              <li key={name}>{ name }</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}

export default Home
