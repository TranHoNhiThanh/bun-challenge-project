import { Schema } from "@effect/schema"

export const PokemonSchema = Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
    base_experience: Schema.Number,
    weight: Schema.Number,
    height: Schema.Number
})