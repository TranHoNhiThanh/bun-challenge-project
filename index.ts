import { BunRuntime } from "@effect/platform-bun"
import { Effect, Either } from "effect"
import { PokemonSchema } from "./pokemon.js"
import { Schema } from "@effect/schema"

const POKEMON_NAMES = ["totodile", "snorlax", "mew", "abra"]
const pokemons: Array<typeof PokemonSchema> = []

const fetchPokemon = (pokemonName: string) => Effect.tryPromise({
    try: async () => {
        console.log(`Process: ${pokemonName}`)
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        const validateResult = Schema.decodeUnknownEither(PokemonSchema)(await data.json())
        if (Either.isRight(validateResult)) {
            return pokemons.push(validateResult.right)
        }
        return Effect.fail(new Error(validateResult.left.message))
    },
    catch: (err) => {
        console.log(err)
    },
})

const program = Effect.gen(function* () {
    const fetchPokemons = Effect.forEach(POKEMON_NAMES, (pokemonName) => fetchPokemon(pokemonName), { discard: true })
    yield* Effect.fork(fetchPokemons)
    yield* Effect.sleep("250 millis")
    console.log("Final Result", pokemons)
})

BunRuntime.runMain(Effect.runFork(program))