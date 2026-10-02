import { useEffect, useState } from 'react'
import './App.css'
import { Card, Modal, Button } from 'react-bootstrap'

function App() {

  const [pokemones, setPokemones] = useState([])

  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null)

  const [mostrarModal, setMostrarModal] = useState(false)

  const [mostrarShiny, setMostrarShiny] = useState(false)


  // =================================
  // BUSCAR LOS PRIMEROS 20 POKÉMON
  // =================================

  const buscarPokemones = async () => {

    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    )

    const data = await response.json()


    const datosPokemon = await Promise.all(

      data.results.map(async (pokemon) => {

        const response = await fetch(pokemon.url)

        return await response.json()

      })

    )


    setPokemones(datosPokemon)

  }


  // =================================
  // CARGAR POKÉMON AL INICIAR
  // =================================

  useEffect(() => {

    buscarPokemones()

  }, [])


  // =================================
  // ABRIR POKÉMON
  // =================================

  const abrirPokemon = (pokemon) => {

    setPokemonSeleccionado(pokemon)

    // Cada vez que abrimos uno,
    // comenzamos mostrando el normal

    setMostrarShiny(false)

    setMostrarModal(true)

  }


  // =================================
  // CERRAR MODAL
  // =================================

  const cerrarModal = () => {

    setMostrarModal(false)

  }


  // =================================
  // CAMBIAR NORMAL / SHINY
  // =================================

  const cambiarShiny = () => {

    setMostrarShiny(!mostrarShiny)

  }


  return (

    <div className="contenedor">


      {/* =================================
          TÍTULO
      ================================= */}

      <h1>Pokédex</h1>


      <p className="cantidad-pokemon">
        Primeros 20 Pokémon
      </p>


      {/* =================================
          LISTA DE LOS 20 POKÉMON
      ================================= */}

      <div className="lista-pokemon">

        {pokemones.map((pokemon) => (

          <Card
            key={pokemon.id}
            className="pokemon-mini-card"
            onClick={() => abrirPokemon(pokemon)}
          >


            {/* SPRITE ANIMADO */}

            <Card.Img
              src={
                pokemon.sprites?.versions?.[
                  'generation-v'
                ]?.['black-white']?.animated?.front_default
              }
              alt={pokemon.name}
            />


            <Card.Body>

              <Card.Title>

                #{pokemon.id}{' '}

                {pokemon.name.toUpperCase()}

              </Card.Title>

            </Card.Body>


          </Card>

        ))}

      </div>


      {/* =================================
          MODAL DEL POKÉMON
      ================================= */}

      <Modal
        show={mostrarModal}
        onHide={cerrarModal}
        centered
      >

        {pokemonSeleccionado && (

          <>


            {/* =================================
                CABECERA
            ================================= */}

            <Modal.Header closeButton>

              <Modal.Title>

                #{pokemonSeleccionado.id}{' '}

                {pokemonSeleccionado.name.toUpperCase()}

              </Modal.Title>

            </Modal.Header>


            {/* =================================
                CUERPO
            ================================= */}

            <Modal.Body>


              {/* =================================
                  SPRITE ANIMADO
              ================================= */}

              <img
                className="pokemon-modal-img"
                src={
                  mostrarShiny
                    ? pokemonSeleccionado.sprites?.versions?.[
                        'generation-v'
                      ]?.['black-white']?.animated?.front_shiny

                    : pokemonSeleccionado.sprites?.versions?.[
                        'generation-v'
                      ]?.['black-white']?.animated?.front_default
                }
                alt={pokemonSeleccionado.name}
              />


              {/* =================================
                  BOTÓN SHINY
              ================================= */}

              <div className="shiny-button">

                <Button
                  variant={
                    mostrarShiny
                      ? 'warning'
                      : 'dark'
                  }
                  onClick={cambiarShiny}
                >

                  {mostrarShiny
                    ? '✨ Ver Normal'
                    : '✨ Ver Shiny'}

                </Button>

              </div>


              {/* =================================
                  INFORMACIÓN
              ================================= */}

              <div className="pokemon-modal-info">


                <h4>

                  {pokemonSeleccionado.name.toUpperCase()}

                </h4>


                <p>

                  <strong>ID:</strong>{' '}

                  #{pokemonSeleccionado.id}

                </p>


                <p>

                  <strong>Peso:</strong>{' '}

                  {pokemonSeleccionado.weight}

                </p>


                <p>

                  <strong>Altura:</strong>{' '}

                  {pokemonSeleccionado.height}

                </p>


                <p>

                  <strong>Tipo:</strong>{' '}

                  {pokemonSeleccionado.types
                    ?.map(
                      (tipo) =>
                        tipo.type.name.toUpperCase()
                    )
                    .join(' ⚡ ')}

                </p>


                <p>

                  <strong>HP:</strong>{' '}

                  {
                    pokemonSeleccionado.stats?.find(
                      (stat) =>
                        stat.stat.name === 'hp'
                    )?.base_stat
                  }

                </p>


                <p>

                  <strong>Ataque:</strong>{' '}

                  {
                    pokemonSeleccionado.stats?.find(
                      (stat) =>
                        stat.stat.name === 'attack'
                    )?.base_stat
                  }

                </p>


                <p>

                  <strong>Defensa:</strong>{' '}

                  {
                    pokemonSeleccionado.stats?.find(
                      (stat) =>
                        stat.stat.name === 'defense'
                    )?.base_stat
                  }

                </p>


              </div>


            </Modal.Body>


            {/* =================================
                PIE DEL MODAL
            ================================= */}

            <Modal.Footer>

              <Button
                variant="secondary"
                onClick={cerrarModal}
              >
                Cerrar
              </Button>

            </Modal.Footer>


          </>

        )}

      </Modal>


    </div>

  )

}


export default App;